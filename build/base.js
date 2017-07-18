var fs = require('fs');
var gulp = require('gulp');
var shelljs = require('shelljs');

// Run clone and build order computation
gulp.task('build', function(done) {
    var runSequence = require('run-sequence');
    runSequence('clone', 'topo-sort', done);
});