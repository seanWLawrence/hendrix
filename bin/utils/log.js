"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logSuccess = logSuccess;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  {bold.green New ", " created} in ", " \n  {magenta Happy coding!} \n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**
 * Notifies the user that the new component was created
 * @module log
 * @exports logSuccess
 * @param {string} type - Type of page that will be rendered
 * @param {string} outputPath - Path of the newly created component
 * @returns {undefined} - Side effects only
 * @license MIT
 * @author Sean W. Lawrence
 */
function logSuccess(type, outputPath) {
  console.log((0, _chalk.default)(_templateObject(), type, outputPath));
}