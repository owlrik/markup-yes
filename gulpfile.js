const gulp = require('gulp');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const gulpIf = require('gulp-if');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const rename = require('gulp-rename');
const del = require('del');
const ghpages = require('gh-pages');
const server = require('browser-sync').create();
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const {paths} = require('./settings');

const cleanBuildDir = () => {
  return del(paths.dest.root);
};

const refresh = (done) => {
  server.reload();
  done();
};

const buildPages = () => {
  return gulp.src([`${paths.src.pages}*.html`])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(paths.dest.root));
};

const buildStyles = () => {
  return gulp.src(`${paths.src.styles}style.scss`, {sourcemaps: true})
    .pipe(plumber())
    .pipe(sass({
      includePaths: ['node_modules']
    }))
    .pipe(postcss([
      autoprefixer({
        grid: 'no-autoplace'
      })
    ]))
    .pipe(gulp.dest(paths.dest.styles))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(gulpIf(isDev, gulp.dest(paths.dest.styles, {sourcemaps: '.'}), gulp.dest(paths.dest.styles)))
    .pipe(gulpIf(isDev, server.stream()));
};

const buildScripts = () => {
  return gulp.src(`${paths.src.scripts}main.js`)
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(paths.dest.scripts));
};

const optimizeSvg = () => {
  return gulp.src(`${paths.src.images.all}**/*.{svg}`)
    .pipe(changed(paths.src.images.all))
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(gulp.dest(paths.src.images.all));
}

const buildSvgSprite = () => {
  return gulp.src(`${paths.src.images.spriteSvg}*.svg`)
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(paths.dest.images.sprite));
};

const optimizeImages = () => {
  return gulp.src(`${paths.dest.images.all}**/*.{jpg,png}`)
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
    ]))
    .pipe(gulp.dest(paths.dest.images.all));
};

const createWebp = () => {
  return gulp.src(`${paths.src.images.all}**/*.{jpg,png}`)
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest(paths.src.images.all));
};

const copyImages = () => {
  return gulp.src([`${paths.src.images.all}**/*.{jpg,jpeg,png,webp,gif,svg}`, `!${paths.src.images.spriteSvg}*.svg`], {base: paths.src.root})
    .pipe(changed(paths.dest.images.all))
    .pipe(gulp.dest(paths.dest.root));
};

const copyFonts = () => {
  return gulp.src(`${paths.src.fonts}**/*.{woff,woff2}`)
    .pipe(changed(paths.dest.fonts))
    .pipe(gulp.dest(paths.dest.fonts));
};

const copyMisc = () => {
  return gulp.src([
    'src/favicon/**',
    'src/data/**',
    'src/file/**',
    'src/video/**',
  ], {
    base: paths.src.root,
  })
    .pipe(gulp.dest(paths.dest.root));
};

const syncServer = () => {
  server.init({
    server: paths.dest.root,
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch([`${paths.src.pages}**/*.html`], gulp.series(buildPages, refresh));
  gulp.watch([`${paths.src.styles}**/*.scss`], gulp.series(buildStyles));
  gulp.watch([`${paths.src.scripts}**/*.{js,json}`], gulp.series(buildScripts, refresh));
  gulp.watch([`${paths.src.images.all}**/*.{jpg,jpeg,png,webp,gif,svg}`, `!${paths.src.images.spriteSvg}*.svg`], gulp.series(optimizeSvg, copyImages, refresh));
  gulp.watch([`${paths.src.images.spriteSvg}*.svg`], gulp.series(optimizeSvg, buildSvgSprite, refresh));
};

const deploy = (done) => {
  ghpages.publish(`${paths.dest.root}`, done);
}

const build = gulp.series(
  cleanBuildDir,
  optimizeSvg,
  gulp.parallel(
    copyMisc,
    copyFonts,
    copyImages,
    buildSvgSprite,
    buildStyles,
    buildScripts,
    buildPages
  )
);

const start = gulp.series(build, syncServer);

exports.build = build;
exports.start = start;
exports.webp = createWebp;
exports.imagemin = optimizeImages;
exports.deploy = deploy;
