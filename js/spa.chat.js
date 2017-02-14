/*
* spa.chat.js
* chat feature module for SPA
*/


/* global $, spa */

spa.chat = (function () {
//------------------------ BEGIN MODULE SCOPE VARIABLES -------------------------
var 
    configMap = {
        main_html : String()
            + '<div style="padding: 1em; color: #fff;">'
                + 'Say hello to chat'
            + '</div>',
        settable_map : {}
    },
    stateMap    = { $container : null },
    jqueryMap   = {},
    setJqueryMap, configModule, initModule;
//------------------------ BEGIN MODULE SCOPE VARIABLES -------------------------
//------------------------ BEGIN UTILITY METHODS -------------------------
//------------------------ END UTILITY METHODS -------------------------
//------------------------ BEGIN DOM METHODS -------------------------
// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = { $container : $container};
};
//------------------------ END DOM METHODS -------------------------
//------------------------ BEGIN EVENT HANDLERS -------------------------
//------------------------ END EVENT HANDLERS -------------------------


}());