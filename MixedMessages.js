//As a musician who understands basic music theory (note locations, first/fifth two note chords, progressions, musical keys)
//I want the song-generator to create multiple random batches of three or four syllable per line lyrics and a randomized variant of the I–V–vi–IV chord progression in a random key
//So that I can immediately play a prefabricated song

//Given the song-generator is set to four batches and the three syllable per line lyric option
//When the song-generator is run
//Then a random string of lyrics a total of twelve syllables long (four batches of three syllables), a randomized variant of the I-V-vi-IV chord progression, and a random musical key are generated, ex: [["It's alright", "to tell me", "what you think", "about me"], "I–V–vi–IV", "C major"]

//Given the song-generator has produced at least four batches of lyrics, regardless of syllable count
//When comparing the last word of the second and fourth batches
//Then the words must rhyme

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

randomizeProgression();