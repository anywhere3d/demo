//  cache.js

    if ( !!window.caches ) {

    //  Cache css.

        var cssCache = "css";
        caches.open( cssCache ).then( function( cache ){

            var cacheName = cssCache;

            var requests = [
                cssFolder + "bootstrap.min.css",
                cssFolder + "bootbox-dialoges.css",
                cssFolder + "side-panels.css",
                cssFolder + "messg.css",
                cssFolder + "spectrum.css",
                cssFolder + "colorpicker.css",
                cssFolder + "spinner.css",
                cssFolder + "jquery-ui.css",
                cssFolder + "alerts.css",
                cssFolder + "panel-ui.css",
                cssFolder + "anywhere3d.css",
                cssFolder + "joystick.css",
                cssFolder + "jquery.Jcrop.css",
                cssFolder + "menu-menubar.css",
            ];

            var options = {
                ignoreSearch:true,
                ignoreMethod:true,
                ignoreVary:true,
            };

            caching( cache, requests, options, cacheName )
            .then( function( results ){
                debugMode && console.log( "%s-cache:%o", cacheName, results );
            });

        });

    //  Cache js.

        var javascriptsCache = "javascripts";
        caches.open( javascriptsCache ).then( function( cache ){

            var cacheName = javascriptsCache;

            var requests = [
                jsFolder + "jquery.min.js",
                jsFolder + "jquery-ui.js",
                jsFolder + "jquery.lazy.js",
                jsFolder + "jquery.lazy.plugins.js",
                jsFolder + "jquery.Jcrop.js",
                jsFolder + "w3.js",
            ];

            var options = {
                ignoreSearch:true,
                ignoreMethod:true,
                ignoreVary:true,
            };

            caching( cache, requests, options, cacheName )
            .then( function( results ){
                debugMode && console.log( "%s-cache:%o", cacheName, results );
            });

        });

    }

/*
    //  Cache components.

        var componentsCache = "components";
        caches.open( componentsCache ).then( function( cache ){

            var cacheName = componentsCache;

            var requests = [];

            var options = {
                ignoreSearch:true,
                ignoreMethod:true,
                ignoreVary:true,
            };

            caching( cache, requests, options, cacheName )
            .then( function( results ){
                debugMode && console.log( "%s-cache:%o", cacheName, results );
            });

        });
*/

//  caching.js (v1.1)

    function caching( cache, requests, options, cacheName ){

        var Deferreds = [];

        requests.forEach( function( request, i ){
            Deferreds.push( 
                cache.match( request, options ).then( function( response ){
                    if ( !response ) return request;
                })
            );
        });

    //  debugMode && console.log( "Deferreds:", Deferreds );
        return Promise.all( Deferreds ).then(function( results ){
            return results.filter(Boolean);

        }).then( function( toCache ){
            debugMode && !!toCache.length && console.log( "Fetching %s...", cacheName );

            return cache.addAll( toCache )
            .catch( function(err){
                console.error(err);
            }).then(function(){;
                return toCache;
            });

        }).then( function( toCache ){

            debugMode && toCache.forEach(function( request, i ){
                var url = window.location.origin + request;
                debugMode && console.log( "%s-request: %s", cacheName, url );
            });

            return cache.keys().then( function( results ){
                debugMode && results.forEach(function( item, i ){
                //  debugMode && console.log( "%i. %s-cache: %s", i, cacheName, item.url );
                });
                return results;
            });

        }).catch( function(err){
            console.error(err);
        });

    }
