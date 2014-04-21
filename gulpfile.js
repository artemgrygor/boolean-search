var gulp = require('gulp');
var karma = require('gulp-karma');
var jshint = require('gulp-jshint');

var paths = {
	karmaConf  : './test/karma.conf.js',
	app : './source/boolean-search.js',
	specs : './test/*.js'
}