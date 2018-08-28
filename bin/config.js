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
function config(filename) {
  return {
    imports: {
      components: (0, _path.join)(__dirname, '..', 'src/templates/react-component', "".concat(filename, ".mustache"))
    },
    exports: {
      components: (0, _path.join)(__dirname, '..', 'public', "".concat(filename, ".js"))
    }
  };
}