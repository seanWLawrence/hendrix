"use strict";

function renderLayout(html) {
  return template(layout, {
    title: 'Demo site',
    html: html,
    lozad: require('lozad').toString()
  });
}

function createHTMLFile(filename, html) {
  filename = "public/".concat(filename.split('.')[0], ".html");
  writeFileSync(filename, html);
}