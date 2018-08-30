"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateMarkdownPage;

var _ = require("..");

var _config = _interopRequireDefault(require("../../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generates a new Markdown page
 * @function generateMarkdownPage
 * @module generateMarkdownPage
 * @param {Answers} answers - Answers object gathered from the propmt in cli.js
 * @returns {undefined} - Side effects only
 * @license MIT
 * @author Sean W. Lawrence
 */
function generateMarkdownPage(answers) {
  var templatePath = (0, _config.default)('markdown').imports.pages;
  var outputPath = (0, _config.default)(answers.name).exports.pages;
  (0, _.createPage)({
    answers: answers,
    templatePath: templatePath,
    outputPath: outputPath
  });
  return;
}