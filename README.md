#cmudict-to-sqlite

A utility for parsing the CMU Pronouncing Dictionary into an sqlite database 
using Node.js

Also included is a helper class for looking up information in the database and 
manipulating it.

> The CMU Pronouncing Dictionary (also known as cmudict) is a public domain 
> pronouncing dictionary created by Carnegie Mellon University (CMU). It 
> defines a mapping from English words to their North American pronunciations, 
> and is commonly used in speech processing applications such as the Festival 
> Speech Synthesis System and the CMU Sphinx speech recognition system. The 
> latest release is 0.7a, which contains 133,746 entries (from 123,442 
> baseforms).
>
> [Wikipedia](http://en.wikipedia.org/wiki/CMU_Pronouncing_Dictionary)

A copy of cmudict.0.7a is included in the root of this project as is a copy of 
the sqlite database generated from it. The reasons I did not simply distribute 
the database are:

* The CMU Pronouncing Dictionary may be updated in the future
* SQLite may be updated and users may want to regenerate the database
* Users may wish to add their own updates to the cmudict and want to regenerate the database
* Users may wish to backup their database to the same format of the cmudict and run comparisons on the text of the original


## Install it on node from npm

`npm install cmudict-to-sqlite`

## Usage


### Converting the CMU Pronouncing Dictionary from the flat file `cmudict` into an sqlite database:

```
var cmu = require('cmudict-to-sqlite');
var fileName = 'cmudict.0.7a';
cmu.cmudictToSqliteDb(fileName);
```

Note that on a quad core AMD with 6 gigs of ram running windows 7 x64 and 
64 bit node v 0.8.18, it takes a few minutes to write out the database. While 
the database is being written the cursor will just sit there and blink. Be 
patient, it's writing a dictionary.


### Looking up information in the database

Once the SQLite database is generated you should be able to use whatever tools 
are available for looking up and manipulating the data. I've found 
[SQLite Studio](http://sqlitestudio.pl/) to be my favorite program for database 
management in SQLite. 

I have however, written a small class called CmudictDb for accessing the 
database and looking up information in it. So don't worry, you can look 
up information without learning any sql... just this random javascript 
thing I'm making up as I go along... The class is documented in the 
documentation which accompanies this here Node.js module and since I 
absolutely hate massive README files I'm not going to copy and paste it 
here. See the link below if you're just itching to read the docs online, 
right now. :D 



### Reading the CMU Pronouncing Dictionary from the flat file `cmudict` into a JavaScript array:

I export this function in case someone else wants to use it to import the 
cmudict into some other database. 

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

Note that it doesn't take much time at all to parse the cmudict into an array 
but, it's much more difficult to query an array than it is to query a database.


## Intellisense Support and Documentation

Visual studio intellisense support is available in docs/vsdoc/OpenLayersAll.js
Full documentation may be found at [http://matthewkastor.github.com/cmudict-to-sqlite](http://matthewkastor.github.com/cmudict-to-sqlite)