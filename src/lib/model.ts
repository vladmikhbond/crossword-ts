import Crossword from './crossword'
import Storage from "$lib/storage";
import type { Term } from './classes';

const ATTEMPTS = 100;          // кількість кросвордів-кандидатів

/**
 * Будує кросворди-кандидати і обирає кращий з них.
 * Це продовж. доки не буде побудований к. з достатньою кількістю терамінів або не вичерпається кількість спроб.
 * 
 */
export function getBestCrossword(topic: string, size: number) {
    
    // load terms from local storage
    let allTerms = Storage.readTerms(topic);
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
    best.replaceLettersWithSpaces();
    best.setInfoToCells();

    return best;            
}
