var gulp = require('gulp'),
	inject = require('gulp-inject'),
	clone = require('gulp-clone'),
	bower = require('main-bower-files'),
	series = require('stream-series'),
	watch = require('gulp-watch')

var cssPath = 'assets/css/**',
	jsPath = 'assets/js/**',
	watched = 'assets/**'

var watcher = function () {
	return watch(watched, build)
}
gulp.task('watch', watcher)

function build() {
	var cloneBower = clone.sink(),
		cloneCss = clone.sink(),
		cloneJs = clone.sink(),
		cssStream = gulp.src(cssPath).pipe(cloneCss),
		jsStream = gulp.src(jsPath).pipe(cloneJs),
		bowerStream = gulp.src(bower(), {
			base: 'bower_components'
		}).pipe(cloneBower)

	gulp.src('index.html')
		.pipe(inject(series(bowerStream, cssStream, jsStream), {
			relative: false
		}))
		.pipe(gulp.dest('www/'))

	cloneBower.tap().pipe(gulp.dest('www/bower_components'))
	cloneCss.tap().pipe(gulp.dest('www/assets/css'))
	cloneJs.tap().pipe(gulp.dest('www/assets/js'))
}
gulp.task('build', build)

module.exports.watch = watcher