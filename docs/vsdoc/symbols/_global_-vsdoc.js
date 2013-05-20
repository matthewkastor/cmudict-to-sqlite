
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
