var fs = require('fs');
var gulp = require('gulp');
var shelljs = require('shelljs');

// create npmrc file content
exports.setNpmrc = function() {
    var hostName = shelljs.exec('hostname').stdout;
    var registry = hostName.indexOf('syncdeskn') !== -1 ? 'syncdeskn6525:8081' : 'nexus.syncfusion.com';
    var npmrc = 'registry=https://registry.npmjs.org/\n' +
        '@syncfusion:registry=http://' + registry + '/repository/ej2-production/';
    fs.writeFileSync('./.npmrc', npmrc);
}

// update npmrc file content
exports.updateNpmrc = function(isPrivate) {
    var npmrc;
    if (isPrivate) {
        var registry = '//nexus.syncfusion.com/repository/ej2-release/';
        var npmrc = 'registry=https://registry.npmjs.org/\n' +
            '@syncfusion:registry=http:' + registry + '\n' +
            registry + ':username=' + process.env.PRIVATE_NPM_USER + '\n' +
            registry + ':_password=' + process.env.PRIVATE_NPM_PASSWORD + '\n' +
            registry + ':email=' + process.env.PRIVATE_NPM_EMAIL + '\n' +
            registry + ':always-auth=true';
    } else {
        npmrc = 'registry=https://registry.npmjs.org/';
    }
    fs.writeFileSync('./.npmrc', npmrc);
}

// Check current package is application or not
exports.isApplication = function(currentPackage) {
    return currentPackage.indexOf('samples') !== -1 || currentPackage.indexOf('docs') !== -1;
}

// Get current package json
var getJSON = function(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}
exports.getJSON = getJSON;

// Get current package changelog
exports.getChangelog = function(packName, packagePath) {
    var changelogPath = packagePath + 'CHANGELOG.md';
    if (fs.existsSync(changelogPath)) {
        var changelog = fs.readFileSync(changelogPath, 'utf8');
        console.log('Previous Version: ' + process.env.previousVersion);
        var changeRegex = new RegExp('## \\[Unreleased\\]([\\s\\S]*?)## ' + process.env.previousVersion);
        var currentChanges = changelog.match(changeRegex);
        currentChanges = currentChanges ? currentChanges[1].trim() : currentChanges;
        updateReport(packName, 'changelog', currentChanges);
        return currentChanges;
    }
    return;
}

var updateReport = function(packageName, key, value) {
    var reportPath = __dirname + '/../reports.json';
    var reports = fs.existsSync(reportPath) ? getJSON(reportPath) : {};
    if (!reports[packageName]) {
        reports[packageName] = {};
    }
    reports[packageName][key] = value;
    fs.writeFileSync(reportPath, JSON.stringify(reports, null, '\t'));
}
exports.updateReport = updateReport;

var getReport = function(packageName, key) {
    var reportPath = __dirname + '/../reports.json';
    if (fs.existsSync(reportPath)) {
        var reports = getJSON(reportPath);
        return reports[packageName[key]];
    }
    return;
}
exports.getReport = getReport;

var getReference = function(dependency) {
    var excludePath = __dirname + '/../excluded.json';
    if (fs.existsSync(excludePath)) {
        var excluded = getJSON(excludePath);
        var excludedKeys = Object.keys(excluded);
        return excludedKeys.indexOf(dependency) !== -1 ? excluded[dependency] : process.env.releaseVersion;
    }
    return process.env.releaseVersion;
}
exports.getReference = getReference;

var updateRelease = function(packName, version, decision) {
    var decisionPath = __dirname + '/../' + decision + '.json';
    var finalDecision = fs.existsSync(decisionPath) ? getJSON(decisionPath) : {};
    finalDecision[packName] = version;
    fs.writeFileSync(decisionPath, JSON.stringify(finalDecision, null, '\t'));
}
exports.updateRelease = updateRelease;