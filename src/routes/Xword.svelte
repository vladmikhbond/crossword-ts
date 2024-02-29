<!-- crossword + highlight -->

<script lang="ts">
    import Crossword from "$lib/crossword";
    import {EMPTY, Dir, Occupier} from "$lib/modelClasses";
    import Challenge from "./Challenge.svelte";
    import {audioPlay} from "$lib/utils";

    // current crossword
    export let xw = Crossword.empty;
     
    export let info: Occupier[] = [];

    let writeDir = Dir.None;  

    const rc2id = (r:number, c:number) => (r * 100 + c).toString();
    const id2rc = (id:number) => [id / 100 | 0, id % 100];

    
    let chTop = 0;
    let chWidth = 0;

    function input_input(e: { data: string }, r: number, c:number) 
    {   
        // Щоб зоставалося лише одна літера у полі вводу.       
        if (e.data?.length == 1) {
            xw.field[r][c].char = e.data;
        } else if (e.data?.length == 2){
            let pos = e.data?.indexOf(xw.field[r][c].char);
            xw.field[r][c].char = e.data[1 - pos]; 
        }

        if (xw.field[r][c].char != '') {
            moveFocusAfterInput(r, c); 
        }
        paintSolvedWord(); 

        // congratulations
        if (xw.success()) {
            audioPlay()
         }
    }
    

    /** Зсуває фокус після вводу літери. 
     */ 
    function moveFocusAfterInput(r:number, c:number) 
    {
        let downEl = document.getElementById(rc2id(r+1, c));
        let rightEl = document.getElementById(rc2id(r, c+1));

        if (downEl && rightEl) {
            let dBlank = xw.field[r + 1][c].char === '';
            let rBlank = xw.field[r][c + 1].char === '';            
            if (dBlank === rBlank) {
                if (writeDir === Dir.None) {
                   writeDir = Dir.Hor; 
                }
            } 
            else if (xw.field[r+1][c].char === '') 
            {
               writeDir = Dir.Ver;
            } else {
               writeDir = Dir.Hor;  
            }
        } 
        if (downEl && !rightEl) {
            writeDir = Dir.Ver;
        }
        if (!downEl && rightEl) {
            writeDir = Dir.Hor;
        }
        if (!downEl && !rightEl) {
            writeDir == Dir.None
        }

        switch (writeDir) {
            case Dir.Ver: downEl?.focus(); 
                break;
            case Dir.Hor: rightEl?.focus(); 
                break;
        }           
    }

	function input_focus(event: FocusEvent, r:number, c:number) 
    {
        // set caret
        const inputElement = event.target as HTMLInputElement;
        inputElement.selectionStart = inputElement.value.length;
        inputElement.selectionEnd = inputElement.value.length;
        //
        info = xw.field[r][c].info;
        chTop = (r - xw.size) * 19 + 40; 
        
        chWidth = info[0] && info[0].term.isDefImage() ? 130 : xw.size * 19;
	}


    function paintSolvedWord()  {
        let useds = xw.useds; 
        useds.forEach( u => { 
            let ok = xw.isUsedOk(u);
            let i = 0;
            for (let id of u.areal()) {
                let [r, c] = id2rc(id);
                if (ok) {
                    xw.field[r][c].solved = true;
                    xw.field[r][c].char = u.term.word[i++];
                }
            }            
        })
    }

</script>

{#if xw !== Crossword.empty}
<div class="center-container">
    <table>
        {#each xw.field as line, r}
            <tr>
                {#each line as _, c} 
                <td>
                    {#if xw.field[r][c].char != EMPTY}
                        <input 
                            id={rc2id(r, c)}
                            bind:value='{xw.field[r][c].char}'
                            on:input={e => input_input(e, r, c)} 
                            on:focus={e => input_focus(e, r, c)} 
                            class="{xw.field[r][c].info.length > 0 ? 'head-cell' :'body-cell'}"
                            class:solved={xw.field[r][c].solved}
                            />        
                    {:else}
                        <input disabled class='empty-cell'/>
                    {/if}
                </td> 
                {/each}
            </tr>
        {/each}
    </table>

    {#if info.length > 0}
        <div class='chalenge-box' style="top: {chTop}px; width: {chWidth}px">
        {#each info as used}
            <Challenge used={used} />
        {/each}
        </div>
    {/if}
</div>   
{/if} 


<style>
    .solved {
        background-color: greenyellow;
    }

    .head-cell, .body-cell, .empty-cell {
        width: 14px;
        height: 14px;
        font-size: 14px;
        text-align: center;
    }
    .head-cell {
        border-width: 1px;
        background-color: rgb(255, 255, 159)
    }
    .body-cell {
        border-width: 1px;
    }
    .empty-cell {
        border: none; 
        background-color: gainsboro;
    }

    table {
        border: 1px solid black;
        background-color: gainsboro;
        border-spacing: 0px;
        padding: 6px;
    }
    tr, td {
        padding: 0px;
    }

    .chalenge-box {
        position: relative;
        background-color: aliceblue;
        border: 2px solid gray ;
        box-shadow: 10px 5px 5px darkgray;
        left: 10px;
        text-align: center;
        padding-right: 5px;
        left: 0;
    }

    .center-container {
        display: grid;
        place-items: center;
    }

</style>
