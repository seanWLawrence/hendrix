"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateReactComponent;

var _ = require("..");

var _config = _interopRequireDefault(require("../../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generates a new React component
 * @function generateReactComponent
 * @module generateReactComponent
 * @param {Object} answers - Answers object
 * @returns {undefined} - Side effects only
 * @license MIT
 * @author Sean W. Lawrence
 */
function generateReactComponent(answers) {
  var flow = answers.flow;
  var templatePath = (0, _config.default)('react').imports.components;
  var outputPath = (0, _config.default)(answers.name).exports.components;

  if (flow === true) {
    templatePath = (0, _config.default)('react-flow').imports.components;
  }

  (0, _.createPage)({
    answers: answers,
    templatePath: templatePath,
    outputPath: outputPath
  });
  return;
}