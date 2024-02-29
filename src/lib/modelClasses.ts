export const EMPTY = '\uffff';
export enum Dir { None, Hor, Ver };


/**
 *   Термін = слово + його визначення.
 *   word - слово
 *   def - дефініція слова
 *   freq - кількість вдалих відповідей (для збереження в лок.сховище)
 */
export class Term 
{
    constructor(
            public word: string, 
            public def: string, 
            public freq=0) { }
    
    isDefImage(): boolean {
        return this.def.startsWith('Http');
    }
}

/**
 * Комірка кросворду
 */
export class Cell 
{
    info: BoundTerm[];

    constructor(
            public char = EMPTY, 
            public dir=Dir.Hor, 
            public solved=false) 
    {
        this.info = [];
    }

    get isStarter() { return this.info.length > 0; } 
}

/**
 * Термін, прив'язаний до певної комірки.
 */
export class BoundTerm 
{
    constructor(
            public term: Term, 
            public row: number, 
            public col: number, 
            public dir:Dir) {}

    contains(r: number, c: number) {
        const rc = r * 100 + c;
        return this.areal().indexOf(rc) > -1;
    }

    areal() {
        const arr = [];
        const word = this.term.word;
        for (let i = 0; i < word.length; i++) {
            const rc = this.dir === Dir.Hor ? 
                this.row * 100 + (this.col + i) :
                (this.row + i) * 100 + this.col
            arr.push(rc);
        }
        return arr;
    }
    
}

