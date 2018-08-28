// @flow

import generateReactComponent from './generators/react-component';
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
  const {
    type,
    name,
    description = 'TODO',
    props = [],
    flow = false,
  } = answers;

  switch (type) {
    case 'component':
      generateReactComponent({ name, props, flow, description });
      break;
    case 'Mustache template':
      break;
    case 'Open source project':
      break;
    case 'Markdown page':
      break;
    case 'Test':
      break;
    default:
      break;
  }
}
