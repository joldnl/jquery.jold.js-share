// -------------------------------------
//   Gulpfile
// -------------------------------------
// Available tasks:
//   `gulp`
//   `gulp build`
// -------------------------------------


var gulp            = require('gulp'),
    concat          = require('gulp-concat'),
    plumber         = require('gulp-plumber'),
    rename          = require('gulp-rename'),
    minifyjs        = require('gulp-uglify');


var options = {

    // ----- Manifest details ----- //
    metadata : {
        appName         : "jquery.jold.js-share",
        appDescription  : "A jQuery plugin for easy and quick opening share windows for share buttons.",
        developerName   : "JOLD Interactive; Jurgen Oldenburg",
        developerURL    : "https://www.jold.nl",
        background      : "#FFFFFF",
        url             : "https://github.com/joldnl/jquery.jold.js-share",
    },


    // ----- Default task options ----- //
    default : {
        tasks : [ 'build' ]
    },


    // ----- Build task options ----- //
    build : {
        tasks       : [ 'process:js' ],
        destination : {
            js  : './',
        }
    },


    // ----- JavaScript task options ----- //
    js : {
        files       : './jquery.jold.js-share.js',
        file        : './jquery.jold.js-share.js',
        destination : './',
        includes    : [
            './jquery.jold.js-share.js',
        ],
    },

    // ----- Watch task options ----- //
    watch : {

        files : function() {
            return [
                options.js.files,
            ]
        },

        run : function() {
            return [
                [ 'process:js' ],
            ]
        }

    }

};



// -------------------------------------
//   Task: Default
// -------------------------------------

gulp.task( 'default', function() {

    options.build.tasks.forEach( function( task ) {
        gulp.parallel([task]);
        // gulp.series( [task] );
    });

});




// -------------------------------------
//   Task: Build
// -------------------------------------

gulp.task( 'build', function() {

    options.build.tasks.forEach( function( task ) {
        gulp.series( [task] )();
    });

});




// -------------------------------------
//   Task: Process Javascript
// -------------------------------------

gulp.task( 'process:js', function () {

    return gulp.src( options.js.includes )
        .pipe( plumber() )                                      // Prevent pipe breaking from errors
        .pipe( concat( 'jquery.jold.js-share.js' ) )            // Concatinate all javascript files into one file
        .pipe( minifyjs() )                                     // Minify and clean up javascript files
        .pipe( rename( { suffix: '.min' } ) )                   // Add .min prefix to filename
        .pipe( gulp.dest( options.build.destination.js ) );     // Write files to dist folder

});



// -------------------------------------
//   Task: Watch changes in source fils
// -------------------------------------

gulp.task( 'watch', function() {

    var watchFiles = options.watch.files();

    watchFiles.forEach( function( files, index ) {
        gulp.watch( files, options.watch.run()[ index ]  );
    });

});
