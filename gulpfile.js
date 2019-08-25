'use strict';

// Load plugins
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const del = require('del');
const browsersync = require('browser-sync').create();
const cssDeclarationSorter = require('css-declaration-sorter');
const postcssScss = require('postcss-scss');
const sourcemaps = require('gulp-sourcemaps');
const handlebars = require('gulp-hb');
const csso = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');
const postcssPresetEnv = require('postcss-preset-env');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

class Mode {
  constructor() {
    this.isProduction = false;

    this._opt = {
      dev: {
        name: 'development',
        folder: './build'
      },
      prod: {
        name: 'production',
        folder: './production'
      }
    };

    this._mode = this._opt.dev;
  }

  get destination() {
    return this._mode.folder;
  }

  production() {
    this._mode = this._opt.prod;
    this.isProduction = true;
  }
}

const mode = new Mode();

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: mode.destination
    },
    notify: false,
    ghostMode: false,
    open: false,
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
function clean(cb) {
  del(mode.destination);
  setTimeout(() => {
    return cb();
  }, 1000);
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
      .pipe(htmlmin({ collapseWhitespace: mode.isProduction }))
      .pipe(
        rename({
          basename: 'index',
          extname: '.html'
        })
      )
      .pipe(gulp.dest(`${mode.destination}/mfo/${fileName}`));
  }
  done();
}

// HTML
function html() {
  return gulp
    .src(['./src/html/pages/**/*.hbs'])
    .pipe(
      handlebars() // {debug: true}
        .partials('./src/html/partials/components/*.hbs')
        .partials('./src/html/partials/layouts/*.hbs')
        .helpers('./src/html/helpers/*.js')
        .data('./src/html/data/**/*.{js,json}')
    )
    .pipe(htmlmin({ collapseWhitespace: mode.isProduction }))
    .pipe(
      rename({
        extname: '.html'
      })
    )
    .pipe(gulp.dest(mode.destination));
}

// JS
function js() {
  return gulp
    .src('./src/js/main.js')
    .pipe(
      webpackStream(
        require(`${
          mode.isProduction
            ? './webpack.config.production.js'
            : './webpack.config.js'
        }`),
        webpack
      )
    )
    .pipe(gulp.dest(`${mode.destination}/js/`));
}

// CSS
function css() {
  let postcssPlugins = [postcssPresetEnv(), autoprefixer()];

  if (mode.isProduction) {
    return gulp
      .src('./src/scss/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(postcssPlugins))
      .pipe(csso())
      .pipe(
        rename({
          suffix: '.min'
        })
      )
      .pipe(gulp.dest(`${mode.destination}/css`))
      .pipe(browsersync.stream());
  }

  return gulp
    .src('./src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(`${mode.destination}/css`))
    .pipe(browsersync.stream());
}

// img
function img() {
  return gulp.src('./src/img/**/*').pipe(gulp.dest(`${mode.destination}/img/`));
}

// define complex tasks
const build = gulp.series(
  clean,
  gulp.parallel(img, html, generateMfo, css, js)
);
const watch = gulp.parallel(watchFiles, browserSync);

async function prod() {
  mode.production();
  build();
}
const serve = gulp.series(build, watch);

// export tasks
exports.default = serve;
exports.serve = serve;

exports.build = build;
exports.prod = prod;

exports.sort = sortScss;
