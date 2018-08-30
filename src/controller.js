// @flow

import generateReactComponent from './generators/components/react';
import generateMarkdownPage from './generators/pages/markdown';
import generateMustacheTemplate from './generators/templates/mustache';
import type { Answers } from './types';

/**
 * Controls which generator to call based on the answers gathered from the prompt
 * @module controller
 * @function
 * @param {Answers} answers - Object of answers gathered from the cli prompt
 * @returns {undefined} - Side effects only
 * @license MIT
 * @author Sean W. Lawrence
 */
export default function controller(answers: Answers) {
  const { type } = answers;

  switch (type) {
    case 'component':
      generateReactComponent(answers);
      break;
    case 'markdown':
      generateMarkdownPage(answers);
      break;
    case 'template':
      generateMustacheTemplate(answers);
      break;
    case 'Markdown page':
      break;
    case 'Test':
      break;
    default:
      break;
  }
}
