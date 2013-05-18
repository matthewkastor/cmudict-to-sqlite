var cmu = require('cmudict-to-sqlite');
cmu = new cmu.CmudictDb();
cmu.lookupWord('zebra', function (err, rows) {
    console.log('lookupWord Results');
    console.log(rows);
});
cmu.lookupCode('ah1 p s ay1 z', function (err, rows) {
    console.log('lookupCode Results');
    console.log(rows);
});
cmu.fuzzyLookupWord('zeb%', function (err, rows) {
    console.log('fuzzyLookupWord Results');
    console.log(rows);
});
cmu.fuzzyLookupCode('%s ay1 z%', function (err, rows) {
    console.log('fuzzyLookupCode Results');
    console.log(rows);
});
// do other stuff with the database . . .
cmu.unload();