"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = main;

var _markdownIt = _interopRequireDefault(require("markdown-it"));

var _path = require("path");

var _fs = require("fs");

var _mustache = require("mustache");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Reads file and create object with the filename and markdown string
 * @param {string} filename - The filename that contains the markdown you'd like to get
 */
function getMarkdown(filename) {
  // get path of markdown file
  var markdownFile = (0, _path.join)(markdownPath, filename); // read the file

  var markdown = (0, _fs.readFileSync)(markdownFile, 'utf8'); // return the object with filename and markdown string

  return {
    filename: filename,
    markdown: markdown
  };
}
/**
 * Renders markdown to HTML and trim whitespace on ends of the string
 * @param {string} markdown - The markdown that needs to be converted to HTML
 */


function renderMarkdown(markdown) {
  // call md's render function on the markdown parameter
  return new _markdownIt.default().render(markdown).trim();
}
/**
 * Renders the layout template with the HTML that was converted to markdown
 * @param {string} html - The HTML that needs to be rendered into the layout template
 */


function renderLayout(html) {
  return (0, _mustache.render)(layout, {
    title: 'Demo site',
    html: html
  });
}
/**
 * Creates a new HTML file in the public folder
 * @param {string} filename - The name of the HTML file
 * @param {string} htmlString - The string of HTML that needs to be added to the new file
 */


function createHTMLFile(filename, htmlString) {
  // remove extension from filename
  filename = filename.split('.')[0]; // add the public folder path and html extension to the filename

  filename = "public/".concat(filename, ".html"); // create new file (or overwrite existing one) with

  (0, _fs.writeFileSync)(filename, htmlString);
} // get markdown, template and public folder paths


var markdownPath = (0, _path.join)(__dirname, '..', 'src', 'markdown');
var templatePath = (0, _path.join)(__dirname, '..', 'src', 'templates/layout.mustache'); // array of markdown filenames stored as objects with filenames and markdown content

var allMarkdownFiles = (0, _fs.readdirSync)(markdownPath).map(getMarkdown); // read the layout template file and tun it to a string

var layout = (0, _fs.readFileSync)(templatePath, 'utf8');
/**
 * Main program - Loops over the markdown files array, renders the markdown
 * into valid HTML, passes the HTML into the layout template
 * and creates a new HTML file (or overwrites an existing one) with the final result
 */

function main() {
  // loop over the array of markdown objects
  allMarkdownFiles.forEach(function (md) {
    // destructure the object to get the values from each constiable
    var filename = md.filename,
        markdown = md.markdown; // render the markdown into valid HTML

    var html = renderMarkdown(markdown); // render the layout template with the HTML passed in the body

    var result = renderLayout(html); // create HTML file in the public folder with the final result

    createHTMLFile(filename, result);
  });
}