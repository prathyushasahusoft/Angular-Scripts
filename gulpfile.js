var elixir = require('laravel-elixir');
var gulp = require("gulp");
var watch = require('gulp-watch');

require('laravel-elixir-livereload');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss');
});
gulp.task('copyViews', function() {

    //gulp.src('./resources/assets/views/*.html')
    //    .pipe(gulp.dest('./public/views'));
    gulp.src('./resources/assets/views/**/*.html')
        .pipe(gulp.dest('./public/views'));

});

gulp.task('copyDirectives', function() {

    gulp.src('./resources/assets/js/directives/**/*.*')
        .pipe(gulp.dest('./public/js/directives'));

});

elixir(function(mix) {
    mix.less('app.less');
    mix.copy('resources/assets/images', 'public/images');

    mix.copy('bower_components/bootstrap/dist/fonts', 'public/fonts');
   	mix.copy('bower_components/fontawesome/fonts', 'public/fonts');

    mix.task('copyViews', './resources/assets/views/**/*.*', './');
    mix.task('copyDirectives', './resources/assets/js/directives/**/*.*', './');

   	mix.styles([
        'bower_components/fontawesome/css/font-awesome.css',
        'bower_components/metisMenu/dist/metisMenu.css',
        'bower_components/ngDialog/css/ngDialog.css',
        'bower_components/ngDialog/css/ngDialog-theme-default.css',
    ], 'public/css/styles.css', './');

    mix.scripts([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/metisMenu/dist/metisMenu.js',
        'bower_components/bootstrap-validator/dist/validator.js',
        'resources/js/sb-admin-2.js',
        'resources/js/app.js',
        'resources/js/ie-emulation-modes-warning.js'
    ], 'public/js/app.js', './');

    mix.scripts([
        'bower_components/angular/angular.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-touch/angular-touch.js',
        'bower_components/angular-route/angular-route.js',
    ], 'public/js/angular-bundle.js', './');

    mix.scripts([
        'resources/assets/dashboard.js'
    ], 'public/js/dashboard.js', './');

    mix.scripts([
        'resources/assets/js/controllers/*.js'
    ], 'public/js/controllers.js', './');

    mix.scripts([
        'resources/assets/js/services/*.js'
    ], 'public/js/services.js', './');

    mix.scripts([
        'resources/assets/js/directives/*.js'
    ], 'public/js/directives.js', './');

    mix.scripts([
        'bower_components/ngDialog/js/ngDialog.js'
    ], 'public/js/ngDialog.js', './');


    mix.livereload();
});