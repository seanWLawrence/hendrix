// @flow

import { createPage } from '..';
import config from '../../config';
import type { Answers } from '../../types';

/**
 * Generates a new integration test
 * @function generateEndToEndTest
 * @module generateEndToEndTest
 * @param {Answers} answers - Answers object gathered from the propmt in cli.js
 * @returns {undefined} - Side effects only
 * @license MIT
 * @author Sean W. Lawrence
 */
export default function generateEndToEndTest(answers: Answers) {
  /**
   * Gets the path of the integration test template
   * @const
   * @type {string}
   */
  let templatePath = config('end-to-end').imports.tests;

  /**
   * Gets the path for the new integration test to go
   */
  const outputPath = config(answers.name).exports.tests;

  /**
   * Runs generator
   */
  createPage({ answers, templatePath, outputPath });

  /**
   * Ends function
   */
  return;
}
