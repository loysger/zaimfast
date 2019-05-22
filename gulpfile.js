'use strict';

// Load plugins
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const del = require('del');
const browsersync = require('browser-sync').create();
const cssDeclarationSorter = require('css-declaration-sorter');
const postcssScss = require('postcss-scss');
const sourcemaps = require('gulp-sourcemaps');
const handlebars = require('gulp-hb');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './build/'
    },
    notify: false,
    ghostMode: false,
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
  return del('./build');
}

// Watch files
function watchFiles() {
  gulp.watch(
    './src/html/**/*.{html,json,hbs,js}',
    gulp.series(gulp.parallel(html, generateMfo), browserSyncReload)
  );
  gulp.watch('./src/img/**/*', gulp.series(img));
  gulp.watch('./src/scss/**/*.scss', gulp.series(css));
  gulp.watch('./src/js/**/*.js', gulp.series(js));
}

function sortScss() {
  let postcssPlugins = [cssDeclarationSorter({ order: 'smacss' })];
  return gulp
    .src('./src/scss/components/*.scss')
    .pipe(postcss(postcssPlugins, { parser: postcssScss }))
    .pipe(gulp.dest('./src/scss/components/'));
}

// Generating mfo pages
function generateMfo(done) {
  let mfoData = require('./src/html/data/mfo.json');
  for (let i in mfoData) {
    let context = mfoData[i];
    let fileName = context.title.replace(/ +/g, '-').toLowerCase();

      gulp
        .src('./src/html/partials/layouts/mfo-item.hbs')
        .pipe(
          handlebars() // {debug: true}
            .partials('./src/html/partials/components/*.hbs')
            .partials('./src/html/partials/layouts/*.hbs')
            .helpers('./src/html/helpers/*.js')
            .data('./src/html/data/**/*.{js,json}')
            .data(context)
        )
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(
          rename({
            basename: 'index',
            extname: '.html'
          })
        )
        .pipe(gulp.dest('./build/mfo/' + fileName));
  }
  done();
}

// HTML
function html() {
  return (
    gulp
      .src(['./src/html/pages/**/*.hbs'])
      .pipe(
        handlebars() // {debug: true}
          .partials('./src/html/partials/components/*.hbs')
          .partials('./src/html/partials/layouts/*.hbs')
          .helpers('./src/html/helpers/*.js')
          .data('./src/html/data/**/*.{js,json}')
      )
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(
        rename({
          extname: '.html'
        })
      )
      .pipe(gulp.dest('./build/'))
  );
}

// JS
function js() {
  return (
    gulp
      .src('./src/js/*.js')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(
        rename({
          suffix: '.min'
        })
      )
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('./build/js/'))
  );
}

// CSS
function css() {
  let postcssPlugins = [autoprefixer()];
  return (
    gulp
      .src('./src/scss/style.scss')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(postcssPlugins))
      .pipe(csso())
      .pipe(
        rename({
          suffix: '.min'
        })
      )
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('./build/css'))
      .pipe(browsersync.stream())
  );
}

// img
function img() {
  return gulp.src('./src/img/**/*').pipe(gulp.dest('./build/img/'));
}

// define complex tasks
const build = gulp.series(clean, gulp.parallel(img, html, generateMfo, css, js));
const watch = gulp.parallel(watchFiles, browserSync);
const live = gulp.series(build, watch);

// export tasks
exports.default = live;
exports.live = live;
exports.watch = watch;
exports.build = build;
exports.clean = clean;
exports.sortScssRules = sortScss;
