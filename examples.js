/*jslint
    white: true,
    node: true,
    stupid: true,
    nomen: true,
    vars: true,
    regexp: true
*/

var cmu = require('cmudict-to-sqlite');
cmu = new cmu.CmudictDb();

cmu.lookupWord('zebra', function (err, rows) {
    'use strict';
    console.log('lookupWord Results for zebra');
    if (err) { console.log(err); }
    if (rows) { console.log(rows); }
});
cmu.lookupCode('ah1 p s ay1 z', function (err, rows) {
    'use strict';
    console.log('lookupCode Results for ah1 p s ay1 z');
    if (err) { console.log(err); }
    if (rows) { console.log(rows); }
});

// wrapping fuzzyLookupWord example for use below.
function show (word) {
    'use strict';
    cmu.fuzzyLookupWord(word, function (err, rows) {
        console.log('fuzzyLookupWord Results for ' + word);
        if (err) { console.log(err); }
        if (rows) { console.log(rows); }
    });
}
show('zeb%');

cmu.fuzzyLookupCode('%r ah1 p t%', function (err, rows) {
    'use strict';
    console.log('fuzzyLookupCode Results for %r ah1 p t%');
    if (err) { console.log(err); }
    if (rows) { console.log(rows); }
});
 
cmu.addEntry('superfakeword', 'xo xo xo1', function (err, rows) {
    'use strict';
    console.log('addEntry Results for superfakeword, xo xo xo1');
    if (err) { console.log(err); }
    if (rows) {
        console.log(rows);
        show('superfake%');
        /*jslint undef:true */
        upword();
        /*jslint undef:false */
    }
});

// wrapping the updateWord example instead of embedding it in the addEntry
// example. The sqlite3 module operates asynchronously.
function upword () {
    'use strict';
    cmu.updateWord('superfakewordzzz', 'superfakeword', function (err, rows) {
        console.log('updateWord Results for superfakewordzzz, superfakeword');
        if (err) { console.log(err); }
        if (rows) {
            console.log(rows);
            show('superfake%');
            /*jslint undef:true */
            upcode();
            /*jslint undef:false */
        }
    });
}

// wrapping the updateCode example instead of embedding it.
function upcode () {
    'use strict';
    cmu.updateCode('xo1 xo xo', 'xo xo xo1', function (err, rows) {
        console.log('updateCode Results for xo1 xo xo, xo xo xo1');
        if (err) { console.log(err); }
        if (rows) {
            console.log(rows);
            show('superfake%');
            /*jslint undef:true */
            del();
            /*jslint undef:false */
        }
    });
}

// wrapping the deleteEntry example instead of embedding it.
function del () {
    'use strict';
    cmu.deleteEntry('superfakewordzzz', function (err, rows) {
        console.log('deleteEntry Results for superfakewordzzz');
        if (err) { console.log(err); }
        if (rows) {
            console.log(rows);
            show('superfake%');
            // do other stuff with the database, you'll have to move the unload
            // call to wherever you're finished with the database.
            cmu.unload();
        }
    });
}