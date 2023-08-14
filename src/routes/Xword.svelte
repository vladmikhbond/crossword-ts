<!-- crossword + highlight -->

<script lang="ts">
    import type Crossword from "$lib/crossword";
    import {EMPTY, Dir, Used} from "$lib/classes";
    import Challenge from "./Challenge.svelte";

    export let cw: Crossword | null; 
    export let info: Used[] = [];

    let writeDir = Dir.None;  

    const rc2id = (r:number, c:number) => (r * 100 + c).toString();
    const id2rc = (id:number) => [id / 100 | 0, id % 100];



    function input_input(e: { data: string }, r: number, c:number) 
    {   
        if (!cw) return;

        // Щоб зоставалося лише одна літера у полі вводу.       
        if (e.data?.length == 1) {
            cw.field[r][c].char = e.data;
        } else if (e.data?.length == 2){
            let pos = e.data?.indexOf(cw.field[r][c].char);
            cw.field[r][c].char = e.data[1 - pos]; 
        }

        if (cw.field[r][c].char != '') {
            moveFocusAfterInput(r, c); 
        }
        paintSolvedWord(r, c); 
    }
    

    /** Зсуває фокус після вводу літери. 
     */ 
    function moveFocusAfterInput(r:number, c:number) 
    {
        let downEl = document.getElementById(rc2id(r+1, c));
        let rightEl = document.getElementById(rc2id(r, c+1));

        if (downEl && rightEl) {
            if (cw!.field[r+1][c].char === EMPTY && cw!.field[r][c+1].char !== EMPTY) {
               writeDir = Dir.Ver;
            } else if (cw!.field[r+1][c].char !== EMPTY && cw!.field[r][c+1].char === EMPTY) {
               writeDir = Dir.Hor;  
            }
        } else if (downEl) {
            writeDir = Dir.Ver;
        } else if (rightEl) {
            writeDir = Dir.Hor;
        } else {
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
        info = cw!.field[r][c].info;
	}


    function paintSolvedWord(r:number, c:number)  {
        let useds = cw!.useds.filter(u => u.contains(r, c));
        useds.forEach( u => { 
            let ok = cw!.isUsedOk(u);
            for (let id of u.areal()) {
                let [r, c] = id2rc(id);
                cw!.field[r][c].solved = ok;
            }            
        })
    }    
</script>

{#if cw}
    <table>
        {#each cw.field as line, r}
            <tr>
                {#each line as _, c} 
                <td>
                    {#if cw.field[r][c].char != EMPTY}
                        <input 
                            id={rc2id(r, c)}
                            bind:value='{cw.field[r][c].char}'
                            on:input={e => input_input(e, r, c)} 
                            on:focus={e => input_focus(e, r, c)} 
                            class="{cw.field[r][c].info.length > 0 ? 'head-cell' :'body-cell'}"
                            class:solved={cw.field[r][c].solved}
                            />        
                    {:else}
                        <input disabled class='empty-cell'/>
                    {/if}
                </td> 
                {/each}
            </tr>
        {/each}
    </table>

    {#each info as used}
        <Challenge used={used} />
    {/each}

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

</style>
