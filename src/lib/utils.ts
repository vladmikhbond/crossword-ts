import type Crossword from './crossword';

/** Псевдовипадкове число в діапазони від 0 до n */
export function rnd(n: number): number {
    return Math.floor(Math.random() * n);
}

/** Перемішує значення в масиві */
export function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = rnd(i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
}


/** Друкує кроссворд в консолі */
export function CrosswordLog(cw: Crossword) 
{
    for (let r = 0; r < cw.field.length; r++) {
        let chars = cw.field[r].map(x => x.char);
        let line = chars.join('  ');
        console.log(`${r}\t${line}`);
    }
}
