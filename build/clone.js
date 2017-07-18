var fs = require('fs');
var gulp = require('gulp');
var shelljs = require('shelljs');

// get repository details
var repos = require('../repositories.json');
// get package names
var packNames = Object.keys(repos);
var user = process.env.GITLAB_USER || 'ajithr';
var token = process.env.GITLAB_TOKEN || 'WS23glAd';

gulp.task('clone', function(done) {
    createRepos(packNames, done);
});

function createRepos(packages, done) {
    // iterate package names and clone each components
    for (var i = 0; i < packages.length; i++) {
        var gitPath = 'https://' + user + ':' + token + '@gitlab.syncfusion.com/essential-studio/' + repos[packages[i]];
        var isLast = i === packages.length - 1;
        cloneRepos(gitPath, './repositories/' + packages[i], isLast, done);
    }
}

function cloneRepos(gitPath, localPath, isLast, done) {
    var simpleGit = require('simple-git');
    // clone current repository
    shelljs.exec('git clone ' + gitPath + ' ' + localPath, { silent: false });
    shelljs.cd(localPath);
    // checkout master branch    
    shelljs.exec('git checkout master');
    shelljs.cd('../../');
    if (isLast && done) {
        done();
    }
}