"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = controller;

var _reactComponent = _interopRequireDefault(require("./generators/react-component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Controls which generator to call based on the answers gathered from the prompt
 * @module controller
 * @function
 * @param {Answers} answers - Object of answers gathered from the cli prompt
 * @returns {undefined} - Side effects only
 * @license MIT
 * @author Sean W. Lawrence
 */
function controller(answers) {
  var type = answers.type,
      name = answers.name,
      _answers$description = answers.description,
      description = _answers$description === void 0 ? 'TODO' : _answers$description,
      _answers$props = answers.props,
      props = _answers$props === void 0 ? [] : _answers$props,
      _answers$flow = answers.flow,
      flow = _answers$flow === void 0 ? false : _answers$flow;

  switch (type) {
    case 'component':
      (0, _reactComponent.default)({
        name: name,
        props: props,
        flow: flow,
        description: description
      });
      break;

    case 'Mustache template':
      break;

    case 'Open source project':
      break;

    case 'Markdown page':
      break;

    case 'Test':
      break;

    default:
      break;
  }
}