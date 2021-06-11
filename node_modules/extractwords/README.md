# extractwords [![Build Status](https://api.travis-ci.com/f-a-r-a-z/extractwords.svg?branch=master)](https://travis-ci.com/f-a-r-a-z/extractwords)



## Install

```
$ npm install extractwords
```


## Usage

```js
const extractwords = require('extractwords');

extractwords('Good Morning, how are you?');
//=> ['Good', 'Morning', 'how', 'are', 'you']

extractwords("He didn't pay for his meal m'aam");
//=> ['He', "didn't", 'pay', 'for', 'his', 'meal', "m'aam"]

extractwords("17651Hello*&!(*2I'm_++`~gOOd 2");
//=> ['Hello', "I'm", 'gOOd']

extractwords('Good morning, how are you?', {lowercase: true});
//=> ['good', 'morning', 'how', 'are', 'you']

extractwords('Good Morning. how are you?', {punctuation: true});
//=> ['Good', 'Morning.', 'how', 'are', 'you?']

extractwords('I . am ... go0d 2', {punctuation: true});
//=> ['I', '.', 'am', '...', 'go0d', '2']
```


## API

### extractwords(str, [options])

#### str

Type: `string`

Text containing words to be extracted.

#### options

Type: `object`

##### lowercase

Type: `boolean`<br>
Default: `false`

If `true`, all words returned are lowercased.

##### punctuation

Type: `boolean`<br>
Default: `false`

If `true`, all punctuation is retained.
