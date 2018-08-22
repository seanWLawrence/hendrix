"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Convert raw header strings from Markdown into URL-friendly,
 * easy to read slugs
 * @summary Slug-maker
 * @class Slug
 * @author Sean W. Lawrence
 * @license MIT
 * @module slug
 * @todo Remove duplicate hyphens - right now if there are hyphens in the string,
 * and there are spaces around the hyphens, it will have muliple hyphens and formatting will break
 *
 */
var Slug = function () {
  function Slug(rawSlug) {
    _classCallCheck(this, Slug);

    this.rawSlug = rawSlug;
  }

  _createClass(Slug, [{
    key: "isLetter",
    value: function isLetter(char) {
      switch (char) {
        case 'a':
        case 'b':
        case 'c':
        case 'd':
        case 'e':
        case 'f':
        case 'g':
        case 'h':
        case 'i':
        case 'j':
        case 'k':
        case 'l':
        case 'm':
        case 'n':
        case 'o':
        case 'p':
        case 'q':
        case 'r':
        case 's':
        case 't':
        case 'u':
        case 'v':
        case 'w':
        case 'x':
        case 'y':
        case 'z':
        case '-':
        case ' ':
          return true;

        default:
          return false;
      }
    }
  }, {
    key: "slugify",
    value: function slugify() {
      return _toConsumableArray(this.rawSlug).map(function (char) {
        return char.toLowerCase();
      }).filter(this.isLetter).join('').trim().replace(/\s\s+/g, ' ').replace(/--+/g, '-').replace(/ /, '-');
    }
  }]);

  return Slug;
}();

var _default = Slug;
exports.default = _default;