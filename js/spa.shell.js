/*
* spa.shell.js
* Shell module for SP
*/

//----------------------- BEGIN MODULE SCOPE VARIABLES -----------------------
spa.shell = (function () {
var
    configMap = {
        main_html: String()
            + '<div class="spa-shell-head">'
            + '<div class="spa-shell-head-logo"></div>'
            + '<div class="spa-shell-head-acct"></div>'
            + '<div class="spa-shell-head-search"></div>'
        + '</div>'
        + '<div class="spa-shell-main">'
            + '<div class="spa-shell-main-nav"></div>'
            + '<div class="spa-shell-main-content"></div>'
        + '</div>'
        + '<div class="spa-shell-foot"></div>'
        + '<div class="spa-shell-chat"></div>'
        + '<div class="spa-shell-modal"></div>'
    },
    stateMap = { $container: null },
    jqueryMap = {},
    setJqueryMap, initModule;
    //----------------------- END MODULE SCOPE VARIABLES -----------------------

    //----------------------- BEGIN UTILITY METHODS -----------------------
    //----------------------- END UTILITY METHODS  -----------------------g

    //----------------------- BEGIN DOM METHODS -----------------------
    // Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container,
            $chat: $container.find( '.spa-shell-chat')
        };
    };
    // End DOM method /setJqueryMap/

    // Begin DOM Method toggleChat/
    // Purpose : Extends or retracts chat slider
    // Arguments    :
    //      * do_extend     - if true, extends slider; if false retracts
    //      * callback      - optional function to execute at end of animation
    // Settings     : 
    //      * chat_extend_time, chat_retract_time
    //      * chat_extend_height, chat_retract_height
    // Returns      : Boolean
    //      * true          - slider animation activated
    //      * false         - slider animation not activated
    toggleChat = function ( do_extend, callback ) {
        var
            px_chat_ht  = jqueryMap.$chat.height(),
            is_open     = px_chat_ht === configMap.chat_extend_height,
            is_closed   = px_chat_ht === configMap.chat_retract_height,
            is_sliding  = ! is_open && ! is_closed;
        
        // avoid race conditions
        if ( is_sliding ) { return false; }

        // Begin extend chat slider
        if ( do_extend )  ..........CONTINUE HERE CONTINUER ICI
            

    };





    //----------------------- END DOM METHODS  -----------------------

    //----------------------- BEGIN EVENT HANDLERS -----------------------
    //----------------------- END EVENT HANDLERS -----------------------

    //----------------------- BEGIN PUBLIC METHODS -----------------------
    // Begin public method /initModule/
    initModule = function ($container) {
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();
    };
    // End public method /initModule/
    return { initModule: initModule };

    //----------------------- END PUBLIC METHODS  -----------------------

    //----------------------- BEGIN UTILITY METHODS -----------------------
    //----------------------- END UTILITY METHODS  -----------------------


}());
