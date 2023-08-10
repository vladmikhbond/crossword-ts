<!-- field + highlight -->

<script lang="ts">
    import type Crossword from "$lib/crossword";
    import {Used, EMPTY, Dir} from "$lib/classes";


    export let cw: Crossword; 
    export let highlight = '';
    export let disabled = false;

    let writeDir = Dir.None;  


    /** Рядок для користувача з дефініцієй терміну */
    function termDefinition(info: Used | null) 
    { 
        if (!info) {
            return '';
        }
        let dir = info.dir === Dir.Hor ? 'Hor' : 'Ver';
        let def = `(${dir}) ${info.term.def}`;
        if (info.term.def.indexOf('©') == -1) {
            return def;
        }
        let otherDir = info.dir === Dir.Ver ? 'Hor' : 'Ver'; 
        return def.replace('©', otherDir);        
    }


    function moveFocusAfter(event: KeyboardEvent, r:number, c:number) 
    {
        if (event.shiftKey || event.key == 'Backspace') 
            return;

        let downEl = document.getElementById(((r + 1) * 100 + c) + "");
        let upEl = document.getElementById(((r - 1) * 100 + c) + "");
        let rightEl = document.getElementById((r * 100 + c + 1) + "");
        let leftEl = document.getElementById((r * 100 + c - 1) + "");

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

    
	function assign_highlight(r:number, c:number) {
        highlight = termDefinition(cw.field[r][c].info);
	}


    function paintSolvedWord(r:number, c:number)  {
        let useds = cw.useds.filter(u => u.contains(r, c))
        useds.forEach( u => { 
            let b = cw.isUsedOk(u);
            for (let id of u.areal()) {
                let [r, c] = [id / 100 | 0, id % 100];
                cw.field[r][c].solved = b;
            }            
        })
    }

    function input_keyup(e: KeyboardEvent, r: number, c:number) {
        if (e.key && e.key.length == 1) {
            // Щоб зоставалося лише одна буква у полі вводу.
            cw.field[r][c].char = e.key;
        }
        paintSolvedWord(r, c); 
        moveFocusAfter(e, r, c);
    }
       
</script>


<table>
    {#each cw.field as line, r}
        <tr>
            {#each line as _, c} 
            <td>
                {#if cw.field[r][c].char != EMPTY}
                    <input 
                        id={(r * 100 + c).toString()}
                        bind:value='{cw.field[r][c].char}'
                        on:keyup={e => input_keyup(e, r, c)}  
                        on:focus={() => assign_highlight(r, c)} 
                        class="{cw.field[r][c].info ? 'head-cell' :'body-cell'}"
                        class:solved={cw.field[r][c].solved}
                        title="{termDefinition(cw.field[r][c].info)}"
                        disabled={ disabled}                                                 
                        />        
                {:else}
                    <input disabled class='empty-cell'/>
                {/if}
            </td> 
            {/each}
        </tr>
    {/each}
</table>

<pre class="highlight">{highlight}</pre>


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
        margin-top: 10px;
        height: 20px;
    }
</style>
