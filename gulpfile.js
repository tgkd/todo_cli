const gulp = require('gulp');
const plumber = require('gulp-plumber');
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const options = require('./build/webpack.config.js');

gulp.task('default', ['dist'], () => {
});

gulp.task('dist', ['stylus', 'assets', 'fonts'], () => {
  console.log('success build');
});

gulp.task('dev', ['html', 'js', 'dist'], () => {
  console.log('success dev task');
});

gulp.task('html', () => {
  return gulp.src(['./src/html/*.html'])
    .pipe(gulp.dest('./public'));
});

gulp.task('stylus', () => {
  return gulp.src(['./src/stylus/main.styl'])
    .pipe(plumber())
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('assets', () => {
  return gulp.src(['./src/assets/**/*'])
    .pipe(gulp.dest('./public/assets'));
});

gulp.task('fonts', () => {
  return gulp.src(['./src/stylus/fonts/*'])
    .pipe(gulp.dest('./public/css/fonts'));
});

gulp.task('js', (callback) => {
  return gulp.src('')
    .pipe(plumber())
    .pipe(webpackStream(options, webpack))
    .pipe(gulp.dest('./public'))
    .on('data', () => {
      if (!callback.called) {
        callback.called = true;
        callback();
      }
    });
});

gulp.task('watch', () => {
  gulp.watch('./src/stylus/**/*.styl', ['stylus']);
});