import type Crossword from './crossword';

/** Псевдовипадкове число в діапазони від 0 до n */
export function rnd(n: number): number {
    return Math.floor(Math.random() * n);
}

/** Перемішує значення в масиві */
export function shuffleArray(array: unknown[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = rnd(i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
}


/** Друкує кроссворд в консолі */
export function CrosswordLog(cw: Crossword) 
{
    for (let r = 0; r < cw.field.length; r++) {
        const chars = cw.field[r].map(x => x.char);
        const line = chars.join('  ');
        console.log(`${r}\t${line}`);
    }
}


/** */
export function audioPlay() {
    const files = ["next-level.mp3", "guitar.mp3", "fanfara-prazd.mp3", "fanfaryi.mp3", "fanfaryi-itogi.mp3", "zvuk-fanfar3.mp3"];
    const i = (Math.random() * files.length) | 0 ;
    const audio = new Audio(`sounds/${files[i]}`);
    audio.play();
}