import { browser } from '$app/environment';
import { Term } from './classes'
import { data } from '$lib/data'

const TOPIC_INDEX_KEY = 'topicIdx';

export default class Storage 
{
    private static getTopicTerms(key: string) {
        let terms = [];
    
        let lines = data[key].terms.split('\n');
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
    

    static readTerms(topicKey: string) 
    {
        if (browser) {
            let jsonString = window.localStorage.getItem(topicKey);
            if (jsonString) {
                return JSON.parse(jsonString);
            }    
        }   
        return Storage.getTopicTerms(topicKey);
    }


    static saveTermsToStorage(topic: string, wordsOk: string[]) 
    {
        let terms = Storage.readTerms(topic);
        for (let i = 0; i < terms.length; i++) {
            if (wordsOk.indexOf(terms[i].word) > -1) {
                terms[i].freq++;
            }      
        }
        if (browser) {
            const jsonString = JSON.stringify(terms);
            localStorage.setItem(topic, jsonString);
        }
    }



    static saveTopicIdx(topicIdx: number) 
    {
        if (browser) {
            localStorage.setItem(TOPIC_INDEX_KEY, topicIdx.toString());
        }
    }


    static readTopicIdx(): number 
    {   
        let topicIdx = 0;
        if (browser) {
            let str = localStorage.getItem(TOPIC_INDEX_KEY);
            if (str) {
               topicIdx = +str;
            }
        } 
        return topicIdx;
    }
}