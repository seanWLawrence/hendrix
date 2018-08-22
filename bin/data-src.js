"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function addDataSrc(md) {
  var defaultRender = md.renderer.rules.image || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    var srcIndex = tokens[idx].attrIndex('src');
    console.log(env);
    var srcValue = tokens[idx].attrs[srcIndex][1];
    tokens[idx].attrPush(['data-src', srcValue]);
    tokens[idx].attrs.splice(srcIndex, 1);
    return defaultRender(tokens, idx, options, env, self);
  };
}

var _default = addDataSrc;
exports.default = _default;