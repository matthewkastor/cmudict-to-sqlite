#cmudict-to-sqlite

A utility for parsing the CMU Pronouncing Dictionary into an sqlite database 
using Node.js

> The CMU Pronouncing Dictionary (also known as cmudict) is a public domain 
> pronouncing dictionary created by Carnegie Mellon University (CMU). It 
> defines a mapping from English words to their North American pronunciations, 
> and is commonly used in speech processing applications such as the Festival 
> Speech Synthesis System and the CMU Sphinx speech recognition system. The 
> latest release is 0.7a, which contains 133,746 entries (from 123,442 
> baseforms).
>
> [Wikipedia](http://en.wikipedia.org/wiki/CMU_Pronouncing_Dictionary)

## Install it on node from npm

`npm install cmudict-to-sqlite`

## Usage

Converting the CMU Pronouncing Dictionary from the flat file `cmudict` into 
an sqlite database:

```
var cmu = require('cmudict-to-sqlite');
var fileName = 'cmudict.0.7a';
cmu.cmudictToSqliteDb(fileName);
```

Reading the CMU Pronouncing Dictionary from the flat file `cmudict` into 
a JavaScript array:

```
var cmu = require('cmudict-to-sqlite');
var fileName = 'cmudict.0.7a';
var cmudict = cmu.cmudictToArray(fileName);
// the array will be huge and on my machine it takes longer to display it to 
// the console than it does to parse the file so, let's just display the first 
// thirty records
var count = 30;
while (count > 0) {
    console.log(cmudict[count]);
    count -= 1;
}
```

## Intellisense Support and Documentation

Visual studio intellisense support is available in docs/vsdoc/OpenLayersAll.js
Full documentation may be found at [http://matthewkastor.github.com/cmudict-to-sqlite](http://matthewkastor.github.com/cmudict-to-sqlite)