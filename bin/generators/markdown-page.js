"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateReactComponent;

var _index = require("./index");

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generates a new Markdown page
 * @function generateMarkdownPage
 * @module generateMarkdownPage
 * @param {Object} answers - Answers object
 * @returns {undefined} - Side effects only
 * @license MIT
 * @author Sean W. Lawrence
 */
function generateReactComponent(answers) {
  var templatePath = (0, _config.default)('markdown').imports.components;
  var outputPath = (0, _config.default)(answers.name).exports.components;

  if (withFlow === true) {
    templatePath = (0, _config.default)('with-flow').imports.components;
  }

  (0, _index.createPage)({
    answers: answers,
    templatePath: templatePath,
    outputPath: outputPath
  });
  return;
}