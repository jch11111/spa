/*
* spa.shell.js
* Shell module for SP
*/

spa.shell = (function () {
    //----------------------- BEGIN MODULE SCOPE VARIABLES -----------------------

var
    configMap = {
        anchor_schema_map: {
            chat: { open: true, closed: true }
        },
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
        + '<div class="spa-shell-modal"></div>',
        chat_extend_height: 200,
        chat_extend_time: 250,
        chat_retract_height: 15,
        chat_retract_time: 300,
        chat_extended_title: 'Click to retract',
        chat_retracted_title: 'Click to extend'
    },
    stateMap = { 
        $container          : null,
        anchor_map          : {},
        is_chat_retracted   : true
    },
    jqueryMap = {},
    copyAnchorMap, setJqueryMap, toggleChat, 
    changeAnchorPart, onHashchange,
    onClickChat, initModule;
    //----------------------- END MODULE SCOPE VARIABLES -----------------------

    //----------------------- BEGIN UTILITY METHODS -----------------------
    // Returns a copy of stored anchor map; minimized overhead
    copyAnchorMap = function () {
        return $.extend( true, {}, stateMap.anchor_map );
    }
    //----------------------- END UTILITY METHODS  ------------------------

    //----------------------- BEGIN DOM METHODS -----------------------
    // Begin DIM method /changeAnchorPart/
    // Purpose: Change parts of the URI anchor component
    // Arguments:
    //  * arg_map - The map describing what part of the URI anchor
    //    we want changed
    // Returns  : boolean
    //  * true - the Anchor portion of the URI was updated
    //  * false - the Anchor portion of the URI could not be updated
    // Action : 
    //  The current anchor rep stored in stateMap.anchor_map.
    //  See uriAnchor for a discussion of encoding.
    //  This method
    //      * Creates a copy of this map using copyAnchorMap().
    //      * Modifies the key values using arg_map.
    //      * Manages the distinction between independent
    //          and dependent values in the encoding.
    //      * Attempts to change the URI using uriAnchor.
    //      * Returns true on success and false on failure.
    //

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
    // State        : sets stateMap.is_chat_retracted
    //      * true          - slider is retracte
    //      * false         - slider is extended
    toggleChat = function ( do_extend, callback ) {
        var
            px_chat_ht  = jqueryMap.$chat.height(),
            is_open     = px_chat_ht === configMap.chat_extend_height,
            is_closed   = px_chat_ht === configMap.chat_retract_height,
            is_sliding  = ! is_open && ! is_closed;
        
        // avoid race conditions
        if ( is_sliding ) { return false; }

        // Begin extend chat slider
        if ( do_extend ) {
            jqueryMap.$chat.animate (
                { height: configMap.chat_extend_height },
                configMap.chat_extend_time,
                function () { 
                    jqueryMap.$chat.attr(
                        'title', configMap.chat_retracted_title
                    );
                    stateMap.is_chat_retracted = false;
                    if ( callback ) { callback (jqueryMap.$chat); }
                }
            );
            return true;
        }
        // End extend chat slider

        // Begin retract chat slider
        jqueryMap.$chat.animate(
            { height: configMap.chat_retract_height },
            configMap.chat_retract_time,
            function () {
                stateMap.is_chat_retracted = true;
                if (callback) { callback(jqueryMap.$chat); }
            }
        );

        return true;
        // End retract chat slider
    };
    // End DOM method /toggleChat/

    //----------------------- END DOM METHODS  -----------------------

    //----------------------- BEGIN EVENT HANDLERS -----------------------
    onClickChat = function ( event ) {
        if ( toggleChat ( stateMap.is_chat_retracted ) ) {
            $.uriAnchor.setAnchor( {
                chat: ( stateMap.is_chat_retracted ? 'open' : 'closed' )
            } );
        }
        
        return false;
    }
    //----------------------- END EVENT HANDLERS -----------------------

    //----------------------- BEGIN PUBLIC METHODS -----------------------
    // Begin public method /initModule/
    initModule = function ($container) {
        // load HTML and map jQuery collections
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();

        // initialize chat slider and bind click handler
        stateMap.is_chat_retracted = true;
        jqueryMap.$chat
            .attr( 'title', configMap.chat_retracted_title )
            .click( onClickChat );

        // test toggle
        setTimeout(function () { toggleChat(true);  }, 3000);
        setTimeout(function () { toggleChat(false); }, 8000);
    };
    // End public method /initModule/
    return { initModule: initModule };

    //----------------------- END PUBLIC METHODS  -----------------------

    //----------------------- BEGIN UTILITY METHODS -----------------------
    //----------------------- END UTILITY METHODS  -----------------------


}());
