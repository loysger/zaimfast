'use strict';

// Load plugins
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const posthtml = require('gulp-posthtml');
const htmlmin = require('gulp-htmlmin');
const include = require('posthtml-include');
const autoprefixer = require('autoprefixer');
const del = require('del');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const browsersync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const cssDeclarationSorter = require('css-declaration-sorter');
const postcssScss = require('postcss-scss');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './build/'
    },
    notify: false,
    open: true,
    cors: true,
    ui: false,
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean assets
function clean() {
  return del(['./build/']);
}

// Watch files
function watchFiles() {
  gulp.watch('./src/html/**/*.html', gulp.series(html, browserSyncReload));
  gulp.watch('./src/scss/**/*.scss', gulp.series(css));
  gulp.watch('./src/js/**/*.js', gulp.series(js));
}

// HTML
function html() {
  return gulp.src('./src/html/*.html').pipe(gulp.dest('./build/'));
}

// JS
function js() {
  return gulp.src('./src/js/*.js').pipe(gulp.dest('./build/js/'));
}

// CSS
function css() {
  let postcssPlugins = [autoprefixer()];
  return gulp
    .src('./src/scss/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss(postcssPlugins))
    .pipe(csso())
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest('./build/css'))
    .pipe(browsersync.stream());
}

// define complex tasks
const build = gulp.series(clean, html, css, js);
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;
