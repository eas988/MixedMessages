// import {syllable} from 'syllable'

// console.log(syllable("vehementlying"))

// import pkg from 'rhyming-part';
// const {rhymingPart} = pkg;

// rhymingPart("helmet")

import rhyming from 'rhyming-part';
const {rhymingPart} = rhyming;

import WordPOS from 'wordpos'
const wordpos = new WordPOS();


wordpos.getAdjectives('The angry bear chased the frightened little squirrel.', function(result){
    console.log(result);
});
// [ 'little', 'angry', 'frightened' ]

wordpos.isAdjective('awesome', function(result){
    console.log(result);
});
// true 'awesome'

wordpos.getPOS()