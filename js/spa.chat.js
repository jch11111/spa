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
//------------------------ BEGIN PUBLIC METHOD -------------------------
// Begin public method /configModule/
// Purpose      : Adjust configuration of allowed keyes
// Arguments    : A map of settable keys and values
//  * color name - color to use
// Settings     :
//  * configMap.settable_map declares allowed keyes
// Returns      : true
// Throws       : none
//
configModule = function ( input_map ) {
    spa.util.setConfigMap({
        input_map       : input_map,
        settable_map    : configMap.settable_map,
        config_map      : configMap 
    });
    return true;
};
// End public method /configModule/

// Begin public method /initModule/
// Purpose      : Initialize module
// Arguments    : 
//  * $container the jquery element used by this feature
// Returns      : true
// Throws       : none
initModule = function ( $container ) {
    $container.html(configMap.main_html);
    stateMap.$container = $container;
    setJqueryMap();
    return true;
};
// End public method /initModule/

// return public methods
return {
    configModule    : configModule,
    initModule      : initModule
};
//------------------------ END PUBLIC METHOD -------------------------


}());