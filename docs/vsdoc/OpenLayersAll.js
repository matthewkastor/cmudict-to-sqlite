
  
/* vsdoc for _global_ */

(function (window) {
    

    window._global_ = {
        /// <summary></summary>
        /// <returns type="_global_"/>
                
        cmudictToArray: function(fileName) {
            /// <summary>Reads the cmudict file into a JavaScript array of arrays.</summary>
            /// <param name="fileName" type="String">The name and location of the cmudict to parse.</param>
            /// <returns type="Array">An array of arrays. Each element in the
            ///  array is an array with item 0 being the word and item 1 being the ARPAbet 
            ///  code. The array will also have a license property which contains the license
            ///  header from the given cmudict file.</returns>
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
        /// <summary>Represents the cmudict database and provides convenience methods for common 
        /// ///  tasks. When creating a new instance of the 
        /// ///  CmudictDb the given database file will be opened and several prepared 
        /// ///  statements will be loaded. Be sure to call the unload method when you are 
        /// ///  finished using the database so that the database may be closed properly. 
        /// ///  The dictionary is stored in the cmudict table and information, including 
        /// ///  the license for the CMU Pronunciation Dictionary itself, is stored in the 
        /// ///  metadata table.</summary>
        /// <param name="cmudictFile" type="String">Optional. The name and location of the cmudict 
        ///  database generated with cmudictToSqliteDb. Defaults to cmudict.0.7a.sqlite.</param>
    };

    var $x = window.CmudictDb;
    $x.prototype = {
                
        unload: function() {
            /// <summary>Finalizes all preparedStatements and closes the database.</summary>
        }, 
        
        saveAsText: function(fileName, callback) {
            /// <summary>Saves the contents of the database as a text file using the same format as the 
            ///  original cmudict. The contents of metadata.license will be prepended to the 
            ///  beginning of the file, change it if you want to add information to the 
            ///  license.</summary>
            /// <param name="fileName" type="String">The name and location of the output file.</param>
            /// <param name="callback" type="Function">The callback to execute after the file is 
            ///  written. The callback will be called with one argument, the string which 
            ///  was written to file.</param>
        }, 
        
        lookupMetadata: function(name, callback) {
            /// <summary>Searches for the given metadata.</summary>
            /// <param name="name" type="String">The name of the metadata.</param>
            /// <param name="callback" type="Function">The callback to execute when results have been 
            ///  retreived. Takes two arguments: error and rows, in that order.</param>
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
        
        addMetadata: function(name, data, callback) {
            /// <summary>Adds a new record to the metadata table.</summary>
            /// <param name="name" type="String">The name of the metadata</param>
            /// <param name="data" type="String">The data associated with the metadata name.</param>
            /// <param name="callback" type="Function">The callback to execute when results have been 
            ///  retreived. Takes two arguments: error and rows, in that order.</param>
        }, 
        
        addEntry: function(word, code, callback) {
            /// <summary>Adds a new record to the cmudict table.</summary>
            /// <param name="word" type="String">The word to add to the word field.</param>
            /// <param name="code" type="String">The code to add to the code field.</param>
            /// <param name="callback" type="Function">The callback to execute when results have been 
            ///  retreived. Takes two arguments: error and rows, in that order.</param>
        }, 
        
        updateMetadata: function(data, name, callback) {
            /// <summary>Update metadata entries.</summary>
            /// <param name="data" type="String">The updated data</param>
            /// <param name="name" type="String">The name of the metadata to update.</param>
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
        
        deleteMetadata: function(name, callback) {
            /// <summary>Delete a record from the metadata table.</summary>
            /// <param name="name" type="String">The metadata to remove.</param>
            /// <param name="callback" type="Function">The callback to execute when results have been 
            ///  retreived. Takes two arguments: error and rows, in that order.</param>
        }, 
        
        deleteEntry: function(word, callback) {
            /// <summary>Delete a record from the cmudict table.</summary>
            /// <param name="word" type="String">The word to remove.</param>
            /// <param name="callback" type="Function">The callback to execute when results have been 
            ///  retreived. Takes two arguments: error and rows, in that order.</param>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "CmudictDb";
})(this);


