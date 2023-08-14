import Crossword from './crossword'
import Storage from "$lib/storage";
import { Term, EMPTY } from './classes';
import {data}  from './data'

const ATTEMPTS = 100;          // кількість кросвордів-кандидатів

/**
 * Будує кросворди-кандидати і обирає кращий з них.
 * Це продовж. доки не буде побудований к. з достатньою кількістю терамінів або не вичерпається кількість спроб.
 * 
 */
export function getBestCrossword(topicKey: string, size: number) {
    
    const rIgno = data[topicKey].rIgno;
    const auto = data[topicKey].auto;

    // load terms from local storage
    let allTerms = Storage
        .readTerms(topicKey)
        .filter((t:Term) => t.word.length <= size);
    allTerms.sort((a:Term, b: Term) => a.freq - b.freq);

    let n = allTerms.length * 3/4 | 0;
    
    let terms = allTerms.slice(0, n);

    let best = new Crossword(size, terms, rIgno, auto);
    for (let i = 0; i < ATTEMPTS && best.useds.length < size ; i++) {
        terms = allTerms.slice(0, n);
        let next = new Crossword(size, terms, rIgno, auto);
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
        cell.info.push(used);
    }
}
