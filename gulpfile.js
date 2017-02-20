"use strict";

console.time('Loading plugins');

var gulp = require('gulp');

var compass = require('gulp-compass');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var open = require('gulp-open');

console.timeEnd('Loading plugins');

var packageJSON  = require('./package');
var jshintConfig = packageJSON.jshintConfig;

var map = require('map-stream');
var  customReporter = map(function (file, cb) {
    if (!file.jshint.success) {
        console.log('Teste erro hook');
        process.exit(1);
    }
    cb(null, file);
});

var filesJS = [
    'media/js/app.js',
    'abstract/service.abstract.js',
    'api.constant.js',
    'media/js/routes.js',
    'media/js/angular-locale_pt-br.js',
    'directives/**/*.js',
    'modules/**/*.js',
    'services/**/*.js',
    'filters/**/*.js',
    '!media/js/app.min.js',
    '!gulpfile.js',
    '!media/vendor/**/*.js',
    '!src/**/*.js',
    '!node_modules/**/*.js'
];

var jslint = require('gulp-jslint');
var jslintConfig = packageJSON.jslintConfig;

gulp.task('lint', function () {
    return gulp.src(['services/**/*.js'])
        .pipe(jslint(jslintConfig))
        .on('error', function (error) {
            console.error(String(error));
        });
});

gulp.task('validate-concat-js', function () {
    var concat    = require('gulp-concat');
    var jshint = require('gulp-jshint');

    return gulp.src(filesJS)
        .pipe(jshint(jshintConfig))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(customReporter)
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('media/js/'))
        .on('error', function (error) {
            console.error(String(error));
        });
});

gulp.task('concat-js', ['delete-app-min'], function () {
    var concat  = require('gulp-concat');

    return gulp.src(filesJS)
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('media/js/'))
        .on('error', function (error) {
            console.error(String(error));
        });
});

gulp.task('validate-concat-minify-js', function () {
    console.log("Validate and compile JS");
    var concat    = require('gulp-concat');
    var uglify = require("gulp-uglify");
    var jshint = require('gulp-jshint');

    return gulp.src(filesJS)
        .pipe(jshint(jshintConfig))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(customReporter)
        .pipe(concat('app.min.js'))
        .pipe(uglify({preserveComments: false}))
        .pipe(gulp.dest('media/js/'))
        .on('error', function (error) {
            console.error(String(error));
        });
});

gulp.task('webserver', function() {
    return connect.server({
        port: 8100,
        livereload: true
    });
});

gulp.task('delete-app-min', function () {
    var clean = require('gulp-clean');

    return gulp.src('media/js/app.min.js')
        .pipe(clean({force: true}));
});

gulp.task('html', function () {
    gulp.src('./**/*.html')
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src('./**/*.html')
        .pipe(connect.reload());
});

gulp.task('open-browser', function(){
    var options = {
        uri: 'http://localhost:8100',
        app: 'chrome'
    };
    gulp.src(__filename)
        .pipe(open(options));
});

gulp.task('watch-js', function () {
    gulp.watch('./**/*.html', ['html']);
    gulp.watch('./**/*.css', ['css']);
    gulp.watch(filesJS, ['delete-app-min', 'concat-js']);
});

gulp.task('watch', ['delete-app-min', 'concat-js', 'watch-js', 'webserver', 'open-browser']);

gulp.task('dist', function (callback) {
    var runSequence = require('run-sequence');

    runSequence('delete-app-min', 'validate-concat-minify-js', callback);
});



