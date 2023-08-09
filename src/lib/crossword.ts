import { Term, Used, Cell, EMPTY, HOR, VER } from './classes'
import {shuffleArray} from './utils'


/** Підтримує автоматичну побудову та вирішення кросворду користвачем. */
class Crossword 
{
    static K = 3   // K * size = кількість спроб додавання слова в кросворд

    /** Терміни, використані для побудови к.*/
    useds: Used[] = [];   
    /** Кількість перетинів слів */ 
    xCount = 0;
    /** Ігрове поле */ 
    field: Cell[][];

    size;
    terms;
    regIgnore;

    /**
     * @param size - сторона квадратного поля к.
     * @param terms - терміни-кандидати, з яких збудують к.
     * @param regIgnore - флаг, чи враховувати регістр літер при перевірці
     */
    constructor(size: number, terms: Term[], regIgnore = true) {
        
        function emptyField (size:number) {
            const field = new Array(size);
            for (let r = 0; r < size; r++) {
                field[r] = new Array(size);
                for (let c = 0; c < size; c++) {
                    field[r][c] = new Cell();
                }
            }
            return field;
        }

        // ---------------------body----------------------
        this.size = size;
        this.terms = terms;
        this.regIgnore = regIgnore;

        this.field = emptyField(size) 
            
        shuffleArray(this.terms);
        this.buildCrossword();   
    }


//#region  Epilog
    
    replaceLettersWithSpaces() {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.field[r][c].char !== EMPTY) {
                    this.field[r][c].char = '';
                }
            }
        }
    }

    setInfoToCells() {
        for (const used of this.useds) {
            let cell = this.field[used.row][used.col];
            if (!cell.info) 
            {
                // no info in the cell yet
                cell.info = used;                    
            } 
            else 
            {
                // the cell already has one info, other will be HOR
                let dir = used.dir == HOR ? HOR : VER
                cell.info.term.def += `\n(${dir}) ` + used.term.def;
            }
        }
    }

//#endregion

//#region Build Crossword

    buildCrossword() 
    {
        let r = this.size / 2 |0;
        let c = (this.size - this.terms[0].word.length) / 2 |0;
        
        this.useFirstTerm_n_Trans(r, c);

        for (let i = 1; i < this.size * Crossword.K; i++) {
            this.tryUseFirstOfTerms();
        }        
    }

    private tryUseFirstOfTerms() 
    {    
        if (this.terms.length === 0)
           return;

        // Find all the right places      
        let places = [];
        let word = this.terms[0].word;
        for (let r = 0; r < this.size; r += 2) {
            for (let c = 0; c < this.size - word.length; c++) {
                let e = this.estimate(word, r, c);
                if (e > 0) {
                    places.push({r, c, e})
                }
            }
        }
        
        // random select one of places

        if (places.length) {
            let i = Math.floor(Math.random() * places.length);
            this.useFirstTerm_n_Trans(places[i].r, places[i].c);
            this.xCount += places[i].e;    
        } else {
            // move a bad term to the end of this.terms
            this.terms.push(this.terms.shift()!)
        }
    }

    
    private estimate (word: string, r:number, c: number) 
    {
        // зліва і справа від слова має бути пусто
        if (c > 0 && this.field[r][c - 1].char !== EMPTY)
            return -1;
        if (c + 1 < this.size && this.field[r][c + 1].char !== EMPTY)
            return -1;

        let xCount = 0;
        for (let i = 0; i < word.length; i++) {
            let cell = this.field[r][c + i];
            // клітина пуста - ok
            if (cell.char === EMPTY) 
                continue;
            // літери клітини и слова не співпадають - wrong    
            if (cell.char !== word[i])
                return -1;
            // літери клітини и слова співпадають, але напрям клітини HOR - wrong  
            if (cell.dir === HOR)
                return -1;
            //          
            xCount++;
            
        }
        return xCount;
    }


    private useFirstTerm_n_Trans(r: number, c: number) 
    {
        let term = this.terms[0];
        let word = term.word;

        for (let i = 0; i < word.length; i++) {
            this.field[r][c + i] = new Cell(word[i], HOR);
        }
        let newUsed = new Used(term, r, c, HOR);

        // move from 'this.useds' to 'this.terms'
        this.useds.push(newUsed);
        this.terms.splice(0, 1);
    
        this.transpose();
    }

    private transpose() 
    { 

        function transDir(cell: Cell | Used) {
            cell.dir = cell.dir == HOR ? VER : HOR;
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

        // transpose useds 
        for (let used of this.useds) {
            [used.row, used.col] = [used.col, used.row];
            transDir(used);
        }
    }

//#endregion

     
    private getUserWord(used: Used): string {
        const { row, col, dir } = used;
        const word = used.term.word;
        let arr: string[] = [];
        for (let i = 0; i < word.length; i++) {
            let cell = dir === VER ? 
               this.field[row + i][col] : 
               this.field[row][col + i];
            let char = cell.char.trim().slice(0, 1);
            arr.push(char);
        } 
        const userWord = this.regIgnore ? arr.join('').toLowerCase() : arr.join('');
        return userWord;
    }


    usedsContainsRC(r: number, c: number): Used[]
    {
        return this.useds.filter(u => u.contains(r, c))
    }

    uncover() 
    {
        let useds = this.useds.filter(u => !this.isUsedOk(u));
        for (let used of useds) {
            let word = used.term.word
            for (let i = 0; i < word.length; i++) {
                if (used.dir == HOR)
                   this.field[used.row][used.col + i].char = word[i];
                else 
                   this.field[used.row + i][used.col].char = word[i];        
            }
        }
    }
    

    isUsedOk(used: Used): boolean {
        const word = this.regIgnore ? used.term.word.toLowerCase() : used.term.word;
        return word === this.getUserWord(used)
    }

}

export default Crossword 
