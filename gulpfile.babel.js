import gulp from 'gulp';
import plumber from 'gulp-plumber';
import stylus from 'gulp-stylus';
import autoprefixer from 'gulp-autoprefixer';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

import options from './webpack.config.babel';

gulp.task('default', ['dist'], () => {
  console.log('default task');
});

gulp.task('dist', ['stylus', 'js', 'assets', 'fonts'], () => {
  return gulp.src(['./src/html/*.html'])
    .pipe(gulp.dest('./public'))
});

gulp.task('stylus', () => {
  return gulp.src(['./src/stylus/main.styl'])
    .pipe(plumber())
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css'))
});

gulp.task('assets', () => {
  return gulp.src(['./src/assets/**/*'])
    .pipe(gulp.dest('./public/assets'))
});

gulp.task('fonts', () => {
  return gulp.src(['./src/stylus/fonts/*'])
    .pipe(gulp.dest('./public/css/fonts'))
});

/*
* Finished 'js' after 33 s
 'js' errored after 33 s
 Error: task completion callback called too many times*/
gulp.task('js', (callback) => {
  return gulp.src('')
    .pipe(plumber())
    .pipe(webpackStream(options, webpack))
    .pipe(gulp.dest('./public/js'))
    .on('data', () => {
      if(!callback.called) {
        callback.called = true;
        callback();
      }
    })
});



gulp.task('watch', () => {
  gulp.watch('./src/*.html', ['dist']);
  gulp.watch('./src/stylus/**/*.styl', ['stylus']);
  gulp.watch('./src/assets/**/*', ['assets']);
});