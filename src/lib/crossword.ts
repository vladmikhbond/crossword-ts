import { Term, BoundTerm, Cell, EMPTY, Dir } from './modelClasses'
import {shuffleArray} from './utils'


/** Підтримує автоматичну побудову та вирішення кросворду користвачем. */
class Crossword 
{
    static empty: Crossword = new Crossword(1, [new Term('x', 'x')]);

    private static K = 3   // K * size = кількість спроб додавання слова в кросворд
    
    /** Терміни, використані для побудови кросворду */
    usedTerms: BoundTerm[] = [];   
    /** Кількість перетинів слів */ 
    xCount = 0;
    /** Ігрове поле */ 
    field: Cell[][];

    /**
     * @param size - сторона квадратного поля к.
     * @param terms - терміни-кандидати, з яких збудують к.
     * @param regIgnore - флаг, чи враховувати регістр літер при перевірці
     * @param auto - скільки літер на початку слова достатньо для автозаповнення
     */
    constructor(public size: number, public terms: Term[], public regIgnore = true, public auto = Infinity) {
        
        function createEmptyField (size:number) {
            const field = new Array(size);
            for (let row = 0; row < size; row++) {
                field[row] = new Array(size);
                for (let col = 0; col < size; col++) {
                    field[row][col] = new Cell();
                }
            }
            return field;
        }

        // ---------------------body----------------------

        this.field = createEmptyField(size) 
            
        shuffleArray(this.terms);
        this.buildCrossword();   
    }


//#region Build Crossword

    private buildCrossword() 
    {
        const r = this.size / 2 |0;
        const c = (this.size - this.terms[0].word.length) / 2 |0;
        
        this.useFirstTerm(r, c);
        this.transpose();

        for (let i = 1; i < this.size * Crossword.K; i++) {
            this.tryUseFirstOfRestTerms();
        }        
    }


    private useFirstTerm(r: number, c: number) 
    {
        const term = this.terms[0];
        const word = term.word;

        for (let i = 0; i < word.length; i++) {
            this.field[r][c + i] = new Cell(word[i], Dir.Hor);
        }
        const newUsed = new BoundTerm(term, r, c, Dir.Hor);

        // терм стає використаним
        this.usedTerms.push(newUsed);
        this.terms.splice(0, 1);
    }


    private tryUseFirstOfRestTerms() 
    {    
        if (this.terms.length === 0)
           return;

        // Find all the suitable places      
        const places = [];
        const word = this.terms[0].word;
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size - word.length; c++) {
                const estimate = this.estimate(word, r, c);
                if (estimate > 0) {
                    places.push({r, c, xs: estimate})
                }
            }
        }
        
        // Random select one of suitable places
        if (places.length) {
            const i = Math.floor(Math.random() * places.length);
            this.useFirstTerm(places[i].r, places[i].c);
            this.transpose();
            this.xCount += places[i].xs;    
        } else {
            // move a bad term to the end of this.terms
            const badTerm = this.terms.shift();
            if (badTerm) {
                this.terms.push(badTerm);
            }
        }
    }

    
    private estimate (word: string, r: number, c: number): number
    {
        // зліва від слова має бути пусто
        // if (c > 0 && this.field[r][c - 1].char !== EMPTY)
        //     return -1;
        // справа від слова має бути пусто
        if (c + 1 < this.size && this.field[r][c + 1].char !== EMPTY)
            return -1;
           
        for (let i = 0; i < word.length; i++) {
            const cell = this.field[r][c + i];
            // зверху не має бути дотиків до слова 
            if (cell.char === EMPTY && r > 0 && this.field[r - 1][c + i].char !== EMPTY)
               return -1; 
            // знизу не має бути дотиків до слова
            if (cell.char === EMPTY && r < this.size - 1 && this.field[r + 1][c + i].char !== EMPTY)
               return -1;       
        }

        let xCount = 0;
        for (let i = 0; i < word.length; i++) {
            const cell = this.field[r][c + i];
            // клітина пуста -> ok
            if (cell.char === EMPTY) 
                continue;
            // літери клітини и слова не співпадають -> wrong    
            if (cell.char !== word[i])
                return -1;
            // літери клітини и слова співпадають, але напрям клітини Dir.Hor -> wrong  
            if (cell.dir === Dir.Hor)
                return -1;
            //          
            xCount++;
            
        }
        return xCount;
    }


    private transpose() 
    { 

        function transDir(cell: Cell | BoundTerm) {
            cell.dir = cell.dir == Dir.Hor ? Dir.Ver : Dir.Hor;
        }
        
        // ------------------body-------------------------

        for (let r = 0; r < this.size; r++) {
            // lower main diagonal
            for (let c = 0; c < r; c++) {
                [this.field[r][c], this.field[c][r]] = [this.field[c][r], this.field[r][c]]
                transDir(this.field[r][c]); 
                transDir(this.field[c][r]); 
            }
             // on main diagonal
            transDir(this.field[r][r]);
        }

        // transpose used terms 
        for (const used of this.usedTerms) {
            [used.row, used.col] = [used.col, used.row];
            transDir(used);
        }
    }

//#endregion

     
    private getUserWord(used: BoundTerm): string {
        const { row, col, dir } = used;
        const word = used.term.word;
        const arr: string[] = [];
        for (let i = 0; i < word.length; i++) {
            const cell = dir === Dir.Ver ? 
                    this.field[row + i][col] : 
                    this.field[row][col + i];
            const char = cell.char.trim().slice(0, 1);
            arr.push(char);
        } 
        const userWord = this.regIgnore ? arr.join('').toLowerCase() : arr.join('');
        return userWord;
    }


    usedsContainsRC(r: number, c: number): BoundTerm[]
    {
        return this.usedTerms.filter(u => u.contains(r, c))
    }

    /** @returns number of user faults */
    uncover() 
    {
        const wrongUseds = this.usedTerms.filter(u => !this.isUsedOk(u));
        for (const used of wrongUseds) {
            const word = used.term.word
            for (let i = 0; i < word.length; i++) {
                if (used.dir == Dir.Hor)
                   this.field[used.row][used.col + i].char = word[i];
                else 
                   this.field[used.row + i][used.col].char = word[i];        
            }
        }
        return wrongUseds.length;
    }
    
    success() 
    {
        return this.usedTerms.every(u => this.isUsedOk(u))
    }

    isUsedOk(used: BoundTerm): boolean {
        const word = this.regIgnore ? used.term.word.toLowerCase() : used.term.word;
        return word.slice(0, this.auto) === this.getUserWord(used).slice(0, this.auto)
    }

}

export default Crossword 
