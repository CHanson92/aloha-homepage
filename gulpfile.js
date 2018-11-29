var gulp = require("gulp");
var gutil = require("gulp-util");
var notify = require("gulp-notify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var browserify = require("browserify");
var watchify = require("watchify");
var babelify = require("babelify");
var concat = require("gulp-concat");
var uglifycss = require("gulp-uglifycss");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();

var ENTRY_FILE = "./js/src/script.js";
var OUTPUT_DIR = "./js";
var OUTPUT_FILE = "script.js";
var DELAY = 50;

gulp.task("browserify", function () {
    var b = browserify({ entries: [ ENTRY_FILE ] }).transform(babelify);

    function bundle() {
        b.bundle()
            .on("log", gutil.log)
            .on("error", notify.onError())
            .pipe(source(OUTPUT_FILE))
            .pipe(buffer())
            .pipe(gulp.dest(OUTPUT_DIR))
            .pipe(browserSync.reload({ stream: true }));
    }

    watchify(b, { delay: DELAY }).on("update", bundle);
    bundle();
});

gulp.task("serve", function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./sass/*.scss', ['scss']);
    gulp.watch(['./*.html', './css/*.css', './js/*.js']).on('change', browserSync.reload);

});

gulp.task('scss', function () {
    return gulp.src('./sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(uglifycss())
        .pipe(gulp.dest('./css/'));
});

gulp.task("copy", function() {
	gulp.src("./images/*.*").pipe(gulp.dest("./css/images"));
	gulp.src("./fonts/*.*").pipe(gulp.dest("./fonts"));
	});

	gulp.task("default", ["browserify", "serve", "copy"]);