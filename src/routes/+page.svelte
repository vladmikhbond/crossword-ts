<script lang="ts">
    import {getBestCrossword } from "$lib/model";
    import Crossword from "$lib/crossword";
    import {topics}  from '$lib/data'
 	import {Term} from "$lib/classes";
    import Storage from "$lib/storage";

    import Xword from "./Xword.svelte";

      
    let size = 10;
    let topic = topics[Storage.readTopicIdx()];
    /** @type {Crossword} */
    let cw: Crossword;
    let disabled = false;
    let hl = '';
    let regIgnore = true;

    newButton_click();
    
    function newButton_click() {
        if (size < 10 || size >= 100 ) {
            alert('Size grate then 10 and less then 100')
            cw = new Crossword(size, [new Term('x', 'x')]);
            hl = ''
            return;
        }
        cw = getBestCrossword(topic, size);
        cw.regIgnore = regIgnore;

        let [x, w] = [cw?.xCount, cw?.useds.length];
        hl = `${x} / ${w} = ${(x/w).toFixed(2)}`; 
        disabled = false;           
    }

    function stopButton_click() {
        // before
        let wordsOk = cw.useds
            .filter(u => cw.isUsedOk(u))
            .map(u => u.term.word);
        Storage.saveTermsToStorage(topic, wordsOk);

        // after
        cw.uncover();
        cw = cw;
        disabled = true;  
    }

    /**
	 */
    function select_change() {
        let topicIdx = topics.indexOf(topic);
        Storage.saveTopicIdx(topicIdx);
        newButton_click();
    }

</script>

<div class="center-container">
    <h3>
        Crossword on 
        <select bind:value={topic} on:change={select_change}>
            {#each topics as topic}
                <option>{topic}</option>
            {/each}
        </select>
        <input type="checkbox" bind:checked={regIgnore}  title = "Register is ignored"/>
    </h3> 

    <p>
        <label title="size < 100">Size <input class="cw-size" bind:value={size} /></label>
        <button on:click={ newButton_click } class="new-button">New</button>
        <button on:click={ stopButton_click } class="stop-button">Stop</button> 
    </p>
    <Xword cw={cw} hl={hl} disabled={disabled} />
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
