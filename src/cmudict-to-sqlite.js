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
 * @version 0.2.0
 * @requires fs
 * @requires sqlite3
 * @exports cmudictToArray
 * @exports cmudictToSqliteDb
 * @exports CmudictDb
 */
 
/**
 * Reads the cmudict file into a JavaScript array
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
 * Parses the cmudict file into an SQLite database.
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
    var sql = {
        "journalMode"   :   "PRAGMA journal_mode = MEMORY;",
        "insert"        :   "INSERT INTO cmudict VALUES (?, ?)",
        "dbCreate"      :   "CREATE TABLE cmudict ( " +
                                "word TEXT PRIMARY KEY ASC " +
                                    "NOT NULL ON CONFLICT ABORT " +
                                    "UNIQUE ON CONFLICT ABORT, " +
                                "code TEXT NOT NULL ON CONFLICT ABORT " +
                            ");"
    };
    var db = new sqlite3.Database(fileName + '.sqlite');
    db.exec(sql.journalMode);
    db.exec(sql.dbCreate, function () {
        var stmt = db.prepare(sql.insert);
        cmudictToArray(fileName).forEach(function(entry) {
            stmt.run(entry[0], entry[1]);
        });
        stmt.finalize();
        db.close();
    });
}

/**
 * Represents the cmudict database and provides convenience methods for common 
 *  tasks. When creating a new instance of the 
 *  CmudictDb the given database file will be opened and several prepared 
 *  statements will be loaded. Be sure to call the unload method when you are 
 *  finished using the database so that the database may be closed properly.
 * @class Represents the cmudict database and provides convenience methods for 
 * common tasks.
 * @param {String} cmudictFile Optional. The name and location of the cmudict 
 *  database generated with cmudictToSqliteDb. Defaults to cmudict.0.7a.sqlite.
 * @author <a href="mailto:matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 20130518
 * @see cmudictToSqliteDb
 * @requires sqlite3
 */
function CmudictDb (cmudictFile) {
    'use strict';
    var my = this;
    var sqlite3 = require('sqlite3').verbose();
    cmudictFile = cmudictFile || 'cmudict.0.7a.sqlite';
    my.db = new sqlite3.Database(cmudictFile);
    my.db.exec('PRAGMA journal_mode = MEMORY;');
    my.preparedStatements = {
        "lookupWord" : my.db.prepare("SELECT * FROM cmudict WHERE word IS ?"),
        "lookupCode" : my.db.prepare("SELECT * FROM cmudict WHERE code IS ?"),
        "fuzzyLookupWord" : my.db.prepare("SELECT * FROM cmudict WHERE word LIKE ?"),
        "fuzzyLookupCode" : my.db.prepare("SELECT * FROM cmudict WHERE code LIKE ?"),
        "addEntry" : my.db.prepare("INSERT INTO cmudict VALUES (?,?);"),
        "updateWord" : my.db.prepare("UPDATE cmudict SET word=? WHERE word=?;"),
        "updateCode" : my.db.prepare("UPDATE cmudict SET code=? WHERE code=?;"),
        "deleteEntry" : my.db.prepare("DELETE FROM cmudict WHERE word=?;")
    };
}
/**
 * Finalizes all preparedStatements and closes the database.
 * @author <a href="mailto:matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 20130518
 */
CmudictDb.prototype.unload = function unload () {
    'use strict';
    var my = this;
    Object.keys(my.preparedStatements).forEach(function (stmt) {
        my.preparedStatements[stmt].finalize();
    });
    my.db.close();
};
/**
 * Searches for the given word.
 * @author <a href="mailto:matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 20130518
 * @param {String} word The word to look for in the words field.
 * @param {Function} callback The callback to execute when results have been 
 *  retreived. Takes two arguments: error and rows, in that order.
 * @example
 * var cmu = require('cmudict-to-sqlite');
 * cmu = new cmu.CmudictDb();
 * cmu.lookupWord('zebra', function (err, rows) {
 *     console.log('lookupWord Results');
 *     if (err) { console.log(err); }
 *     if (rows) { console.log(rows); }
 * });
 * // do other stuff with the database . . .
 * cmu.unload();
 */
