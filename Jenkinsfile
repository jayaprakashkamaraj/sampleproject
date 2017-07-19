#!groovy

properties([[$class: 'ParametersDefinitionProperty',
    parameterDefinitions: [[$class: 'StringParameterDefinition', name: 'releaseTitle', defaultValue: ''],
    [$class: 'StringParameterDefinition', name: 'releaseDate', defaultValue: ''],
    [$class: 'StringParameterDefinition', name: 'releaseVersion', defaultValue: '']]],
    [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '20', artifactNumToKeepStr: '30', daysToKeepStr: '20', numToKeepStr: '100']]])

node('EJ2Build') {
    try {
        deleteDir()

        stage('Checkout') {
            checkout scm
        }

        stage('Install') {
            runShell('yarn install --pure-lockfile --ignore-optional')
        }

        stage('Clone') {
            runShell('npm run build')
        }

        stage('Compile') {
            runShell('npm run compile')
        }

        stage('Artifact') {
            archiveArtifacts artifacts: 'output/, included.json, excluded.json, reports.json', excludes: null
        }

        deleteDir()
    }
    catch(Exception e) {
        println(e)
        deleteDir()        
        error('Build Failed')        
    }
}

def runShell(String command) {
    if(isUnix()) {
        sh command
    }
    else {
        bat command
    }
}
