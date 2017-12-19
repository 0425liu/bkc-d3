var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass-china');
var sourcemaps   = require('gulp-sourcemaps')
var  babel = require('gulp-babel');
var uglify = require('gulp-uglify');
// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("src/**/*.scss", ['sass']);
    gulp.watch('src/**/*.js', ['es6js']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('src/**/*.sass')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest("build"))
        .pipe(browserSync.stream());
});

gulp.task('es6js', function(){
    return gulp.src('src/**/*.js')
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(uglify())
      .pipe(gulp.dest('build'))
      .pipe(browserSync.stream());
  })
  
gulp.task('start',['sass','es6js'],function(){

})

gulp.task('watch', ['serve']);