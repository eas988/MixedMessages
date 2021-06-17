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

import { syllable } from 'syllable'
import { generateRandomPoem } from './testSyllable.js';
import WordPOS from 'wordpos'
import poemGen from 'poem-gen';
import rhymingPart from 'rhyming-part';

WordPOS.defaults = {
    stopwords: false
}
const wordpos = new WordPOS();


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

// console.log(x)

async function syllableCountCheck(wordToCheck) {
    let newWord = '';
    const newLine = [];
    const wordSyllableCount = syllable(wordToCheck);
    while (syllable(newWord) != wordSyllableCount) {
        switch (true) {
            case await wordpos.isNoun(wordToCheck): newWord = await wordpos.randNoun({});
            break;
            case await wordpos.isVerb(wordToCheck): newWord = await wordpos.randVerb({});
            break;
            case await wordpos.isAdjective(wordToCheck): newWord = await wordpos.randAdjective({});
            break;
            case await wordpos.isAdverb(wordToCheck): newWord = await wordpos.randAdverb({});
            break;
            default: newWord = [wordToCheck];
        }
    }
    newLine.push(newWord[0]); // wordpos.rand methods return an array of string.
    return newLine
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


async function generateLyrics() {
    let poemRun = 0
    let lyrics = []
    while(poemRun < 4) {
    await generateRandomPoem(6, async (poem) => {
        const newPoem = [];

        for (let i = 0;  i < poem.lines.length; i++) {
            const line = poem.lines[i];

            const shuffledLine = []

            for (let j = 0; j < line.length; j++) {
                const word = line[j];
                shuffledLine.push(await syllableCountCheck(word));
            }
            newPoem.push(shuffledLine);
        }

        let unpackedPoem = await newPoem[0];
        let finalPoem = []
        for (let k = unpackedPoem.length - 1; k >= 0; k-- ) {
            finalPoem.push(unpackedPoem[k])
        }
        lyrics.push(finalPoem)
        if(lyrics.length === 4) {
            console.log(lyrics)
            let secondVerseRhyme = lyrics[1][(lyrics[1].length -1)][0] //placeholder containing value of second line's final word
            console.log(lyrics[1][(lyrics[1].length -1)][0])
            console.log(secondVerseRhyme)
            console.log(rhymingPart(secondVerseRhyme)) //Gives me the rhyming schema of the final word in the second verse
            let fourthVerseRhyme = lyrics[3][[(lyrics[3].length -1)]][0] //placeholder containing value of fourth line's final word
            console.log(fourthVerseRhyme)
            console.log(rhymingPart(fourthVerseRhyme)) // Gives me the rhyming schema of the final word in the fourth verse
            while(rhymingPart(secondVerseRhyme) === ''){ // Some of the words do not return a rhyming schema, so this will check the second verse's final word to make sure it has one and if not
                let promisedReplacementArraySecond = await syllableCountCheck(secondVerseRhyme)
                if (promisedReplacementArraySecond[0] === secondVerseRhyme) {
                    let breakoutWordReplacementSecond = await wordpos.rand({})
                    secondVerseRhyme = breakoutWordReplacementSecond[0]
                } else {
                    secondVerseRhyme = promisedReplacementArraySecond[0]; // runs the syllableCountCheck function to replace it until it does
                }
            }
            lyrics[1][(lyrics[1].length -1)][0] = secondVerseRhyme // replaces second line's final word with the new value of the placeholder secondVerseRhyme
            console.log(lyrics[1][(lyrics[1].length -1)][0] + " this is the updated second verse final word")
            console.log(rhymingPart(lyrics[1][(lyrics[1].length -1)][0]) + "this is the updated second verse final word's rhyming part")
            //Error gets thrown on the next line involving unhandled promise rejection.
            while(rhymingPart(secondVerseRhyme) !== rhymingPart(fourthVerseRhyme)) { // While the rhyming schema of the final word in the second verse and the final word in the fourth verse do not match,
                let promisedReplacementArrayFourth = await syllableCountCheck(fourthVerseRhyme);
                console.log(promisedReplacementArrayFourth[0])
                console.log(fourthVerseRhyme)
                if (promisedReplacementArrayFourth[0] === fourthVerseRhyme) {
                    let breakoutWordReplacementFourth = await wordpos.rand({})
                    fourthVerseRhyme = breakoutWordReplacementFourth[0]
                } else {
                    fourthVerseRhyme = promisedReplacementArrayFourth[0]; // I want to change the value of the final word in the fourth verse until it satisfies the while condition
                }
            }
            lyrics[3][[(lyrics[3].length -1)]][0] = fourthVerseRhyme // Then I want to update that element in my verse with the new value of replacementRhymeFourth
            console.log(lyrics[3][[(lyrics[3].length -1)]][0] + "this is the updated fourth verse final word")
            console.log(rhymingPart(lyrics[3][[(lyrics[3].length -1)]][0]) + "this is the updated fourth verse final word rhyming part")
            console.log(lyrics)
            

            //Make this into a function outside and test?
            // while(rhymingPart(secondVerseRhyme) != rhymingPart(fourthVerseRhyme)) {
            //     fourthVerseRhyme = await syllableCountCheck(fourthVerseRhyme)
            // }
            // lyrics[3][[lyrics[3].length -1]][0] = fourthVerseRhyme
            // console.log(lyrics)

        }
        })
        poemRun++;
    }
};

generateLyrics()


