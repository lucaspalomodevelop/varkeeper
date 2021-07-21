const { doesNotThrow } = require('assert');
const gulp = require('gulp'); 
const minify = require('gulp-minify');

gulp.task('default', function(done) {
    var Src = './src/*js',
    Dst = 'dist';
    gulp.src(Src)
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest(Dst))
    done();

});
