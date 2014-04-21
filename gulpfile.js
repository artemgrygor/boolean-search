var gulp = require('gulp');
var karma = require('gulp-karma');
var jshint = require('gulp-jshint');

var paths = {
	karmaConf  : './tests/karma.conf.js',
	app : './source/ngBooleanSearch.js',
	specs : './test/*.js'
}

function runKarma(karmaConf, options){
	var config = {
		configFile: karmaConf,
	      action: 'watch'
	};

	Object.keys(options).forEach(function(key) {
      config[key] = options[key];
    });

    return gulp.src(['no need to supply files because everything is in config file'])
	    .pipe(karma(config).on('error', handleError));
}


var handleError = function (err) {
  console.log(err.name, ' in ', err.plugin, ': ', err.message);
  this.emit('end');
};

gulp.task('karma', function  (argument) {
	return runKarma(paths.karmaConf,{action: 'watch'});
});

gulp.task('lint',function(){
	return gulp.src([paths.app, paths.specs])
		   .pipe(jshint())
		   .pipe(jshint.reporter("default"))
		   .on('error', handleError);
});

gulp.task('test',function(){
	return runKarma(paths.karmaConf,{
			action: 'run',
	      autoWatch : false,
	      singleRun : true});
});

gulp.task('watch', function(){
	gulp.watch([paths.app, paths.specs],['lint', 'test']);
});

gulp.task('default',['lint', 'test', 'watch']);