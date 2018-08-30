// @flow

import { createPage } from '..';
import config from '../../config';
import type { Answers } from '../../types';

/**
 * Generates a new unit test
 * @function generateUnitTest
 * @module generateUnitTest
 * @param {Answers} answers - Answers object gathered from the propmt in cli.js
 * @returns {undefined} - Side effects only
 * @license MIT
 * @author Sean W. Lawrence
 */
export default function generateUnitTest(answers: Answers) {
  /**
   * Gets the path of the unit test template
   * @const
   * @type {string}
   */
  let templatePath = config('unit').imports.tests;

  /**
   * Gets the path for the new unit test to go
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
