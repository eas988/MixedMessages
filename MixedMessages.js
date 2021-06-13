//As a musician who understands basic music theory (note locations, first/fifth two note chords, progressions, musical keys)
//I want the song-generator to create multiple random batches of twelve or sixteen syllables divided into four segments lyrics and a randomized variant of the I–V–vi–IV chord progression in a random key
//So that I can immediately play a prefabricated song

//Given the song-generator is set to four batches and the twelve syllables lyric option
//When the song-generator is run
//Then a random string of lyrics a total of twelve syllables long (four lines of three syllables), a randomized variant of the I-V-vi-IV chord progression, and a random musical key are generated, ex: [["It's alright", "to tell me", "what you think", "about me"], "I–V–vi–IV", "C major"]

//Given the song-generator has produced at least four lines of lyrics, regardless of syllable count
//When comparing the last word of the second and fourth lines
//Then the words must rhyme

//Issue: Import and Require are mutually exclusive? Syllables package is import, cannot figure out how to get words.txt without require. Rhymes is also require. 
//Possible solution - find syllable tracker that is not an import? --- https://www.npmjs.com/package/syllables

import {syllable} from 'syllable'

import rhyming from 'rhyming-part';
const {rhymingPart} = rhyming;

import WordPOS from 'wordpos'
WordPOS.defaults = {
    stopwords: false
}
const wordpos = new WordPOS();

import poemgen from 'poem-gen';


const keyArray = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const majorMinor = ["major", "minor"];

// CMajorScale = [C, D, E, F, G, A, B, C]
// DMinor = [D, E, F, G, A, C#, C, D]

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomizeProgression() {
    let randomProgression = []
    const standardProgression = ["I", "V", "vi", "IV"];
    let startIndex = Math.floor(Math.random() * standardProgression.length);
    for(let i = startIndex; i <= startIndex + 3 ; i++) {
        randomProgression.push(standardProgression[i % 4]);
    }
    return randomProgression;
}

//create a string of random words that add up to twelve or sixteen syllables




async function createLine(num12Or16) {
    if(num12Or16 === 12 || num12Or16 === 16) {
        let maxSyllableCount = num12Or16;
        let currentSyllableCount = 0;
        let newLine = [];
        while(currentSyllableCount < maxSyllableCount){
            let newWord = await wordpos.rand()
            let newWordSyllableCount = syllable(newWord);
            if(newWordSyllableCount > 0 && newWordSyllableCount + currentSyllableCount <= maxSyllableCount) {
                newLine.push(newWord[0]);
                currentSyllableCount += newWordSyllableCount;
            }
        }
        return newLine
    } else {
        return "Syllable count is incorrect.";
    }
}

let x = await createLine(12)

console.log(x)