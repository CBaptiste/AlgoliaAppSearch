/**
* This file defines some basic gulp tasks
* less compilation, JS browserify and concatenation on a single file, live watch file modification
*/

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var path = require('path');
var watch = require('gulp-watch');
 
gulp.task('less', function () {
   gulp.src(['./public/css/app.less'])
  	  	.pipe(concat('style.css'))
  	    .pipe(less({
  	      paths: [ path.join(__dirname, 'less', 'includes') ]
  	    }))
  	    .pipe(gulp.dest('./build/'));
});

gulp.task('scripts', function() {  
   gulp.src(['./public/js/helper/clientConfig.js', './public/js/helper/queryHelper.js', './public/module.js', './public/js/*.js',])
    .pipe(concat('modules.js'))
    .pipe(browserify({
      insertGlobals : true
    }))
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function(){
    gulp.watch(['./public/css/app.less','./public/module.js', './public/js/*.js', './public/js/helper/*.js'], ['less', 'scripts']);
})