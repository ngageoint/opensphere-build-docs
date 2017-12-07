#!/usr/bin/env node

/* eslint no-use-before-define: "off" */

'use strict';

const fs = require('fs');
const helper = require('opensphere-build-closure-helper');
const merge = require('deepmerge');
const path = require('path');

/**
 * Module usage information.
 * @type {string}
 */
const usage = 'Usage: os-docs-gen-config <input path> <output path>';

/**
 * Default documentation type if not specified.
 * @type {string}
 */
const defaultDocType = 'dossier';

/**
 * Handle errors encountered in the script.
 * @param {string} message The error message.
 * @param {Error=} error The error
 */
const handleError = function(message, error) {
  console.error(message, error);
  process.exit(1);
};

if (process.argv.length < 4 || !process.argv[2] || !process.argv[3]) {
  handleError(usage);
}

var inputPath = path.resolve(process.cwd(), process.argv[2]);
var outputPath = path.resolve(process.cwd(), process.argv[3]);

/**
 * Get the source list from the manifest.
 * @param {Object} config The JSDoc configuration object
 * @param {string|undefined} includePattern Pattern to filter included sources
 * @return {Array<string>} The source list
 */
const getSources = function(config, includePattern) {
  var sources = helper.readManifest(path.resolve('.build', 'gcc-manifest'));

  if (includePattern) {
    var pattern = new RegExp(includePattern);
    sources = sources.filter(function(source) {
      return pattern.test(source);
    });
  }

  return sources;
};

/**
 * Reads and filters include files from the manifest and adds them to the
 * configuration.
 *
 * @param {Object} config The JSDoc configuration object
 */
const appendSourcesDossier = function(config) {
  // js-dossier has its own type filter, so don't filter source files
  var sources = getSources(config);
  console.log('Adding ' + sources.length + ' files to js-dossier sources...');
  config.sources = (config.sources || []).concat(sources);
};

/**
 * Reads and filters include files from the manifest and adds them to the
 * configuration.
 *
 * @param {Object} config The JSDoc configuration object
 */
const appendSourcesJsdoc = function(config) {
  var sources = getSources(config, config.build.includePattern);
  console.log('Adding ' + sources.length + ' files to JSDoc sources...');
  config.source = config.source || {};
  config.source.include = (config.source.include || []).concat(sources);
};

/**
 * Merges the base JSDoc configuration with the project configuration.
 * @param {string} inputPath Path to the project configuration
 * @return {Object} The merged configuration
 */
const getMergedConfig = function(inputPath) {
  // read the project config
  var inputJson = fs.readFileSync(inputPath, 'utf8');
  if (!inputJson) {
    handleError('missing jsdoc input configuration!');
  }

  var inputConfig = JSON.parse(inputJson);

  // make sure the configuration defines the documentation type
  inputConfig.build = inputConfig.build || {};
  inputConfig.build.type = inputConfig.build.type || defaultDocType;

  // read the base configuration from this package
  var baseConfigPath = path.join(__dirname, inputConfig.build.type + '.conf.json');
  var baseJson = fs.readFileSync(baseConfigPath, 'utf8');
  if (!baseJson) {
    handleError('missing base configuration: ' + baseConfigPath);
  }

  // resolve paths relative to this package
  baseJson = baseJson.replace(/%dirname%/gi, __dirname);

  // merge the base config with the input config
  var baseConfig = JSON.parse(baseJson);
  return merge(baseConfig, inputConfig);
};

/**
 * Process a JSDoc configuration file, producing a list of file includes from
 * the gcc-manifest.
 */
const processJsdocConf = function() {
  if (inputPath && outputPath) {
    try {
      var config = getMergedConfig(inputPath);
      if (config.build.type === 'jsdoc') {
        console.log('Processing JSDoc configuration file...');

        // read sources from the manifest and add them to the config
        appendSourcesJsdoc(config);
      } else {
        console.log('Processing js-dossier configuration file...');

        // read sources from the manifest and add them to the config
        appendSourcesDossier(config);
      }

      // write the config to the output path
      outputPath = path.resolve(process.cwd(), outputPath);
      console.log('Writing JSDoc configuration to: ' + outputPath);
      fs.writeFileSync(outputPath, JSON.stringify(config));
    } catch (e) {
      handleError('failed to write jsdoc config: ' + e.message, e);
    }
  } else {
    handleError(usage);
  }
};

processJsdocConf();
