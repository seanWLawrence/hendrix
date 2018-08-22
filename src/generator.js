// @flow

/**
 * Creates the generator that parses markdown files, runs them through the layout template
 * and adds the finished HTML files to the public/ directory
 * @summary Generator for markdown files
 * @author Sean W. Lawrence
 * @license MIT
 * @module generator
 */

import MarkdownIt from 'markdown-it';
import { join } from 'path';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { render as template } from 'mustache';
import iterator from 'markdown-it-for-inline';
import slugify from './slugify';
import addDataSrc from './data-src';

/**
 * Markdown information object that contains the filename and Markdown string
 * @typedef {Object} MarkdownInfo
 * @property {string} filename - The name of the file
 * @property {string} markdown - The Markdown string from the file
 */

/**
 * Markdown string
 * @typedef {string} Markdown
 * @example '# Hello, world!'
 */

/**
 * HTML string
 * @typedef {string} HTML
 * @example '<h1>Hello world!</h1>'
 */

/**
 * File name
 * @typedef {string} Filename
 * @example 'example.md'
 */

/**
 * Reads file and creates an object with the filename and markdown string
 * @param {Filename} filename - The name of the Markdown file
 * @returns {MarkdownInfo} - Object with the filename and markdown string
 * @example getMarkdown('example.md') // { filename: 'example.md', markdown: '# Example' }
 */
function getMarkdown(filename) {
  /**
   * Path for the Markdown file
   * @type {Filename}
   */

  const markdownFile = join(markdownPath, filename);

  /**
   * Markdown string that the file contains
   * @type {Markdown}
   */

  const markdown = readFileSync(markdownFile, 'utf8');

  /**
   * Returns the MarkdownInfo object.
   * @type {MarkdownInfo}
   * @see {@link generator/MarkdownInfo}
   */

  return {
    filename,
    markdown,
  };
}

/**
 * Renders Markdown to an HTML string and trims whitespace on ends of the string
 * @param {Markdown} markdown - The markdown that needs to be converted to HTML
 * @returns {HTML} - HTML string output from the Markdown input
 * @example renderMarkdown('# Hello, world!') // <h1>Hello, world!</h1>
 */
function renderMarkdown(markdown) {
  /**
   * Creates new MarkdownIt instance and renders the Markdown into an HTML string,
   * then trims the whitespace
   * @external markdown-it {@link https://github.com/markdown-it/markdown-it#simple|MarkdownIt}
   */

  const md = new MarkdownIt({
    html: true,
  });

  /**
   * Adds anchor tags to each header element.
   * Uses our custom slugify function.
   * @see {@link slugify}
   */
  md.use(require('markdown-it-anchor'), {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '&#128279;',
    slugify,
  });

  /**
   * Replaces the 'src' attribute on all images with the
   * 'data-src' attribute.
   * Used for faster performance with Lozad lazy-loading
   * @see {@link data-src}
   */
  addDataSrc(md);

  /**
   * Renders the markdown and returns the HTML string
   */
  return md.render(markdown);
}

/**
 * Renders the layout template with an HTML string into the body
 * @param {HTML} html - The HTML string to be added to the body of the layout template
 * @returns {HTML} HTML string with the layout added
 * @example renderLayout('<h1>Hello, world!</h1>') // '<html><body><h1> Hello, world!</h1></body></html>'
 */
function renderLayout(html) {
  /**
   * Returns the final HTML output with the template added
   * @type {HTML}
   */

  return template(layout, {
    title: 'Demo site',
    html,
    lozad: require('lozad').toString(),
  });
}

/**
 * Creates a new HTML file in the public folder
 * @param {Filename} filename - The HTML file name
 * @param {HTML} html - The HTML string that the file will contain
 * @returns {undefined} - This function is only for side effects and returns nothing
 * @example createHTMLFile('example.md', '<html><body><h1>Hello, world!</h1></body></html>')
 * // creates a file called example.html with the HTML provided
 */
function createHTMLFile(filename, html) {
  /**
   * Returned HTML file name, placed in the public directory
   * @type {Filename}
   */

  filename = `public/${filename.split('.')[0]}.html`;

  /**
   * Creates new file (or overwrites the existing one) with the HTML string that was provided
   * @type {undefined}
   */

  writeFileSync(filename, html);
}

/**
 * Path of Markdown directory
 * @type {Filename}
 */

const markdownPath = join(__dirname, '..', 'src', 'markdown');

/**
 * Path of Templates directory
 * @type {Filename}
 */

const templatePath = join(__dirname, '..', 'src', 'templates/layout.mustache');

/**
 * Array of markdown filenames stored as MarkdownInfo objects
 * @type {Array<MarkdownInfo>}
 * @see {@link MarkdownInfo}
 */

const allMarkdownFiles = readdirSync(markdownPath).map(getMarkdown);

/**
 * Stringified version of the layout template
 * @type {HTML}
 */

const layout = readFileSync(templatePath, 'utf8');

/**
 * Main program - Loops over the markdown files array, renders the markdown
 * into valid HTML, passes the HTML into the layout template
 * and creates a new HTML file (or overwrites an existing one) with the final result
 * @summary Main program
 * @exports main
 * @see {@link renderMarkdown}
 * @see {@link renderLayout}
 * @see {@link createHTMLFile}
 * @returns {undefined} - This program does not return anything, it consists of only side effects
 */
export default function main() {
  /**
   * Loops over the allMarkdownFiles array and runs all of the above methods on them
   * @function
   * @returns {undefined} - This function returns nothing
   */

  allMarkdownFiles.forEach((md) => {
    /**
     * Object with filename and Markdown string from the Markdown file
     * @type {MarkdownInfo}
     * @see {@link MarkdownInfo}
     */

    const { filename, markdown } = md;

    /**
     * HTML string from the Markdown that was passed in
     * @type {HTML}
     */

    const html = renderMarkdown(markdown);

    /**
     * HTML string with the layout HTML added
     * @type {HTML}
     */

    const result = renderLayout(html);

    /**
     * Calls the createHTMLFile function to create HTML file in the public folder with the final HTML result
     * @function
     * @see {@link createHTMLFile}
     */

    createHTMLFile(filename, result);
  });
}
