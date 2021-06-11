const pronounciations = require('cmu-pronouncing-dictionary');
const extractwords = require('extractwords');

module.exports = (str) => {
    const wordList = extractwords(str);
    let syllables = 0;

    for (let i = 0; i < wordList.length; i++) {
        let word = wordList[i].toLowerCase();
        let pronounciation = pronounciations[word] || '';
        let stresses = pronounciation.match(/[0-2]/g) || [];
        syllables += stresses.length;
    }

    return syllables;
}
