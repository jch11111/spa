/**
 * spa.util_b.js
 * JavaScript browser utilities
*/

spa.util_b = (function () {
    'use strict';

    //----------------------- BEGIN MODULE SCOPE VARIABLES ------------------------------
    var
        configMap = {
            regex_encode_html   : /[&"'><]/g,
            regex_encode_map    : /["'><]/g,
            html_encode_map     : {
                '&'     : '&#38;',
                '"'     : '&#34;',
                "'"     : '&#39;',
                '>'     : '&#62;',
                '<'     : '&#60;'
            }
        },
        decodeHtml,
        encodeHtml,
        getEmSize;

        configMap.encode_noamp_map = $.extend(
            {}, configMap.html_encode_map
        );
        delete configMap.encode_noamp_map['&'];
    //----------------------- END MODULE SCOPE VARIABLES ------------------------------

    //----------------------- BEGIN UTILITY METHODS ------------------------------
    // Begin decodeHtml
    // Decodes HTML entitites in a browser friendly way
    // See https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
    decodeHtml = function ( str ) {

    };


} ());