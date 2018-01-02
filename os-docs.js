#!/usr/bin/env node

'use strict';

const childProcess = require('child_process');
const Promise = require('bluebird');
const path = require('path');

const dossierJarPath = path.join(path.dirname(require.resolve('js-dossier/package.json')), 'dossier.jar');

let args;
if (process.argv.length < 3) {
  console.error('Please provide the js-dossier arguments');
  process.exit(1);
} else {
  args = process.argv.slice(2);
}

const compile = function(args) {
  return new Promise(function(resolve, reject) {
    let javaArgs = ['-jar', dossierJarPath].concat(args);

    const process = childProcess.spawn('java', javaArgs);
    process.stdout.on('data', function(data) {
      console.log(data.toString());
    });

    process.stderr.on('data', function(data) {
      console.log(data.toString());
    });

    process.on('error', function(err) {
      throw new Error('js-dossier failed: ' + (err.message || 'Unspecified error'));
    });

    process.on('exit', function(code) {
      resolve();
    });
  });
};

compile(args);
