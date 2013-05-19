
  
/* vsdoc for _global_ */

(function (window) {
    

    window._global_ = {
        /// <summary></summary>
        /// <returns type="_global_"/>
                
        cmudictToArray: function(fileName) {
            /// <summary>Reads the cmudict file into a JavaScript array</summary>
            /// <param name="fileName" type="String">The name and location of the cmudict to parse.</param>
        }, 
        
        cmudictToSqliteDb: function(fileName) {
            /// <summary>Parses the cmudict file into an SQLite database.</summary>
            /// <param name="fileName" type="String">The name and location of the cmudict to parse.</param>
        }
        
    };

    var $x = window._global_;
    $x.__namespace = "true";
    $x.__typeName = "_global_";
})(this);

  

  
  
/* vsdoc for CmudictDb */

(function (window) {
    

    window.CmudictDb = function(cmudictFile){
        /// <summary></summary>
        /// <param name="cmudictFile" type="String">Optional. The name and location of the cmudict 
        ///  database generated with cmudictToSqliteDb. Defaults to cmudict.0.7a.sqlite.</param>
        /// <returns type="CmudictDb"/>
    };

    var $x = window.CmudictDb;
    $x.prototype = {
                
        unload: function() {
            /// <summary>Finalizes all preparedStatements and closes the database.</summary>
        }, 
        
        lookupWord: function(word, callback) {
            /// <summary>Searches for the given word.</summary>
            /// <param name="word" type="String">The word to look for in the words field.</param>
            /// <param name="callback" type="Function">The callback to execute when results have been 
            ///  retreived. Takes two arguments: error and rows, in that order.</param>
        }, 
        
        lookupCode: function(code, callback) {
            /// <summary>Searches for the given code.</summary>
            /// <param name="code" type="String">The code to look for in the code field.</param>
            /// <param name="callback" type="Function">The callback to execute when results have been 
            ///  retreived. Takes two arguments: error and rows, in that order.</param>
        }, 
        
        fuzzyLookupWord: function(word, callback) {
            /// <summary>Searches words for the given pattern. Both, the underscore and percent 
            ///  symbol, will match any character. The underscore consumes a single character 
            ///  and the percent symbol consumes multiple characters.</summary>
            /// <param name="word" type="String">The pattern to look for in the word field.</param>
            /// <param name="callback" type="Function">The callback to execute when results have been 
            ///  retreived. Takes two arguments: error and rows, in that order.</param>
        }, 
        
        fuzzyLookupCode: function(code, callback) {
            /// <summary>Searches for the given phoneme(s). Through creative use of wildcards, this 
            ///  method may be used to find assonance, consonance, rhyme, etc. Both, the 
            ///  underscore and percent symbol, will match any character. The underscore 
            ///  consumes a single character and the percent symbol consumes multiple 
            ///  characters.</summary>
            /// <param name="code" type="String">The pattern to look for in the code field.</param>
            /// <param name="callback" type="Function">The callback to execute when results have been 
            ///  retreived. Takes two arguments: error and rows, in that order.</param>
        }, 
        
        addEntry: function(word, code, callback) {
            /// <summary>Adds a new record to the database.</summary>
            /// <param name="word" type="String">The word to add to the word field.</param>
            /// <param name="code" type="String">The code to add to the code field.</param>
            /// <param name="callback" type="Function">The callback to execute when results have been 
            ///  retreived. Takes two arguments: error and rows, in that order.</param>
        }, 
        
        updateWord: function(updatedWord, oldWord, callback) {
            /// <summary>Fix misspelled words or typos in words.</summary>
            /// <param name="updatedWord" type="String">The corrected word.</param>
            /// <param name="oldWord" type="String">The misspelled word.</param>
            /// <param name="callback" type="Function">The callback to execute when results have been 
            ///  retreived. Takes two arguments: error and rows, in that order.</param>
        }, 
        
        updateCode: function(updatedCode, oldCode, callback) {
            /// <summary>Fix typos in codes.</summary>
            /// <param name="updatedCode" type="String">The corrected code.</param>
            /// <param name="oldCode" type="String">The misspelled code.</param>
            /// <param name="callback" type="Function">The callback to execute when results have been 
            ///  retreived. Takes two arguments: error and rows, in that order.</param>
        }, 
        
        "delete": function(word, callback) {
            /// <summary>Delete a record from the database.</summary>
            /// <param name="word" type="String">The word to remove.</param>
            /// <param name="callback" type="Function">The callback to execute when results have been 
            ///  retreived. Takes two arguments: error and rows, in that order.</param>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "CmudictDb";
})(this);


