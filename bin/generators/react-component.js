"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateReactComponent;

var _mustache = require("mustache");

var _fs = require("fs");

var _config = _interopRequireDefault(require("../config"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  {bold.green New component created} in ", " \n  {magenta Happy coding!} \n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function generateReactComponent(answers) {
  var withFlow = answers.flow;
  var templatePath = (0, _config.default)('without-flow').imports.components;

  if (withFlow === true) {
    templatePath = (0, _config.default)('with-flow').imports.components;
  }

  createComponent({
    answers: answers,
    templatePath: templatePath
  });
  return;
}

function logSuccess(outputPath) {
  console.log((0, _chalk.default)(_templateObject(), outputPath));
  return;
}

function createComponent(_ref) {
  var answers = _ref.answers,
      templatePath = _ref.templatePath;
  var outputPath = (0, _config.default)(answers.name).exports.components;
  var templateValue = (0, _fs.readFileSync)(templatePath, 'utf8');
  var content = (0, _mustache.render)(templateValue, answers);
  (0, _fs.writeFileSync)(outputPath, content);
  logSuccess(outputPath);
  return;
}