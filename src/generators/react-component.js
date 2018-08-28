// @flow

/**
 * Generates a new React component
 * @module generateReactComponent
 * @license MIT
 * @author Sean W. Lawrence
 */

import { render as template } from 'mustache';
import { writeFileSync, readFileSync } from 'fs';
import config from '../config';
import type { Answers } from '../types';
import chalk from 'chalk';

/**
 * Main generator
 * Decides if the generator should use withFlow or WithoutFlow
 * and calls the appropriate generator
 * @function generateReactComponent
 * @param {Answers} answers - If Flow should be used or not
 * @returns {undefined} - Side effects only
 * @exports generateReactComponent
 */
export default function generateReactComponent(answers: Answers) {
  /**
   * Destructures the answers object to pass the variables as single values
   */
  const { flow: withFlow } = answers;
  /**
   * Gets the path of the with-flow template from the config
   * @const
   * @type {string}
   */
  let templatePath = config('without-flow').imports.components;

  /**
   * Checks if flow boolean is true, if yes, change path of template
   * to the 'with-flow' template
   */
  if (withFlow === true) {
    templatePath = config('with-flow').imports.components;
  }

  /**
   * Runs generator
   */
  createComponent({ answers, templatePath });

  /**
   * Ends function
   */
  return;
}

/**
 * Notifies the user that the new component was created
 * @function
 * @param {string} outputPath - Path of the newly created component
 * @returns {undefined} - Side effects only
 */
function logSuccess(outputPath) {
  // eslint-disable-next-line no-console
  console.log(chalk`
  {bold.green New component created} in ${outputPath} 
  {magenta Happy coding!} 
  `);

  /**
   * Ends the function
   */
  return;
}

/**
 * Generates a React component with or without the flow template
 * @function createComponent
 * @param {Answers} answers - Answers gathered from the cli.js
 * @returns {undefined} - Side effects only
 */
function createComponent({ answers, templatePath }) {
  /**
   * Gets the path for the new component file to go
   */
  const outputPath = config(answers.name).exports.components;

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
  logSuccess(outputPath);

  /**
   * Ends the function
   */
  return;
}
