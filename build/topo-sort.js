var fs = require('fs');
var gulp = require('gulp');
var common = require('./common.js');

gulp.task('topo-sort', function() {
    // get all package graph details
    var graph = getPackages();
    var toposort = require('toposort');
    // create topo sorted list
    var topoSorted = toposort(graph);
    console.log(topoSorted);
    // write topo sorted list in a json file
    fs.writeFileSync('./topo-sorted.json', JSON.stringify(topoSorted));
});

// Get all component package details
function getPackages() {
    var glob = require('glob');
    var shelljs = require('shelljs');
    // get all package.json files from repository folder
    var packages = glob.sync('./repositories/**/package.json');
    var graphs = [];
    for (var i = 0; i < packages.length; i++) {
        if (common.isApplication(packages[i])) {
            continue;
        }
        // get each package details
        var currentPackage = common.getJSON(packages[i]);
        // get current repository dependencies
        var currDeps = getDependencies(currentPackage);
        // get nodes and graph details from dependencies
        for (var j = 0; j < currDeps.length; j++) {
            graphs.push([currDeps[j], currentPackage.name]);
        }
    }
    return graphs;
}

// Get current package dependencies
function getDependencies(currentPackage) {
    var SyncDeps = [];
    var dependencies = currentPackage.dependencies;
    // return empty array for undefined dependencies
    if (!dependencies) {
        return SyncDeps;
    }

    // iterate and get syncfusion dependencies
    var depKeys = Object.keys(dependencies);
    for (var i = 0; i < depKeys.length; i++) {
        if (depKeys[i].indexOf('@syncfusion/') !== -1) {
            SyncDeps.push(depKeys[i]);
        }
    }
    return SyncDeps;
}