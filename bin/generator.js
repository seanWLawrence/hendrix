"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = main;

var _markdownIt = _interopRequireDefault(require("markdown-it"));

var _path = require("path");

var _fs = require("fs");

var _mustache = require("mustache");

var _markdownItForInline = _interopRequireDefault(require("markdown-it-for-inline"));

var _slugify = _interopRequireDefault(require("./slugify"));

var _dataSrc = _interopRequireDefault(require("./data-src"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates the generator that parses markdown files, runs them through the layout template
 * and adds the finished HTML files to the public/ directory
 * @summary Generator for markdown files
 * @author Sean W. Lawrence
 * @license MIT
 * @module generator
 */
function getMarkdown(filename) {
  var markdownFile = (0, _path.join)(markdownPath, filename);
  var markdown = (0, _fs.readFileSync)(markdownFile, 'utf8');
  return {
    filename: filename,
    markdown: markdown
  };
}

function renderMarkdown(markdown) {
  var md = new _markdownIt.default({
    html: true
  }).use(require('markdown-it-anchor'), {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '&#128279;',
    slugify: _slugify.default
  }).use(require('markdown-it-attrs')).use(require('markdown-it-smartarrows')).use(require('markdown-it-header-sections')).use(require('markdown-it-toc-done-right')).use(require('markdown-it-center-text')).use(require('markdown-it-replace-link')).use(require('markdown-it-front-matter'), function (frontmatter) {
    console.log(frontmatter);
  }).use(require('mdfigcaption'));
  (0, _dataSrc.default)(md);
  return md.render(markdown);
}

function renderLayout(html) {
  return (0, _mustache.render)(layout, {
    title: 'Demo site',
    html: html,
    lozad: require('lozad').toString()
  });
}

function createHTMLFile(filename, html) {
  filename = "public/".concat(filename.split('.')[0], ".html");
  (0, _fs.writeFileSync)(filename, html);
}

var markdownPath = (0, _path.join)(__dirname, '..', 'src', 'markdown');
var templatePath = (0, _path.join)(__dirname, '..', 'src', 'templates/layout.mustache');
var allMarkdownFiles = (0, _fs.readdirSync)(markdownPath).map(getMarkdown);
var layout = (0, _fs.readFileSync)(templatePath, 'utf8');

function main() {
  allMarkdownFiles.forEach(function (md) {
    var filename = md.filename,
        markdown = md.markdown;
    var html = renderMarkdown(markdown);
    var result = renderLayout(html);
    createHTMLFile(filename, result);
  });
}