CmudictDb.prototype.lookupWord = function lookupWord (word, callback) {
    'use strict';
    var my = this;
    word = word.toUpperCase();
    my.preparedStatements.lookupWord.all(word, callback);
};
/**
 * Searches for the given code.
 * @author <a href="mailto:matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 20130518
 * @param {String} code The code to look for in the code field.
 * @param {Function} callback The callback to execute when results have been 
 *  retreived. Takes two arguments: error and rows, in that order.
 * @example
 * var cmu = require('cmudict-to-sqlite');
 * cmu = new cmu.CmudictDb();
 * cmu.lookupCode('ah1 p s ay1 z', function (err, rows) {
 *     console.log('lookupCode Results');
 *     if (err) { console.log(err); }
 *     if (rows) { console.log(rows); }
 * });
 * // do other stuff with the database . . .
 * cmu.unload();
 */
CmudictDb.prototype.lookupCode = function lookupCode (code, callback) {
    'use strict';
    var my = this;
    code = code.toUpperCase();
    my.preparedStatements.lookupCode.all(code, callback);
};
/**
 * Searches words for the given pattern. Both, the underscore and percent 
 *  symbol, will match any character. The underscore consumes a single character 
 *  and the percent symbol consumes multiple characters.
 * @author <a href="mailto:matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 20130518
 * @param {String} word The pattern to look for in the word field.
 * @param {Function} callback The callback to execute when results have been 
 *  retreived. Takes two arguments: error and rows, in that order.
 * @example
 * var cmu = require('cmudict-to-sqlite');
 * cmu = new cmu.CmudictDb();
 * cmu.fuzzyLookupWord('zeb%', function (err, rows) {
 *     console.log('fuzzyLookupWord Results');
 *     if (err) { console.log(err); }
 *     if (rows) { console.log(rows); }
 * });
 * // do other stuff with the database . . .
 * cmu.unload();
 */
CmudictDb.prototype.fuzzyLookupWord = function fuzzyLookupWord (word, callback) {
    'use strict';
    var my = this;
    word = word.toUpperCase();
    my.preparedStatements.fuzzyLookupWord.all(word, callback);
};
/**
 * Searches for the given phoneme(s). Through creative use of wildcards, this 
 *  method may be used to find assonance, consonance, rhyme, etc. Both, the 
 *  underscore and percent symbol, will match any character. The underscore 
 *  consumes a single character and the percent symbol consumes multiple 
 *  characters.
 * @author <a href="mailto:matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 20130518
 * @param {String} code The pattern to look for in the code field.
 * @param {Function} callback The callback to execute when results have been 
 *  retreived. Takes two arguments: error and rows, in that order.
 * @example
 * var cmu = require('cmudict-to-sqlite');
 * cmu = new cmu.CmudictDb();
 * cmu.fuzzyLookupCode('%r ah1 p t%', function (err, rows) {
 *     // finds words containing the sound "rupt" i.e. erupt and corrupt
 *     console.log('fuzzyLookupCode Results for %r ah1 p t%');
 *     if (err) { console.log(err); }
 *     if (rows) { console.log(rows); }
 * });
 * // do other stuff with the database . . .
 * cmu.unload();
 */
