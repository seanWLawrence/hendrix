
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