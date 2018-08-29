"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = config;

var _path = require("path");

/**
 * Creates the configuration object with paths for all of the templates and generators
 * @module config
 * @license MIT
 * @author Sean W. Lawrence
 */
var templatesPath = (0, _path.join)(__dirname, '..', 'src/templates');

function getImportPath(directory, filename) {
  return (0, _path.join)(templatesPath, directory, "".concat(filename, ".mustache"));
}

function getExportPath(directory, filename, extension) {
  return (0, _path.join)(__dirname, '..', directory, "".concat(filename, ".").concat(extension));
}

function config(filename) {
  return {
    imports: {
      components: getImportPath('components', filename),
      pages: getImportPath('pages', filename),
      projects: getImportPath('projects', filename),
      templates: getImportPath('templates', filename),
      tests: getImportPath('tests', filename)
    },
    exports: {
      components: getExportPath('public/components', filename, 'js'),
      pages: getExportPath('public/pages', filename, 'md'),
      projects: getExportPath('public/projects', filename, 'js'),
      templates: getExportPath('public/templates', filename, 'mustache'),
      tests: getExportPath('public/__tests__', filename, 'spec.js')
    }
  };
}