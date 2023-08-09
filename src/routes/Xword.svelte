<!-- field + highlight -->

<script lang="ts">
    import type Crossword from "$lib/crossword";
    import {Used, EMPTY, HOR, VER} from "$lib/classes";


    export let cw: Crossword; 
    export let hl = '';
    export let disabled = false;

    const STOP = "";
    let writeDirection = STOP;  


    /** Рядок для користувача з дефініцієй терміну */
    function termDef(info: Used | null) 
    { 
        if (!info) return '';
        let dir = info.dir === HOR ? 'Hor' : 'Ver';
        return `(${dir}) ${info.term.def}`;
    }


    // /**
	//  * @param {number} r
	//  * @param {number} c
	//  * @param {KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement; }} event
	//  */
    function moveFocusAfter(r:number, c:number, event: KeyboardEvent) 
    {
        /////////////////// 
        paintSolvedWord(r, c);
        ///////////////////

        let downId = ((r + 1) * 100 + c).toString();
        let downEl = document.getElementById(downId);

        let upId = ((r - 1) * 100 + c).toString();
        let upEl = document.getElementById(upId);

        let rightId = (r * 100 + c + 1).toString();
        let rightEl = document.getElementById(rightId);

        let leftId = (r * 100 + c - 1).toString();
        let leftEl = document.getElementById(leftId);

        if (event.shiftKey) return;
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
            if (writeDirection == STOP)
                writeDirection = VER;
        } else if (downEl) {
            writeDirection = VER;
        } else if (rightEl) {
            writeDirection = HOR;
        } else {
            writeDirection == STOP
        }

        switch (writeDirection) {
            case VER: downEl?.focus(); 
                break;
            case HOR: rightEl?.focus(); 
                break;
        }           
    }

    /**
     * Щоб зоставалося лише одна буква у полі вводу.
     */
    function keypressHandler(this: HTMLInputElement) {
        this.value = '';    
    }


	function highlight(r:number, c:number) {
        hl = termDef(cw.field[r][c].info);
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
                        on:keypress={keypressHandler}
                        on:keyup={(e) => moveFocusAfter(r, c, e)}  
                        on:focus={() => highlight(r, c)} 
                        class="{cw.field[r][c].info ? 'head-cell' :'body-cell'}"
                        class:solved={cw.field[r][c].solved}
                        title="{termDef(cw.field[r][c].info)}"
                        disabled={ disabled}                                                 
                        />        
                {:else}
                    <input disabled class='empty'/>
                {/if}
            </td> 
            {/each}
        </tr>
    {/each}
</table>

<pre class="highlight">{hl}</pre>


<style>
    .solved {
        background-color: greenyellow;
    }

    .head-cell, .body-cell, .empty {
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
    .empty {
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
