"use strict";

var _cli = _interopRequireDefault(require("./cli"));

var _controller = _interopRequireDefault(require("./controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Main program
 * @author Sean W. Lawrence
 * @license MIT
 */
function main() {
  (0, _cli.default)(_controller.default);
}

main();