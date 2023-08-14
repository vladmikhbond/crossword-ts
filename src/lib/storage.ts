import { browser } from '$app/environment';

import { getTopicTerms } from '$lib/data'

const TOPIC_INDEX_KEY = 'topicIdx';

export default class Storage 
{
    static readTerms(topicKey: string) 
    {
        if (browser) {
            let jsonString = window.localStorage.getItem(topicKey);
            if (jsonString) {
                return JSON.parse(jsonString);
            }    
        }   
        return getTopicTerms(topicKey);
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