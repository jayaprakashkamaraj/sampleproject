var fs = require('fs');
var gulp = require('gulp');
var glob = require('glob');
var rimraf = require('rimraf');
var shelljs = require('shelljs');
var common = require('./common.js');

var buildInfo = [];
gulp.task('compile', function(done) {
    shelljs.exec('npm cache clean');
    shelljs.exec('yarn cache clean');
    // get sorted repository list
    var sortedRepos = common.getJSON('./topo-sorted.json');
    for (var i = 0; i < sortedRepos.length; i++) {
        // Run each component build        
        var packName = sortedRepos[i].replace('@syncfusion/', '');
        runBuild(packName);
    }
    var tableify = require('tableify');
    // create and write a build information table
    var html = tableify(buildInfo);
    html = html.replace(/class="string">SUCCESS/g, 'class="string success">SUCCESS');
    html = html.replace(/class="string">FAILED/g, 'class="string failed">FAILED');
    var table = html + '\n\n' + fs.readFileSync('./build/style.html', 'utf8');
    fs.writeFileSync('./output/index.html', table);
});

function runBuild(packName) {
    // get topo sorted packages
    var sortedRepos = common.getJSON('./topo-sorted.json');
    // navigate to current package repo
    shelljs.cd('./repositories/' + packName);
    console.log('\n\nEntered into ./repositories/' + packName + '\n\n');

    // get current package.json
    var pack = common.getJSON('./package.json');
    // check current changelog
    var changelog = common.getChangelog(packName, './');
    // if (!changelog || (changelog && !changelog.length)) {
    //     common.updateReport(packName, 'isExcluded', true);
    //     // navigate to root directory
    //     shelljs.cd('../../');
    //     var install = build = publish = shelljs.exec('echo none', { silent: true });
    //     writeResults(install, build, publish, packName);
    //     // update excluded package details
    //     common.updateRelease(packName, pack.version, 'excluded');
    //     // exit from current package
    //     console.log('\nExcluded From Release\n');
    //     console.log('\n\nExited from ./repositories/' + packName + '\n\n');
    //     console.log('****************************************************');
    //     return;
    // } else {
    common.updateReport(packName, 'isExcluded', false);
    common.updateRelease(packName, pack.version, 'included');
    //}

    // update readme with changelog
    if (fs.existsSync('./CHANGELOG.md')) {
        common.updateReadme(packName);
    }

    // update ej2-build in package devDependencies
    pack.devDependencies['@syncfusion/ej2-build'] = 'file:../ej2-build';
    // rewrite current package.json
    fs.writeFileSync('./package.json', JSON.stringify(pack, null, '\t'));

    // install all dependencies
    common.updateNpmrc();
    var install = shelljs.exec('yarn install --pure-lockfile --ignore-optional', { silent: false });

    // run required gulp tasks
    var buildScripts = 'gulp scripts && gulp ci-compile && gulp es6-scripts && gulp umd-scripts && gulp global-scripts && gulp license && gulp npmignore';
    if (pack.name === '@syncfusion/ej2') {
        buildScripts = 'gulp build && gulp global-scripts';
    }
    var build = shelljs.exec(buildScripts, { silent: false });

    // publish current package in npm
    common.updateNpmrc(true);
    common.updatePackageJSON();
    var publish = shelljs.exec('npm publish', { silent: false });

    // navigate to root directory
    shelljs.cd('../../');
    writeResults(install, build, publish, packName);
    console.log('\n\nExited from ./repositories/' + packName + '\n\n');
    console.log('****************************************************');
}

function writeResults(install, build, publish, packName) {
    // create output directory
    shelljs.mkdir('-p', './output/' + packName);
    // create and write stdout file
    var stdout = getStd(install, 'stdout') + '\n\n' + getStd(build, 'stdout') + '\n\n' + getStd(publish, 'stdout');
    fs.writeFileSync('./output/' + packName + '/stdout.log', stdout);

    // get task results
    var result = {
        Name: '@syncfusion/' + packName,
        Install: getResult(install),
        Build: getResult(build),
        Publish: getResult(publish),
        Report: '<a href="./' + packName + '/stdout.log" target="_blank">' + packName + '</a>'
    }
    buildInfo.push(result);
}

function getStd(task, process) {
    if (task) {
        return task[process];
    }
    return '';
}

function getResult(task) {
    if (task) {
        if (task.stdout.trim() === 'none') {
            return '-';
        }
        return task.code === 0 ? 'SUCCESS' : 'FAILED';
    }

}

gulp.task('status', function() {
    var status = fs.existsSync('./breaking') ? 'Yes' : 'No';
    console.log('Build Has Breaking Failures?: ' + status);
    if (status === 'Yes') {
        console.log('BUILD FAILED');
        process.exit(1);
    } else {
        console.log('BUILD SUCCESS');
    }
});