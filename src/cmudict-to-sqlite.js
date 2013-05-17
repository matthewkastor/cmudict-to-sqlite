/*jslint
    white: true,
    node: true,
    stupid: true,
    nomen: true,
    vars: true,
    regexp: true
*/

/**
 * @fileOverview A utility for parsing the CMU Pronouncing Dictionary into an sqlite database using Node.js
 * @author <a href="mailto:matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 0.1.0
 * @requires fs
 * @requires sqlite3
 * @exports cmudictToArray
 * @exports cmudictToSqliteDb
 */
 
/**
 * Reads the cmudict into a JavaScript array
 * @author <a href="mailto:matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 20130517
 * @requires fs
 * @function
 * @param {String} fileName The name and location of the cmudict to parse.
 * @example
 * // Reading the CMU Pronouncing Dictionary from the flat file `cmudict` into 
 * // a JavaScript array:
 * 
 * var cmu = require('cmudict-to-sqlite');
 * var fileName = 'cmudict.0.7a';
 * var cmudict = cmu.cmudictToArray(fileName);
 * // the array will be huge and on my machine it takes longer to display it to 
 * // the console than it does to parse the file so, let's just display the first 
 * // thirty records
 * var count = 30;
 * while (count > 0) {
 *     console.log(cmudict[count]);
 *     count -= 1;
 * }
 */
function cmudictToArray (fileName) {
    'use strict';
    var fs = require('fs');
    var cmudict = fs.readFileSync(fileName, 'utf8');
    
    cmudict = cmudict.replace(/;;;.*/g, ''); // strip comments
    cmudict = cmudict.replace(/(\r\n|\r|\n)/g, '\n'); // normalize line endings
    cmudict = cmudict.trim(); // remove superfluous white space
    cmudict = cmudict.split('\n'); // split into array of lines
    cmudict = cmudict.map(function(line) {
        return line.split('  ');
    }); // array items subdivided into word @ 0 code @ 1
    
    return cmudict;
}

/**
 * Parses the cmudict into an SQLite database
 * @author <a href="mailto:matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 20130517
 * @requires sqlite3
 * @requires cmudictToArray
 * @function
 * @param {String} fileName The name and location of the cmudict to parse.
 * @example
 * // Converting the CMU Pronouncing Dictionary from the flat file `cmudict` into 
 * // an sqlite database:
 * 
 * var cmu = require('cmudict-to-sqlite');
 * var fileName = 'cmudict.0.7a';
 * cmu.cmudictToSqliteDb(fileName);
 */
function cmudictToSqliteDb (fileName) {
    'use strict';
    var sqlite3 = require('sqlite3').verbose();

    var db = new sqlite3.Database(fileName + '.sqlite');
    db.exec('PRAGMA journal_mode = MEMORY;');
    
    db.exec("CREATE TABLE cmudict (word TEXT, code TEXT)", function () {
        var stmt = db.prepare("INSERT INTO cmudict VALUES (?, ?)");
        cmudictToArray(fileName).forEach(function(entry) {
            stmt.run(entry[0], entry[1]);
        });
        stmt.finalize();
        db.close();
    });
}

module.exports.cmudictToArray = cmudictToArray;
module.exports.cmudictToSqliteDb = cmudictToSqliteDb;
