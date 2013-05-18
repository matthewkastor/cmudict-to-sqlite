
/* vsdoc for CmudictDb */

(function (window) {
    

    window.CmudictDb = function(cmudictFile){
        /// <summary></summary>
        /// <param name="cmudictFile" type="String">The name and location of the cmudict database 
        ///  generated with cmudictToSqliteDb.</param>
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
            /// <summary>Searches codes for the given pattern. Both, the underscore and percent 
            ///  symbol, will match any character. The underscore consumes a single character 
            ///  and the percent symbol consumes multiple characters.</summary>
            /// <param name="code" type="String">The pattern to look for in the code field.</param>
            /// <param name="callback" type="Function">The callback to execute when results have been 
            ///  retreived. Takes two arguments: error and rows, in that order.</param>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "CmudictDb";
})(this);