CmudictDb.prototype.fuzzyLookupCode = function fuzzyLookupCode (code, callback) {
    'use strict';
    var my = this;
    code = code.toUpperCase();
    my.preparedStatements.fuzzyLookupCode.all(code, callback);
};
/**
 * Adds a new record to the database.
 * @author <a href="mailto:matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 20130519
 * @param {String} word The word to add to the word field.
 * @param {String} code The code to add to the code field.
 * @param {Function} callback The callback to execute when results have been 
 *  retreived. Takes two arguments: error and rows, in that order.
 * @example
 * var cmu = require('cmudict-to-sqlite');
 * cmu = new cmu.CmudictDb();
 * cmu.addEntry('superfakeword', 'xo xo xo1', function (err, rows) {
 *     console.log('addEntry Results');
 *     if (err) { console.log(err); }
 *     if (rows) { console.log(rows); }
 * });
 * // do other stuff with the database . . .
 * cmu.unload();
 */
CmudictDb.prototype.addEntry = function addEntry (word, code, callback) {
    'use strict';
    var my = this;
    word = word.toUpperCase();
    code = code.toUpperCase();
    my.preparedStatements.addEntry.all(word, code, callback);
};
/**
 * Fix misspelled words or typos in words.
 * @author <a href="mailto:matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 20130519
 * @param {String} updatedWord The corrected word.
 * @param {String} oldWord The misspelled word.
 * @param {Function} callback The callback to execute when results have been 
 *  retreived. Takes two arguments: error and rows, in that order.
 * @example
 * var cmu = require('cmudict-to-sqlite');
 * cmu = new cmu.CmudictDb();
 * cmu.updateWord('superfakewordzzz', 'superfakeword', function (err, rows) {
 *     console.log('updateWord Results');
 *     if (err) { console.log(err); }
 *     if (rows) { console.log(rows); }
 * });
 * // do other stuff with the database . . .
 * cmu.unload();
 */
CmudictDb.prototype.updateWord = function updateWord (updatedWord, oldWord, callback) {
    'use strict';
    var my = this;
    updatedWord = updatedWord.toUpperCase();
    oldWord = oldWord.toUpperCase();
    my.preparedStatements.updateWord.all(updatedWord, oldWord, callback);
};
/**
 * Fix typos in codes.
 * @author <a href="mailto:matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 20130519
 * @param {String} updatedCode The corrected code.
 * @param {String} oldCode The misspelled code.
 * @param {Function} callback The callback to execute when results have been 
 *  retreived. Takes two arguments: error and rows, in that order.
 * @example
 * var cmu = require('cmudict-to-sqlite');
 * cmu = new cmu.CmudictDb();
 * cmu.updateCode('xo1 xo xo', 'xo xo xo1', function (err, rows) {
 *     console.log('updateCode Results');
 *     if (err) { console.log(err); }
 *     if (rows) { console.log(rows); }
 * });
 * // do other stuff with the database . . .
 * cmu.unload();
 */
CmudictDb.prototype.updateCode = function updateCode (updatedCode, oldCode, callback) {
    'use strict';
    var my = this;
    updatedCode = updatedCode.toUpperCase();
    oldCode = oldCode.toUpperCase();
    my.preparedStatements.updateCode.all(updatedCode, oldCode, callback);
};
/**
 * Delete a record from the database.
 * @author <a href="mailto:matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 20130519
 * @param {String} word The word to remove.
 * @param {Function} callback The callback to execute when results have been 
 *  retreived. Takes two arguments: error and rows, in that order.
 * @example
 * var cmu = require('cmudict-to-sqlite');
 * cmu = new cmu.CmudictDb();
 * cmu.deleteEntry('superfakewordzzz', function (err, rows) {
 *     console.log('deleteEntry Results');
 *     if (err) { console.log(err); }
 *     if (rows) { console.log(rows); }
 * });
 * // do other stuff with the database . . .
 * cmu.unload();
 */
CmudictDb.prototype.deleteEntry = function deleteEntry (word, callback) {
    'use strict';
    var my = this;
    word = word.toUpperCase();
    my.preparedStatements.deleteEntry.all(word, callback);
};


module.exports.cmudictToArray = cmudictToArray;
module.exports.cmudictToSqliteDb = cmudictToSqliteDb;
module.exports.CmudictDb = CmudictDb;