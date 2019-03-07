'use strict';

const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const posthtml = require('gulp-posthtml');
const htmlmin = require('gulp-htmlmin');
const include = require('posthtml-include');
const del = require('del');
// const rename = require('gulp-rename');
// const sass = require('gulp-sass');
// const plumber = require('gulp-plumber');
// const postcss = require('gulp-postcss');
// const autoprefixer = require('autoprefixer');
// const csso = require('gulp-csso');
// const imagemin = require('gulp-imagemin');
// const uglify = require('gulp-uglify');
// const cssDeclarationSorter = require('css-declaration-sorter');
// const postcssScss = require('postcss-scss');

const buldPath = 'build/';

function clean() {
  return del(buldPath);
}

function html() {
  return gulp
    .src(['src/html/**/*.html', '!src/html/components/*'])
    .pipe(posthtml([include({ root: './src/html/components' })]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(buldPath));
}

function reload() {
  browsersync.reload();
}

function server() {
  browsersync.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('src/html/**/*.html', gulp.series(html, reload));
}

exports.build = gulp.series(clean, gulp.parallel(html));
exports.live = gulp.series(exports.build, server);
exports.clean = gulp.series(clean);


// function css() {
//   let postcssPlugins = [autoprefixer()];
//   return src("src/scss/style.scss")
//     .pipe(plumber())
//     .pipe(sass())
//     .pipe(postcss(postcssPlugins))
//     .pipe(csso())
//     .pipe(
//       rename({
//         suffix: ".min"
//       })
//     )
//     .pipe(dest("build/css"))
//     .pipe(browsersync.stream());
// }

// function sortScss() {
//   let postcssPlugins = [cssDeclarationSorter({ order: "smacss" })];
//   return src("src/scss/block/*.scss")
//     .pipe(postcss(postcssPlugins, { parser: postcssScss }))
//     .pipe(dest("src/scss/block/"));
// }

// function js() {
//   return src("src/js/**/*.js")
//     .pipe(plumber())
//     .pipe(uglify())
//     .pipe(
//       rename({
//         suffix: ".min"
//       })
//     )
//     .pipe(dest("build/js/"));
// }

// function font() {
//   return src("src/font/**/*.{woff,woff2}").pipe(dest("build/fonts/"));
// }

// function webp() {
//   return src("src/img/webp/**/*.webp").pipe(dest("build/img/webp"));
// }

// function img() {
//   return src(["src/img/**/*.{png,jpg,svg}"])
//     .pipe(
//       imagemin([
//         imagemin.gifsicle({ interlaced: true }),
//         imagemin.jpegtran({ progressive: true }),
//         imagemin.optipng({ optimizationLevel: 3 }),
//         imagemin.svgo({})
//       ])
//     )
//     .pipe(dest("build/img"));
// }

// function favicon() {
//   return src("src/img/**/favicon.png")
//     .pipe(imagemin([imagemin.optipng({ optimizationLevel: 3 })]))
//     .pipe(dest("build/"));
// }
