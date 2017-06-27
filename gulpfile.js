"use strict";

const API_URL = process.env.NODE_ENV == 'production' ? '' : 'http://localhost:4000';

const gulp = require('gulp');
const path = require('path');
const pug = require('gulp-pug');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const pump = require('pump');
const concat = require('gulp-concat');
const ts = require("gulp-typescript");
const mainBowerFiles = require('main-bower-files');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const todo = require('gulp-todo');
const replace = require('gulp-replace');

const tsProject = ts.createProject("tsconfig.json");

/*
 * Directories here
 */
var paths = new function() {
  this.base_dist = './build/';
  this.css = this.base_dist + 'css/';
  this.js_dist = this.base_dist + 'js/';
  this.html_dist = this.base_dist;

  this.base_build = './src/';
  this.sass = this.base_build + 'sass/';
  this.js_build = this.base_build + 'js/';
  this.pug = this.base_build + 'pug/';

  this.assets = './assets/';
};

gulp.task('js', ['userjs', 'vendorjs'], function() {
  // gulp.start('userjs', 'vendorjs');
});

gulp.task('userjs', function(cb) {

  // return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest(paths.js_dist))
  function typescript() {
    return tsProject.src().pipe(tsProject()).js;
  }

  // User
  pump([
    typescript(),
    replace('__API-URL__', API_URL),
    sourcemaps.init(),
    uglify({
      mangle: false,
      compress: false,
    }),
    concat('dist.js'),
    sourcemaps.write('maps'),
    gulp.dest(paths.js_dist)
  ], function(e) {
    if (e !== undefined) {
      console.log(e);
    }
    browserSync.reload();
    cb(null);
  });
});

gulp.task('vendorjs', function(cb) {
  pump([
    gulp.src(mainBowerFiles()),
    sourcemaps.init(),
    uglify({
      // output: {
      // beautify: true,
      // comments: true
      // },
      mangle: true,
      compress: true,
      preserveComments: 'license'
    }),
    concat('vendor.js'),
    sourcemaps.write('maps'),
    gulp.dest(paths.js_dist)
  ], function(e) {
    if (e !== undefined) {
      console.log(e);
    }
    browserSync.reload();
    cb(null);
  });
  return;

});

/**
 * Compile .scss files into public css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
gulp.task('sass', function(cb) {
  pump([
    gulp.src(paths.sass + '*.sass'),
    sass({
      includePaths: [paths.sass],
      outputStyle: 'compressed'
    }),
    prefix(
      [
        'last 15 versions',
        '> 1%',
        'ie 8',
        'ie 7'
      ], {
        cascade: true
      }
    ),
    browserSync.reload({
      stream: true
    }),
    gulp.dest(paths.css),
  ], function(e) {
    if (e !== undefined) {
      console.log(e);
    }
    cb(null);
  });
  return;
});

gulp.task('pug', function(cb) {
  pump([
    gulp.src([paths.pug + '**/*.pug', '!' + paths.pug +
      'includes/*.pug'
    ]),
    pug(),
    gulp.dest(paths.html_dist)
  ], function(e) {
    if (e !== undefined) {
      console.log(e);
    }
    browserSync.reload();
    cb(null);
  });
  return;
});

/**
 * Watch scss files for changes & recompile
 * Watch .pug files run pug-rebuild then reload BrowserSync
 */
gulp.task('watch', function() {
  gulp.watch(paths.sass + '**/*.sass', ['sass']);
  gulp.watch(paths.js_build + '**/*.ts', ['userjs']);
  gulp.watch(paths.js_build + 'vendor/**/*.js', ['vendorjs']);
  gulp.watch(paths.pug + '**/*.pug', ['pug']);
  gulp.watch('./assets/**/*', ['assets']);
});

gulp.task('browser-sync', ['sass', 'pug', 'js'], function() {
  browserSync({
    server: {
      baseDir: paths.base_dist
    },
    notify: true
  });
});

// Build task compile sass
gulp.task('build', ['sass', 'js', 'pug', 'assets']);

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', ['browser-sync', 'watch']);

gulp.task('assets', function(cb) {
  const assets = paths.assets;
  pump([
    gulp.src([
      assets + '**/*.ttf', assets + '**/*.woff?(2)', // fonts
      assets + '**/*.jpg', assets + '**/*.svg', 
      assets + '**/*.png', assets + '**/*.bmp', 
      assets + '**/*.ico' // images
    ]),
    gulp.dest(paths.base_dist)
  ], function(e) {
    if (e !== undefined) {
      console.log(e);
    }
    cb(null);
  });
})


// generate a todo.md from your javascript files
// -> Will output a TODO.md with your todos 
gulp.task('todo', function(cb) {
  pump([
    gulp.src([
      './**/*.ts', './**/*.pug', './**/*.sass',
      '!node_modules/**/*', '!bower_components/**/*',
      '!dist/**/*'
    ]),
    todo(),
    gulp.dest('./')
  ], function(e) {
    if (typeof(e) != 'undefined') {
      console.log(e);
      process.exit(1);
    } else {
      cb();
    }
  })
});
