"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cli;

var _inquirer = require("inquirer");

var _falsify = _interopRequireDefault(require("./utils/falsify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function cli(callback) {
  (0, _inquirer.prompt)([{
    message: 'What are we creating?',
    type: 'list',
    name: 'type',
    choices: ['React component', 'Markdown page', 'Mustache template', 'Open source project', 'Test'],
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
    name: 'name',
    validate: function validate(answer) {
      return answer !== '';
    }
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
    },
    filter: function filter(answer) {
      return (0, _falsify.default)(answer);
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

        default:
          return false;
      }
    },
    when: function when(answers) {
      return answers.type === 'component' || answers.type === 'project';
    }
  }, {
    message: 'List your component\'s props and types separated by a space, i.e. <prop-name>:<type> <another-prop-name>:<type>',
    type: 'input',
    name: 'props',
    when: function when(answers) {
      return answers.type === 'component';
    },
    filter: function filter(answer) {
      var result = answer.split(' ').reduce(function (acc, next) {
        var _next$split = next.split(':'),
            _next$split2 = _slicedToArray(_next$split, 2),
            name = _next$split2[0],
            type = _next$split2[1];

        return acc.concat({
          name: name,
          type: type
        });
      }, []);
      return (0, _falsify.default)(result);
    }
  }, {
    message: 'List your Markdown page\'s frontmatter separated by a semicolon, i.e. <prop-name>:<value>; <another-prop-name>:<value>',
    type: 'input',
    name: 'frontmatter',
    when: function when(answers) {
      return answers.type === 'markdown';
    },
    filter: function filter(answer) {
      if (answer === '') {
        return false;
      }

      var result = answer.split(';').reduce(function (acc, next) {
        var _next$split3 = next.split(':'),
            _next$split4 = _slicedToArray(_next$split3, 2),
            name = _next$split4[0],
            value = _next$split4[1];

        name = name.trim();
        value = value.trim();
        return acc.concat({
          name: name,
          value: value
        });
      }, []);
      return result;
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

        default:
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
      var result = answer.split(' ');
      return (0, _falsify.default)(result);
    }
  }]).then(function (answers) {
    console.log(answers);
    callback(answers);
  });
}