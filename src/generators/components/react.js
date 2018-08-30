// @flow

import { createPage } from '..';
import config from '../../config';
import type { Answers } from '../../types';

/**
 * Generates a new React component
 * @function generateReactComponent
 * @module generateReactComponent
 * @param {Object} answers - Answers object
 * @returns {undefined} - Side effects only
 * @license MIT
 * @author Sean W. Lawrence
 */
export default function generateReactComponent(answers: Answers) {
  /**
   * Destructures the answers object to pass the variables as single values
   */
  const { flow } = answers;

  /**
   * Gets the path of the with-flow template from the config
   * @const
   * @type {string}
   */
  let templatePath = config('react').imports.components;

  /**
   * Gets the path for the new component file to go
   */
  const outputPath = config(answers.name).exports.components;

  /**
   * Checks if flow boolean is true, if yes, change path of template
   * to the 'with-flow' template
   */
  if (flow === true) {
    templatePath = config('react-flow').imports.components;
  }

  /**
   * Runs generator
   */
  createPage({ answers, templatePath, outputPath });

  /**
   * Ends function
   */
  return;
}
