import Crossword from './crossword'
import Storage from "$lib/storage";
import { Term, EMPTY } from './classes';

const ATTEMPTS = 100;          // кількість кросвордів-кандидатів

/**
 * Будує кросворди-кандидати і обирає кращий з них.
 * Це продовж. доки не буде побудований к. з достатньою кількістю терамінів або не вичерпається кількість спроб.
 * 
 */
export function getBestCrossword(topic: string, size: number) {
    
    // load terms from local storage
    let allTerms = Storage
        .readTerms(topic)
        .filter((t:Term) => t.word.length <= size);
    allTerms.sort((a:Term, b: Term) => a.freq - b.freq);

    let n = allTerms.length * 3/4 | 0;
    
    let terms = allTerms.slice(0, n);

    let best = new Crossword(size, terms);
    for (let i = 0; i < ATTEMPTS && best.useds.length < size ; i++) {
        terms = allTerms.slice(0, n);
        let next = new Crossword(size, terms);
        if (next.useds.length > best.useds.length) {
            best = next;             
        }        
    }
    // epilog      
    replaceLettersWithSpaces(best);
    setInfoToSomeCells(best);

    return best;            
}


function replaceLettersWithSpaces(cw: Crossword) 
{
    for (let r = 0; r < cw.size; r++) {
        for (let c = 0; c < cw.size; c++) {
            if (cw.field[r][c].char !== EMPTY) {
                cw.field[r][c].char = '';
            }
        }
    }
}

function setInfoToSomeCells(cw: Crossword)  {
    for (const used of cw.useds) {
        let cell = cw.field[used.row][used.col];
        if (!cell.info) 
        {
            // no info in the cell yet
            cell.info = used;                    
        } 
        else 
        {
            // the cell already has info
            cell.info.term.def += `\n(${Crossword.DIR_STUB}) ` + used.term.def;
        }
    }
}
