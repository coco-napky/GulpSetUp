//====================================================================================
//==================================== Brandon Napky =================================
//==================================== 28/December/2015 ==============================
//====================================================================================

//====================================================================================
//==================================== Dependencies ==================================
//====================================================================================
var gulp       = require('gulp'),
    livereload = require('gulp-livereload'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename'),
    sass       = require('gulp-ruby-sass'),
    imagemin   = require('gulp-imagemin'),
    jshint     = require('gulp-jshint');

var paths      = {};
paths.src      = {};
paths.build    = {};

//===================================================================================
//==================================== Asset Paths ==================================
//===================================================================================
var src = './assets/src/'
paths.src.scripts   = src + 'js/';
paths.src.sass      = src + 'sass/';
paths.src.images    = src + 'img/';
paths.src.fonts     = src + 'fonts/';
paths.src.html      = src;

var dist = './assets/dist/'
paths.build.scripts = dist + 'js/';
paths.build.sass    = dist + 'css/';
paths.build.images  = dist + 'img/';
paths.build.fonts   = dist + 'fonts/';
paths.build.html    = dist;

//===================================================================================
//======================== Concatenate & Minify JS ==================================
//===================================================================================
gulp.task('scripts', function() {
   console.log('Src Scripts : '  + paths.src.scripts);
   console.log('Dist Scripts : ' + paths.build.scripts);
   return gulp.src(paths.src.scripts + '*.js')
     .pipe(concat('main.js'))
       .pipe(rename({suffix: '.min'}))
       .pipe(uglify())
       .pipe(gulp.dest(paths.build.scripts))
       .pipe(livereload());
});

//===================================================================================
//======================== Compile SASS to a minified cs ============================
//===================================================================================
gulp.task('sass', function() {
  var opt = { trace: true, style: "compressed" };
  return sass( paths.src.sass + '/master.scss', opt)
    .pipe(gulp.dest(paths.build.sass))
    .pipe(livereload());
});

//===================================================================================
//======================== Optimize img for the web =================================
//===================================================================================
gulp.task('images', function() {
    console.log('Src img : '  + paths.src.images);
    console.log('Dist img : ' + paths.build.images);
    return gulp.src(paths.src.images + '**/*')
    .pipe(gulp.dest(paths.build.images))
    .pipe(livereload());
});

//===================================================================================
//==================== JS logs for  errors and warnings =============================
//===================================================================================
gulp.task('jshint', function() {
	return gulp
		.src([ paths.src.scripts + '*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

//===================================================================================
//======================== A single task to watch them all ==========================
//===================================================================================
gulp.task('watch', function() {
  livereload.listen();
   // Watch .js files
  gulp.watch(paths.src.scripts + '**/*.js',   ['scripts']);
   // Watch .scss files
  gulp.watch(paths.src.sass    + '**/*.scss', ['sass']);
   // Watch image files
  gulp.watch(paths.src.images  + '**/*',      ['images']);
  // Watch .js files
  gulp.watch(paths.src.scripts + '**/*.js',   ['jshint']);
 });

//===================================================================================
//======================== Tasks ====================================================
//===================================================================================
gulp.task('default', ['scripts', 'sass', 'images','jshint','watch']);
