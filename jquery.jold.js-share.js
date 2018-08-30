/*!
 * JOLD jQuery js-share 1.0.0
 *
 * Copyright (c) 2018 JOLD Interactive; Jurgen Oldenburg <info@jold.nl>
 *
 * A jQuery plugin for easy and quick opening share windows for share buttons.
 * See README.md for usage
 *
 * Licences: BSD-3-Clause
 * https://opensource.org/licenses/BSD-3-Clause
 */
(function($){

    var JoldJsShare = function( element, options ) {

        var obj         = this;
        var $element    = $(element);

        /**
         * Pick up the options passed to the plugin
         */
        var settings = $.extend({
            param: 'defaultValue'
        }, options || {});


        $element.on('click', function(){

            // var network     = $(this).data('share-network');
            // var url         = $(this).attr('href');
            // var winId       = 'shareWindow' + network;
            // var winHeight   = 450;
            // var winWidth    = 550;
            // var winTop      = ( $(window).height() / 2 - (winHeight / 2 + 50) );
            // var winLeft     = ( $(window).width() / 2 - (winWidth / 2) );
            // var toolbar     = 0;
            // var location    = 0;
            // var menubar     = 0;
            // var directories = 0;
            // var scrollbars  = 0;

            e.preventDefault();
            var href    = $(this).attr('href');
            var network = $(this).data('share-network');

            var networks = {
                facebook   : { width : 600, height : 300 },
                twitter    : { width : 600, height : 254 },
                instagram  : { width : 600, height : 254 },
                gplus      : { width : 515, height : 490 },
                linkedin   : { width : 600, height : 473 }
            };

            var popup = function( network ){
                var options = 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,';
                window.open(href, '', options+'height='+networks[network].height+',width='+networks[network].width);
            }

            popup( network );

            return false;

        });

    };


    $.fn.joldJsShare = function( options ) {

        var element = $(this);

        // Return early if this element already has a plugin instance
        if (element.data('joldJsShare')) return element.data('joldJsShare');

        // pass options to plugin constructor
        var joldJsShare = new JoldJsShare( this, options );

        // Store plugin object in this element's data
        element.data('joldJsShare', joldJsShare);

        return joldJsShare;

    };

})(jQuery);
