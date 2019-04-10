import { task, dest, watch, src } from 'gulp';
import { log } from 'gulp-util';
import { onError } from 'gulp-notify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import uglifycss from 'gulp-uglifycss';
import sass, { logError } from 'gulp-sass';
var browserSync = require('browser-sync').create();

var ENTRY_FILE = './src/script.js';
var OUTPUT_DIR = './js';
var OUTPUT_FILE = 'script.min.js';
var DELAY = 50;

task('browserify', function () {
    var b = browserify({ entries: [ ENTRY_FILE ] }).transform(babelify);

    function bundle() {
        b.bundle()
            .on('log', log)
            .on('error', onError())
            .pipe(source(OUTPUT_FILE))
            .pipe(buffer())
            .pipe(dest(OUTPUT_DIR))
            .pipe(browserSync.reload({ stream: true }));
    }

    watchify(b, { delay: DELAY }).on('update', bundle);
    bundle();
});

task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    watch('./sass/*.scss', ['scss']);
    watch(['./*.html', './css/*.css', './js/*.js']).on('change', browserSync.reload);

});

task('scss', function () {
    return src('./sass/*.scss')
        .pipe(sass().on('error', logError))
        .pipe(uglifycss())
        .pipe(dest('./css/'));
});

task('copy', function() {
	src('./images/*.*').pipe(dest('./css/images'));
	src('./fonts/*.*').pipe(dest('./fonts'));
	});

task('default', ['browserify', 'serve', 'copy']);