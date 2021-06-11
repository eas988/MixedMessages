# rhyming-part [![Build Status](https://travis-ci.com/f-a-r-a-z/rhyming-part.svg?branch=master)](https://travis-ci.com/f-a-r-a-z/rhyming-part)

> Get the part of a word that rhymes with other words

Uses the CMU Pronouncing Dictionary (4MB) to get the rhyming part of a word's pronounciation. This can be used to check if words rhyme with each other, or group together words that rhyme.


## Install

```
$ npm install rhyming-part
```


## Usage

```js
const rhymingPart = require('rhyming-part');

rhymingPart('Hello');
//=> 'OW1'

rhymingPart('Below');
//=> 'OW1'

rhymingPart('treat');
//=> 'IY1 T'

rhymingPart('Would you like a treat?');
//=> 'IY1 T'

rhymingPart('Sweet');
//=> 'IY1 T'

rhymingPart('ajhakjhksa');
//=> ''

rhymingPart('Taxes', {multiple: true});
//=> ['AE1 K S AH0 Z', 'AE1 K S IH0 Z']

rhymingPart('taped', {multiple: true});
//=> ['EY1 P T']

rhymingPart('uahoahja', {multiple: true});
//=> []
```


## API

### rhymingPart(input, [options])

#### input

Type: `string`

The word to get the rhyming part from. Uses the last word from the input.

#### options

Type: `object`

##### multiple

Type: `boolean`<br>
Default: `false`

If `true`, returns an array of unique rhyming parts for all pronounciations of the word.


## License

MIT © [Faraz](https://github.com/f-a-r-a-z)
