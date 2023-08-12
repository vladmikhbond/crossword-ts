import {data, topics}  from './data'

export const EMPTY = '.';
export enum Dir { None, Hor, Ver };

export class Term {

    word: string;   // слово
    def: string;    // дефініція слова
    freq: number;   // кількість вдалих відповідей (для збереження в лок.сховище)

    constructor(word: string, def: string, freq=0) {
        this.word = word;
        this.def = def;
        this.freq = freq;
    }

    static loadData(topic: string) {
        if (!data[topic]) {
           topic = topics[0];
        }

        let terms = [];

        let lines = data[topic].split('\n');
        for (let line of lines) {
            let [word, def] = line.split(' - ').map(x => x.trim());
            if (word && def && word != '' && def != '') {
                def = def[0].toUpperCase() + def.slice(1)
                terms.push(new Term(word, def))
            } else {
                console.error('DATA ERROR:', line);
            }
        }
        return terms; 
    }
}

export class Cell {

    char: string;
    dir: Dir;
    solved: boolean;
    info: Used[];

    constructor(char = EMPTY, dir=Dir.Hor, solved=false) {
        this.char = char;
        this.dir = dir;
        this.solved = solved;
        this.info = [];
    }
}

export class Used {
    
    term: Term;
    row: number;
    col: number;
    dir: Dir;

    constructor(term: Term, r: number, c:number, dir:Dir) {
        this.term = term;
        this.row = r;
        this.col = c;
        this.dir = dir;
    }

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

