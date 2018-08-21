var md = require('markdown-it')();
var path = require('path')
var fs = require('fs')
var mustache = require('mustache')

/**
 * Reads file and create object with the filename and markdown string
 * @param {string} filename - The filename that contains the markdown you'd like to get
 */

function getMarkdown(filename) {
  // get path of markdown file
  var markdownFile = path.join(markdownPath, filename)

  // read the file
  var markdown = fs.readFileSync(markdownFile, 'utf8');

  // return the object with filename and markdown string
  return {
    filename,
    markdown
  }
}

/**
 * Renders markdown to HTML and trim whitespace on ends of the string
 * @param {string} markdown - The markdown that needs to be converted to HTML
 */
function renderMarkdown(markdown) {
  // call md's render function on the markdown parameter
  return md.render(markdown).trim()
}

/**
 * Renders the layout template with the HTML that was converted to markdown 
 * @param {string} html - The HTML that needs to be rendered into the layout template
 */
function renderLayout(html) {
  return mustache.render(layout, { title: 'Demo site', html })
}

/**
 * Creates a new HTML file in the public folder
 * @param {string} filename - The name of the HTML file
 * @param {string} htmlString - The string of HTML that needs to be added to the new file
 */
function createHTMLFile(filename, htmlString) {
  // remove extension from filename
  filename = filename.split('.')[0]

  // add the public folder path and html extension to the filename
  filename = `public/${filename}.html`

  // create new file (or overwrite existing one) with 
  fs.writeFileSync(filename, htmlString)
}

// get markdown, template and public folder paths
var markdownPath = path.join(__dirname, 'markdown')
var templatePath = path.join(__dirname, 'templates/layout.mustache')
var publicPath = path.join(__dirname, 'public')

// array of markdown filenames
var markdownFiles = fs.readdirSync(markdownPath)

// array of objects with filenames and markdown content
var markdown = markdownFiles.map(getMarkdown)

// read the layout template file and tun it to a string
var layout = fs.readFileSync(templatePath, 'utf8')

/**
 * Main program - Loops over the markdown files array, renders the markdown 
 * into valid HTML, passes the HTML into the layout template
 * and creates a new HTML file (or overwrites an existing one) with the final result
 */
function main() {

  // loop over the array of markdown objects
  markdown.forEach(md => {
    // destructure the object to get the values from each variable
    var { filename, markdown } = md;

    // render the markdown into valid HTML
    var html = renderMarkdown(markdown)

    // render the layout template with the HTML passed in the body
    var result = renderLayout(html)

    // create HTML file in the public folder with the final result
    createHTMLFile(filename, result)
  })
}

// initialize the main program function
main()