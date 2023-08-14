<script lang="ts">
    import {getBestCrossword } from "$lib/model";
    import Crossword from "$lib/crossword";
    import {topics}  from '$lib/data'
 	import {Term} from "$lib/classes";
    import Storage from "$lib/storage";
    import Xword from "./Xword.svelte";

    const INIT_SIZE = 15;
    
    let size = INIT_SIZE;
    let topicKey = topics[Storage.readTopicIdx()];
    let cw: Crossword;
    let stopped = false;
    let hl = '';
    
    newButton_click();
    
    function newButton_click() {
        if (size < 10 || size >= 100 ) {
            alert('Size grate then 10 and less then 100')
            cw = new Crossword(size, [new Term(' ', ' ')]);
            hl = ''
            return;
        }
        cw = getBestCrossword(topicKey, size);
        cw.regIgnore = topicKey.slice(-1) !== '_';
        hl = `${topicKey} - ${cw?.useds.length}\n` + (cw.regIgnore ? 'Регістр не має значення' : ''); 

        stopped = false;           
    }

    /** Save the right answers to local storage and uncover field after thet*/
    function stopButton_click() {
        // save answers
        let wordsOk = cw.useds
            .filter(u => cw.isUsedOk(u))
            .map(u => u.term.word);
        Storage.saveTermsToStorage(topicKey, wordsOk);

        // uncover field
        cw.uncover();
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


<div class:center-container = {stopped} class:unvisible = {!stopped} >
    <h3>
        Crossword on 
        <select bind:value={topicKey} on:change={select_change}>
            {#each topics as topic}
                <option>{topic}</option>
            {/each}
        </select>
    </h3> 

    <p>
        <label title="size < 100">Size <input class="cw-size" bind:value={size} /></label>
        <button on:click={ newButton_click } class="new-button">New</button>       
    </p>
</div>

<div class="center-container">
    <Xword cw={cw} highlight={hl} />
</div>
<div class:center-container = {!stopped} class:unvisible = {stopped} >
    <p> <button on:click={ stopButton_click } class="stop-button">Stop</button> </p>
</div>

<style>
    .center-container {
        display: grid;
        place-items: center;
    }
    .unvisible {
        display: none;
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
