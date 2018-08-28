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

/**
 * Initializes prompt to gather information to pass to the generator
 * @function prompt
 * @returns {Answers}
 */
prompt([
  {
    message: 'What are we creating?',
    type: 'list',
    name: 'type',
    choices: [
      'React component',
      'Mustache template',
      'Open source project',
      'Markdown page',
      'Test',
    ],
    default: 'React component',
    validate: (answer) => {
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
    filter: (answer) => {
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
    filter: (answer) => {
      return answer.toLowerCase();
    },
  },
  {
    message: 'What does it do?',
    type: 'input',
    name: 'description',
    when: (answers) => {
      switch (answers.type) {
        case 'component':
        case 'project':
          return true;
        default:
          return false;
      }
    },
  },
  {
    message: 'Are you using Flow.js for static type checking?',
    type: 'list',
    name: 'flow',
    choices: ['Yes', 'No'],
    filter: (answer) => {
      switch (answer) {
        case 'Yes':
          return true;
        case 'No':
          return false;
      }
    },
    when: (answers) =>
      answers.type === 'component' || answers.type === 'project',
  },
  {
    message:
      'List your component\'s props separated by a space, i.e. prop1 prop2 prop3',
    type: 'input',
    name: 'props',
    when: (answers) =>
      answers.type === 'React component' && answers.flow === false,
    filter: (answer) => {
      return answer.split(' ');
    },
  },
  {
    message:
      'List your component\'s props and types separated by a space, i.e. <prop-name>:<type> <another-prop-name>:<type>',
    type: 'input',
    name: 'propsWithTypes',
    when: (answers) =>
      answers.type === 'React component' && answers.flow === true,
    filter: (answer) => {
      return answer.split(' ').reduce((acc, next) => {
        next = next.split(':');
        let [name, type] = next;
        return acc.concat({ name, type });
      }, []);
    },
  },
  {
    message:
      'List your Markdown page\'s frontmatter separated by a space, i.e. <prop-name>:<value> <another-prop-name>:<value>',
    type: 'input',
    name: 'frontmatter',
    when: (answers) => answers.type === 'markdown',
    filter: (answer) => {
      return answer.split(' ').reduce((acc, next) => {
        next = next.split(':');
        let [name, value] = next;
        return acc.concat({ name, value });
      }, []);
    },
  },
  {
    message: 'What are we testing?',
    type: 'input',
    name: 'testDescription',
    when: (answers) => answers.type === 'test',
  },
  {
    message: 'What type of test is this?',
    name: 'testType',
    type: 'list',
    choices: ['Integration/browser', 'Unit/function'],
    when: (answers) => answers.type === 'test',
    filter: (answer) => {
      switch (answer) {
        case 'Integration/browser':
          return 'integration';
        case 'Unit/function':
          return 'unit';
      }
    },
  },
  {
    message:
      'List the variables your template will use, separated by spaces, i.e. variable1 variable2 variable3',
    name: 'variables',
    type: 'input',
    when: (answers) => answers.type === 'template',
    filter: (answer) => {
      return answer.split(' ');
    },
  },
]).then((answers) => {
  console.log(answers);
});
