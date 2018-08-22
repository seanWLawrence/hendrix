"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Convert raw header strings from Markdown into URL-friendly,
 * easy to read slugs
 * @summary Slug-maker
 * @author Sean W. Lawrence
 * @license MIT
 * @module slugify
 */
function slugify(rawSlug) {
  return _toConsumableArray(rawSlug).map(function (char) {
    return char.toLowerCase();
  }).join('').replace(/(\W+)/gi, ' ').trim().replace(/ /g, '-');
}

var _default = slugify;
exports.default = _default;