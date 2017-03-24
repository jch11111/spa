//NOT SURE WHERE THIS GOES
// Begin callback method /setChatAnchor/
// Example      :   setChatAnchor('closed');
// Purpose      :   Change the chat component of the anchor
// Arguments:
//      * position_type - may be 'closed' or 'open'
// Action       :
//      Changes the URI anchor parameter 'chat' to the requested value if possible.
// Returns      :
//      * true - requested anchor part was updated
//      * false - requested anchor part was not updated
// Throws       : none
//

/*
* spa.shell.js
* Shell module for SP
*/

spa.shell = (function () {
    //----------------------- BEGIN MODULE SCOPE VARIABLES -----------------------

var
    configMap = {
        anchor_schema_map: {
            chat: { opened: true, closed: true }
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
        + '<div class="spa-shell-modal"></div>',
        chat_extend_height: 200,
        chat_extend_time: 250,
        chat_retract_height: 15,
        chat_retract_time: 300,
        chat_extended_title: 'Click to retract',
        chat_retracted_title: 'Click to extend'
    },
    stateMap = { 
        anchor_map          : {},
    },
    jqueryMap = {},
    copyAnchorMap, setJqueryMap, 
    changeAnchorPart, onHashchange,
    setChatAnchor, onClickChat, initModule;
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
    changeAnchorPart = function ( arg_map ) {
        var
            anchor_map_revise = copyAnchorMap(),
            bool_return = true,
            key_name, key_name_dep;

        // Begin merge changes into achor_map
        KEYVAL:
        for ( key_name in arg_map ) {
            if ( arg_map.hasOwnProperty( key_name )) {

                // skip dependent keys during iteration
                if ( key_name.indexOf ('_') === 0 ) { continue KEYVAL; }

                // update independent key value
                anchor_map_revise[key_name] = arg_map[ key_name];

                //update matching dependent key
                key_name_dep = '_' + key_name;
                if ( arg_map[key_name_dep] ) {
                    anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
                }
                else {
                    delete anchor_map_revise[key_name_dep];
                    delete anchor_map_revise['_s' + key_name_dep];
                }
            }
        }
        // End merge changes into anchor map

        // Begin attempt to update URL; revert if not successful
        try {
            $.uriAnchor.setAnchor( anchor_map_revise );
        }
        catch ( error ) {
            // replace URI with existing state
            $.uriAnchor.setAnchor( stateMap.anchor_map, null, true );
            bool_return = false;
        }
        // End attempt to update URI
        return bool_return;
    }
    // End DOM method /changeAnchorPart

    // Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container
        };
    };
    // End DOM method /setJqueryMap/

    //----------------------- END DOM METHODS  -----------------------

    //----------------------- BEGIN EVENT HANDLERS -----------------------
    // Begin event handler /onHashChange/
    // Purpose: Handles the hashchange event
    // Arguments:
    //  * event - jQuery event object
    // Settings     : none
    // Returns      : false
    // Action       : 
    //  * Parses the URI anchor component
    //  * Compares proposed application state with current
    //  * Adjusts the application only where proposed state
    //      differs from existing and is allowed by anchor schema
    //
    onHashchange = function () {
        var
            _s_chat_previous, _s_chat_proposed, s_chat_proposed,
            anchor_map_proposed,
            is_ok = true,
            anchor_map_previous = copyAnchorMap();

        //attempt to parse anchor
        try { 
            anchor_map_proposed = $.uriAnchor.makeAnchorMap(); 
        }
        catch (error) {
            $.uriAnchor.setAnchor( anchor_map_previous, null, true );
            return false;
        }

        stateMap.anchor_map = anchor_map_proposed;

        // convenience vars
        _s_chat_previous = anchor_map_previous._s_chat;
        _s_chat_proposed = anchor_map_proposed._s_chat;

        // Begin adjust chat component if changed
        if (! anchor_map_previous || _s_chat_previous !== _s_chat_proposed) {
            s_chat_proposed = anchor_map_proposed.chat;
            switch ( s_chat_proposed ) {
                case 'opened':
                    is_ok = spa.chat.setSliderPosition( 'opened' );
                    break;
                case 'closed':
                    is_ok = spa.chat.setSliderPosition( 'closed' );
                    break;
                default:
                    toggleChat(false);
                    delete anchor_map_proposed.chat;
                    $.uriAnchor.setAnchor( anchor_map_proposed, null, true );
            }
        }
        // End adjust chat component if changed
        
        // Begin revert anchor if slider change denied
        if ( !is_ok ) {
            if ( anchor_map_previous ) {
                $uriAnchor.setAnchor( anchor_map_previous, null, true );
                stateMap.anchor_map = anchor_map_previous;
            } else {
                delete anchor_map_proposed.chat;
                $.uriAnchor.setAnchor( anchor_map_proposed, null, true );
            }
        }
        // End revert anchor if slider change denied

        return false;
    }
    // End event handler /onHashChange/

    onClickChat = function ( event ) {
        changeAnchorPart({
            chat: ( stateMap.is_chat_retracted ? 'open' : 'closed' )
        });
        
        return false;
    }
    // End  event handler /onHashChange/
    //----------------------- END EVENT HANDLERS -----------------------

    //----------------------- BEGIN EVENT HANDLERS -----------------------
    // Begin callback method /setChatAnchor/
    // Example      : setChatAnchor( 'closed' );
    // Purpose      : Change the chat component of the anchor
    // Arguments    :
    //      * position_type - may be 'closed' or 'open'
    // Action       :
    //      Changes the URI anchor parameter 'chat' to the requested value if possible
    // Returns      :
    //      * true - requested anchor part was updated
    //      * false - requested anchor part was not updated
    // Throws       : none
    setChatAnchor = function ( position_type ) {
        return changeAnchorPart({ chat : position_type });
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

        // configure uriAnchor to use our schema
        $.uriAnchor.configModule({
            schema_map : configMap.anchor_schema_map
        });

        // configure and initialize feature modules
        spa.chat.configModule( {} );
        spa.chat.initModule( jqueryMap.$chat );

        // Handle URI anchor change events
        // This is done /after/ all feature modules are configured
        // and initiated, otherwise they will not be ready to handle
        // the trigger event, which is used to ensure the anchor
        // is considered on-load
        //
        $(window)
            .bind( 'hashchange', onHashchange )
            .trigger( 'hashchange');
    };
    // End public method /initModule/
    return { initModule: initModule };

    //----------------------- END PUBLIC METHODS  -----------------------

    //----------------------- BEGIN UTILITY METHODS -----------------------
    //----------------------- END UTILITY METHODS  -----------------------


}());
