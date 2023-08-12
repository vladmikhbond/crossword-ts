<!-- crossword + highlight -->

<script lang="ts">
    import Crossword from "$lib/crossword";
    import {Used, EMPTY, Dir} from "$lib/classes";

    export let cw: Crossword; 
    export let highlight = '';
    export let stopped = false;

    let writeDir = Dir.None;  
    let hlWidth: number;     
    $: hlWidth = cw.size * 19 + 16;

    const rc2id = (r:number, c:number) => (r * 100 + c).toString();
    const id2rc = (id:number) => [id / 100 | 0, id % 100];

    
    /** 
     * Виробляє рядок з дефініцієй одного або двох термінів, який отримує коистувач. 
     */
    function termDefinition(info: Used | null): string 
    {   
        // в комірці слова не починаются
        if (!info) {
            return '';
        }
        // в комірці починається одне слово
        let dir = info.dir === Dir.Hor ? 'Hor' : 'Ver';
        let def = `(${dir}) ${info.term.def}`;
        if (info.term.def.indexOf(Crossword.DIR_STUB) == -1) {
            return def;
        }
        // в комірці починаються два слова
        let otherDir = info.dir === Dir.Ver ? 'Hor' : 'Ver'; 
        return def.replace(Crossword.DIR_STUB, otherDir);        
    }
  

    function input_keyup(e: KeyboardEvent, r: number, c:number) 
    {
        // Щоб зоставалося лише одна літера у полі вводу.
        cw.field[r][c].char = (e.target as HTMLInputElement).value.slice(-1); 

        paintSolvedWord(r, c); 
        moveFocusAfterInput(e, r, c); 
    }
    


    /**
     * Зсуває фокус після вводу літери.
     */ 
    function moveFocusAfterInput(event: KeyboardEvent, r:number, c:number) 
    {
    
        if (event.shiftKey || event.key == 'Backspace' || event.key == 'Delete') 
            return;

        let downEl = document.getElementById(rc2id(r+1, c));
        let upEl = document.getElementById(rc2id(r-1, c));
        let rightEl = document.getElementById(rc2id(r, c+1));
        let leftEl = document.getElementById(rc2id(r, c-1));

        switch (event.key) {
            case 'ArrowUp':
                upEl?.focus()
                return;
            case 'ArrowLeft':
                leftEl?.focus()
                return;
            case 'ArrowDown':
                downEl?.focus()
                return;
            case 'ArrowRight':
                rightEl?.focus()
                return;
        }

        if (downEl && rightEl) {
            if (cw.field[r+1][c].char === EMPTY && cw.field[r][c+1].char !== EMPTY) {
               writeDir = Dir.Ver;
            } else if (cw.field[r+1][c].char !== EMPTY && cw.field[r][c+1].char === EMPTY) {
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

    
	function input_focus(r:number, c:number) {
        highlight = termDefinition(cw.field[r][c].info);
	}

    function paintSolvedWord(r:number, c:number)  {
        let useds = cw.useds.filter(u => u.contains(r, c));
        useds.forEach( u => { 
            let ok = cw.isUsedOk(u);
            for (let id of u.areal()) {
                let [r, c] = id2rc(id);
                cw.field[r][c].solved = ok;
            }            
        })
    }    
</script>


<table>
    {#each cw.field as line, r}
        <tr>
            {#each line as _, c} 
            <td>
                {#if cw.field[r][c].char != EMPTY}
                    <input 
                        id={rc2id(r, c)}
                        bind:value='{cw.field[r][c].char}'
                        on:keyup={e => input_keyup(e, r, c)} 
                        on:focus={() => input_focus(r, c)} 
                        class="{cw.field[r][c].info ? 'head-cell' :'body-cell'}"
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

<pre class="highlight" style="width: {hlWidth}px;">{highlight}</pre>


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

    .highlight {
        display: grid;
        place-items: center;
        margin-top: 10px;
        white-space: pre-wrap;
        /* border: thin solid; */

    }
</style>
