var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('jshint', function() {
    gulp.src('./build/js/index.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('style', function() {
    gulp.src('./build/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('src/css'))
        .pipe(notify({ message: 'Style complete' }));
});

gulp.task('script', function() {
    gulp.src(['./build/js/regular.min.js','./build/js/index.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('index.js'))
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('src/js'))
        .pipe(notify({ message: 'Script complete' }));
});

gulp.task('default', function() {
    gulp.start('style', 'script');
});

gulp.task('watch', function() {
  gulp.watch('./build/scss/*.scss', ['style']);
  gulp.watch('./build/js/*.js', ['script']);
});