var md = require('markdown-it')();
var path = require('path')
var fs = require('fs')
var mustache = require('mustache')

// get markdown, template and public folder paths
var markdownPath = path.join(__dirname, 'markdown/index.md')
var templatePath = path.join(__dirname, 'templates/layout.mustache')
var publicPath = path.join(__dirname, 'public')

// read markdown and template files and turn them to a string
var markdown = fs.readFileSync(markdownPath, 'utf8')
var template = fs.readFileSync(templatePath, 'utf8')

// render markdown to HTML and trim whitespace on ends of the string
var content = md.render(markdown).trim()

// pass the HTML string into the template
var result = mustache.render(template, {title: 'Demo site', content})

// write to public folder
fs.appendFileSync('public/index.html', result)