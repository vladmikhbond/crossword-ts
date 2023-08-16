<script lang="ts">
    import {getBestCrossword } from "$lib/model";
    import Crossword from "$lib/crossword";
    import {topics}  from '$lib/data'
 	import type { Used } from "$lib/classes";
    import Storage from "$lib/storage";
    import Xword from "./Xword.svelte";
    const INIT_SIZE = 15;
    
    let size = INIT_SIZE;
    let topicKey = topics[Storage.readTopicIdx()];
    let cw: Crossword;
    let stopped = true;
    let info: Used[];
    let percentage = '';
    
    function newButton_click() {
        if (size < 10 || size >= 100 ) {
            alert('Size grate then 10 and less then 100')
            cw = Crossword.empty;
            return;
        }
        cw = getBestCrossword(topicKey, size);
        info = []; 
        stopped = false;           
    }

    /** Save the right answers to local storage and uncover field after thet*/
    function stopButton_click() 
    {
        // save answers to local storage
        let wordsOk = cw.useds
            .filter(u => cw.isUsedOk(u))
            .map(u => u.term.word);
        Storage.saveTermsToStorage(topicKey, wordsOk);

        // uncover all chars & calculate percentage 
        let faults = cw.uncover();
        let all = cw.useds.length;
        percentage = ((all - faults) * 100 / all).toFixed(0) + '%';
        
        // congratulation!
        if (!faults) {
            let file = Math.random() > 0.5 ? "next-level.mp3" : "guitar.mp3"
            let audio = new Audio(file);
            audio.play();
        }
           
        cw = cw;
        stopped = true;  
    }

    /** Save a topic index to local storage */
    function select_change() {
        let topicIdx = topics.indexOf(topicKey);
        Storage.saveTopicIdx(topicIdx);
        newButton_click();
    }

</script>

<div class="center-container">

{#if stopped}
    <h3>
        Crossword on 
        <select bind:value={topicKey} on:change={select_change}>
            {#each topics as key}
                <option>{key}</option>
            {/each}
        </select>
    </h3> 

    <div>
        Size <input class="cw-size" bind:value={size} />
        <button on:click={ newButton_click } class="new-button">New</button>       
    </div>
{:else}
    <span>{topicKey} <small> (регістр {cw?.regIgnore ? 'не ' : '' }має значення)</small> </span>
{/if}

{#if !stopped}
    <p> <button on:click={ stopButton_click } class="stop-button">Stop</button> </p>
{:else}
    <p> {percentage} </p>
{/if} 


<Xword cw={cw} info={info} />


</div>

<style>
    .center-container {
        display: grid;
        place-items: center;
    }

    .cw-size {
        width: 24px;
    }
    .new-button {
        background-color: green;
        color: white;
    }    
    .stop-button {
        background-color: red;
        color: white;
    }    
    option {
        font: 800;
    }

</style>
