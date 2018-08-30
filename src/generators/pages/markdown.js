// @flow

import { createPage } from '..';
import config from '../../config';
import type { Answers } from '../../types';

/**
 * Generates a new Markdown page
 * @function generateMarkdownPage
 * @module generateMarkdownPage
 * @param {Answers} answers - Answers object gathered from the propmt in cli.js
 * @returns {undefined} - Side effects only
 * @license MIT
 * @author Sean W. Lawrence
 */
export default function generateMarkdownPage(answers: Answers) {
  /**
   * Gets the path of the Markdown template
   * @const
   * @type {string}
   */
  let templatePath = config('markdown').imports.pages;

  /**
   * Gets the path for the new Markdown page to go
   */
  const outputPath = config(answers.name).exports.pages;

  /**
   * Runs generator
   */
  createPage({ answers, templatePath, outputPath });

  /**
   * Ends function
   */
  return;
}
