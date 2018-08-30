// @flow

import { render as template } from 'mustache';
import { writeFileSync, readFileSync } from 'fs';
import { logSuccess } from '../utils/log';
import type { Answers } from '../types';

/**
 * Generates a new page
 * @function createPage
 * @param {Object} - Answers gathered from the cli.js
 * @returns {undefined} - Side effects only
 * @license MIT
 * @author Sean W. Lawrence
 */
export function createPage({
  answers,
  templatePath,
  outputPath,
}: {
  answers: Answers,
  templatePath: string,
  outputPath: string,
}) {
  /**
   * Gets the stringified value of the template file to pass into Mustache's render function
   * @const
   * @type {string}
   */
  const templateValue = readFileSync(templatePath, 'utf8');

  /**
   * Gets the rendered version of the template with data passed in
   * @const
   * @type {string}
   */
  const content = template(templateValue, answers);

  /**
   * Writes the content to a new file with the name specified in the answers
   */
  writeFileSync(outputPath, content);

  /**
   * Notifies the user that the new component was created
   */
  logSuccess('React component', outputPath);

  /**
   * Ends the function
   */
  return;
}
