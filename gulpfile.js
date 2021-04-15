var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('style', function() {
    gulp.src('app.js')
        .pipe(jshint)
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }));
});