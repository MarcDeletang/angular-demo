var gulp = require('gulp'),
	inject = require('gulp-inject'),
	clone = require('gulp-clone'),
	bower = require('main-bower-files')


function bowerAndInject(){
	var cloneBower = clone.sink()
	var bowerStream = gulp.src(bower(), { base: 'bower_components' }).pipe(cloneBower)

	gulp.src('www/index.html')
		.pipe(inject(bowerStream, {
			relative: false
		}))
		.pipe(gulp.dest('www/'))

		cloneBower.tap().pipe(gulp.dest('www/bower_components'))
}

gulp.task('test', bowerAndInject)