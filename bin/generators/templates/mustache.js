"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateMustacheTemplate;

var _ = require("..");

var _config = _interopRequireDefault(require("../../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generates a new Mustache template
 * @function generateMustacheTemplate
 * @module generateMustacheTemplate
 * @param {Answers} answers - Answers object gathered from the propmt in cli.js
 * @returns {undefined} - Side effects only
 * @license MIT
 * @author Sean W. Lawrence
 */
function generateMustacheTemplate(answers) {
  var templatePath = (0, _config.default)('mustache').imports.templates;
  var outputPath = (0, _config.default)(answers.name).exports.templates;
  (0, _.createPage)({
    answers: answers,
    templatePath: templatePath,
    outputPath: outputPath
  });
  return;
}