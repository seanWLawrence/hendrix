"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cli;

var _inquirer = require("inquirer");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function cli(callback) {
  (0, _inquirer.prompt)([{
    message: 'What are we creating?',
    type: 'list',
    name: 'type',
    choices: ['React component', 'Mustache template', 'Open source project', 'Markdown page', 'Test'],
    default: 'React component',
    validate: function validate(answer) {
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
    filter: function filter(answer) {
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
    }
  }, {
    message: 'What are we naming it?',
    type: 'input',
    name: 'name'
  }, {
    message: 'What does it do?',
    type: 'input',
    name: 'description',
    when: function when(answers) {
      switch (answers.type) {
        case 'component':
        case 'project':
          return true;

        default:
          return false;
      }
    }
  }, {
    message: 'Are you using Flow.js for static type checking?',
    type: 'list',
    name: 'flow',
    choices: ['Yes', 'No'],
    filter: function filter(answer) {
      switch (answer) {
        case 'Yes':
          return true;

        case 'No':
          return false;
      }
    },
    when: function when(answers) {
      return answers.type === 'component' || answers.type === 'project';
    }
  }, {
    message: "List your component's props and types separated by a space, i.e. <prop-name>:<type> <another-prop-name>:<type>",
    type: 'input',
    name: 'props',
    when: function when(answers) {
      return answers.type === 'component';
    },
    filter: function filter(answer) {
      return answer.split(' ').reduce(function (acc, next) {
        next = next.split(':');

        var _next = next,
            _next2 = _slicedToArray(_next, 2),
            name = _next2[0],
            type = _next2[1];

        return acc.concat({
          name: name,
          type: type
        });
      }, []);
    }
  }, {
    message: "List your Markdown page's frontmatter separated by a space, i.e. <prop-name>:<value> <another-prop-name>:<value>",
    type: 'input',
    name: 'frontmatter',
    when: function when(answers) {
      return answers.type === 'markdown';
    },
    filter: function filter(answer) {
      return answer.split(' ').reduce(function (acc, next) {
        next = next.split(':');

        var _next3 = next,
            _next4 = _slicedToArray(_next3, 2),
            name = _next4[0],
            value = _next4[1];

        return acc.concat({
          name: name,
          value: value
        });
      }, []);
    }
  }, {
    message: 'What are we testing?',
    type: 'input',
    name: 'testDescription',
    when: function when(answers) {
      return answers.type === 'test';
    }
  }, {
    message: 'What type of test is this?',
    name: 'testType',
    type: 'list',
    choices: ['Integration/browser', 'Unit/function'],
    when: function when(answers) {
      return answers.type === 'test';
    },
    filter: function filter(answer) {
      switch (answer) {
        case 'Integration/browser':
          return 'integration';

        case 'Unit/function':
          return 'unit';
      }
    }
  }, {
    message: 'List the variables your template will use, separated by spaces, i.e. variable1 variable2 variable3',
    name: 'variables',
    type: 'input',
    when: function when(answers) {
      return answers.type === 'template';
    },
    filter: function filter(answer) {
      return answer.split(' ');
    }
  }]).then(function (answers) {
    callback(answers);
  });
}