export const EMPTY = '\uffff';
export enum Dir { None, Hor, Ver };


/**
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

export class Cell 
{
    info: Used[];

    constructor(
            public char = EMPTY, 
            public dir=Dir.Hor, 
            public solved=false) {
        this.info = [];
    }
}


export class Used 
{
    constructor(
            public term: Term, 
            public row: number, 
            public col:number, 
            public dir:Dir) {}

    areal() {
        const arr = [];
        let word = this.term.word;
        for (let i = 0; i < word.length; i++) {
            let id = this.dir === Dir.Hor ? 
                this.row * 100 + (this.col + i) :
                (this.row + i) * 100 + this.col
            arr.push(id);
        }
        return arr;
    }
    
    contains(r: number, c: number) {
        const id = r * 100 + c;
        return this.areal().indexOf(id) > -1;
    }
}

