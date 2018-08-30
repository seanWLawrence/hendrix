// @flow

/**
 * Prompts user to gather information about which generator to use
 * @file prompt
 * @license MIT
 * @author Sean W. Lawrence
 */

/**
 * @typedef Answers
 * @property {string} type - Type of generator
 * @property {string} name - Name of the file(s) or project
 * @property {string} description - Description of the file or project
 * @property {string?} frontmatter - If creating Markdown page, string of frontmatter
 * @property {boolean?} flow - If creating a React component, will Flow be used?
 * @property {string?} props - If creating a React component, string of props
 * @property {string?} propsWithTypes - If creating a React component with Flow, string of props and their types
 * @property {string?} testDescription - If creating a test, what is being tested
 * @property {string?} testType - If creating a test, is it an integration or unit test
 * @property {string?} variables - If creating a template, string of variables that will be used in the template
 */

import { prompt } from 'inquirer';
import falsify from './utils/falsify';
import type { Answers } from './types';

/**
 * Initializes prompt to gather information to pass to the generator
 * @function cli
 * @param {Function} callback - Function to be called with the data returned from the prompt
 * @returns {undefined} - Side effects only
 */
export default function cli(callback: (answers: Answers) => void): void {
  prompt([
    {
      message: 'What are we creating?',
      type: 'list',
      name: 'type',
      choices: [
        'React component',
        'Markdown page',
        'Mustache template',
        'Open source project',
        'Test',
      ],
      default: 'React component',
      validate: (answer: string): boolean => {
        /**
         * Only accept values from the given choices
         */
        switch (answer) {
          case 'React component':
          case 'Mustache template':
          case 'Open source project':
          case 'Markdown page':
          case 'Test':
            return true;
          default:
            return false;
        }
      },
      filter: (answer: string): string | void => {
        /**
         * Format the answer into a simpler term
         * for use later
         */
        switch (answer) {
          case 'React component':
            return 'component';
          case 'Mustache template':
            return 'template';
          case 'Open source project':
            return 'project';
          case 'Markdown page':
            return 'markdown';
          case 'Test':
            return 'test';
          default:
            return;
        }
      },
    },
    {
      message: 'What are we naming it?',
      type: 'input',
      name: 'name',
      validate: (answer: string): boolean => answer !== '',
    },
    {
      message: 'What does it do?',
      type: 'input',
      name: 'description',
      when: (answers: Answers): boolean => {
        /**
         * Only asks this question if the type is
         * a 'component' or 'project'
         */
        switch (answers.type) {
          case 'component':
          case 'project':
            return true;
          default:
            return false;
        }
      },
      filter: (answer: string): boolean | string => falsify(answer),
    },
    {
      message: 'Are you using Flow.js for static type checking?',
      type: 'list',
      name: 'flow',
      choices: ['Yes', 'No'],
      filter: (answer: 'Yes' | 'No'): boolean => {
        /**
         * Change yes/no values to true/false
         */
        switch (answer) {
          case 'Yes':
            return true;
          case 'No':
            return false;
          default:
            return false;
        }
      },
      when: (answers: Answers): boolean =>
        answers.type === 'component' || answers.type === 'project',
    },
    {
      message:
        'List your component\'s props and types separated by a space, i.e. <prop-name>:<type> <another-prop-name>:<type>',
      type: 'input',
      name: 'props',
      when: (answers: Answers): boolean => answers.type === 'component',
      filter: (
        answer: string,
      ): boolean | Array<{ name: string, type: string }> => {
        /**
         * Convert answer string to array of strings
         * separated by the spaces in between each value
         * and reduce the array of strings into an array
         * of objects with name and type properties i.e.
         * [{name: 'propName', type: 'propType'}]
         */
        const result = answer.split(' ').reduce((acc, next) => {
          const [name, type] = next.split(':');
          return acc.concat({ name, type });
        }, []);

        /**
         * If answer is an empty array, return false
         * If not, return the formatted answer array
         */
        return falsify(result);
      },
    },
    {
      message:
        'List your Markdown page\'s frontmatter separated by a semicolon, i.e. <prop-name>:<value>; <another-prop-name>:<value>',
      type: 'input',
      name: 'frontmatter',
      when: (answers: Answers): boolean => answers.type === 'markdown',
      filter: (
        answer: string,
      ): boolean | Array<{ name: string, value: string }> => {
        /**
         * If no frontmatter was entered, return false so the frontmatter section will not be rendered in the template
         */
        if (answer === '') {
          return false;
        }

        /**
         * If frontmatter was entered,
         * split the single string into an array of strings,
         * separated by each space
         * and reduce the array of strings into an array of objects
         * with name and type properties, i.e.
         * [{name: 'propName', type: 'propType'}]
         */
        const result = answer.split(';').reduce((acc, next) => {
          let [name, value] = next.split(':');
          name = name.trim();
          value = value.trim();
          return acc.concat({ name, value });
        }, []);

        /**
         * Returns the result
         */
        return result;
      },
    },
    {
      message: 'What type of test is this?',
      name: 'testType',
      type: 'list',
      choices: ['Integration/browser', 'Unit/function'],
      when: (answers: Answers): boolean => answers.type === 'test',
      filter: (
        answer: 'Integration/browser' | 'Unit/function',
      ): 'integration' | 'unit' => {
        /**
         * Changes name of input to a simpler term for use later
         */
        switch (answer) {
          case 'Integration/browser':
            return 'integration';
          case 'Unit/function':
            return 'unit';
          default:
            return 'unit';
        }
      },
    },
    {
      message:
        'List the variables your template will use, separated by spaces, i.e. variable1 variable2 variable3',
      name: 'variables',
      type: 'input',
      when: (answers: Answers): boolean => answers.type === 'template',
      filter: (answer: string): boolean | string[] => {
        /**
         * Split the single string by each space
         * and return it as an array of string values
         */
        const result = answer.split(' ');

        /**
         * If answer if an empty array, return false
         * If not, return the array of variables
         */
        return falsify(result);
      },
    },
  ]).then(
    (answers: Answers): void => {
      console.log(answers);
      /**
       * Runs the callback function passed in with the answers
       * gathered from the cli prompt
       */
      callback(answers);
    },
  );
}
