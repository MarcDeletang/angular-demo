var gulp = require('gulp')

var bowerJs = 'bower_components/**/**.js'
var targetBowerJS = 'www/bower_components/js'


var bowerCSS = 'bower_components/**/**.css'
var targetBowerCSS = 'www/bower_components/css'

var secondTask = function(){
	gulp.src(bowerJs).pipe(gulp.dest(targetBowerJS))
	gulp.src(bowerCSS).pipe(gulp.dest(targetBowerCSS))
}

gulp.task('test', secondTask)
