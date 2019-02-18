var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean-css');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');

gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
})

gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js/'))
})

gulp.task('css', function() {
    return gulp.src('./src/css/*.css')
        .pipe(clean())
        .pipe(gulp.dest('./dist/css/'))
})

gulp.task('server', function() {
    return gulp.src('src')
        .pipe(webserver({
            port: 8888,
            open: true,
            livereload: true
        }))
})

gulp.task('default', gulp.series('sass', 'server', 'watch'))

gulp.task('build', gulp.parallel('js', 'css'))