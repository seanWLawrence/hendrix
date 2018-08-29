"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPage = createPage;

var _mustache = require("mustache");

var _fs = require("fs");

var _log = require("../utils/log");

/**
 * Generates a new page
 * @function createPage
 * @param {Object} - Answers gathered from the cli.js
 * @returns {undefined} - Side effects only
 * @license MIT
 * @author Sean W. Lawrence
 */
function createPage(_ref) {
  var answers = _ref.answers,
      templatePath = _ref.templatePath,
      outputPath = _ref.outputPath;
  var templateValue = (0, _fs.readFileSync)(templatePath, 'utf8');
  var content = (0, _mustache.render)(templateValue, answers);
  (0, _fs.writeFileSync)(outputPath, content);
  (0, _log.logSuccess)('React component', outputPath);
  return;
}