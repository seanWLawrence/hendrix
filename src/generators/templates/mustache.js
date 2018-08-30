// @flow

import { createPage } from '..';
import config from '../../config';
import type { Answers } from '../../types';

/**
 * Generates a new Mustache template
 * @function generateMustacheTemplate
 * @module generateMustacheTemplate
 * @param {Answers} answers - Answers object gathered from the propmt in cli.js
 * @returns {undefined} - Side effects only
 * @license MIT
 * @author Sean W. Lawrence
 */
export default function generateMustacheTemplate(answers: Answers) {
  /**
   * Gets the path of the Markdown template
   * @const
   * @type {string}
   */
  let templatePath = config('mustache').imports.templates;

  /**
   * Gets the path for the new Markdown page to go
   */
  const outputPath = config(answers.name).exports.templates;

  /**
   * Runs generator
   */
  createPage({ answers, templatePath, outputPath });

  /**
   * Ends function
   */
  return;
}
