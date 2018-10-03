import { join } from 'path';
import { readdir } from 'fs';
import { promisify } from 'util';
import inquirer, { prompt, Question, Answers } from 'inquirer';
import { render } from 'mustache';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { formatFilename, formatProps, logSuccess } from './utils';
import fuzzy from 'fuzzy';

const packageJSON = require(join(process.cwd(), 'package.json'));
const _readdir = promisify(readdir);

inquirer.registerPrompt(
  'autocomplete',
  require('inquirer-autocomplete-prompt')
);

/**
 * @class Hendrix
 * Main program
 */
export default class Hendrix {
  templatePrompt: Answers;
  outputNamePrompt: Question;
  propsPrompt: Question;
  finishedPrompt: Question;
  answers!: Answers;
  templatePath!: string;
  templateAsString!: string;
  templateRendered!: string;
  directoryArg!: string;
  basePath!: string;
  outputDirectory!: string;
  outputPath!: string;

  /**
   * Create prompt questions
   */
  constructor() {
    interface TemplateQuestion {
      name: string;
      value: {
        filename: string;
        prettyName: string;
        content: string;
        extension: string;
      };
    }

    this.templatePrompt = {
      message: 'What are we creating?',
      name: 'template',
      type: 'autocomplete',
      source: async (
        _: any,
        input: string = ''
      ): Promise<TemplateQuestion[]> => {
        const templatesPath = join(__dirname, 'templates');
        const files = await _readdir(templatesPath);
        const prettyFiles = files.map(formatFilename);
        const fuzzyOptions = {
          extract: (file: TemplateQuestion) => file.value.prettyName
        };
        const result = fuzzy
          .filter(input, prettyFiles, fuzzyOptions)
          .map(file => file.original);
        return result;
      }
    };

    this.outputNamePrompt = {
      message: `What are we naming it?`,
      type: 'input',
      name: 'outputName',
      validate: (answer: string): boolean => answer.trim() !== ''
    };

    this.propsPrompt = {
      message: `List your template's key:value pairs separated by a semicolon, i.e. <key>:<value>; <key2>:<value2>;`,
      type: 'input',
      name: 'props'
    };

    this.finishedPrompt = {
      message: 'Create another page?',
      type: 'confirm',
      name: 'isFinished',
      default: false
    };

    this.basePath = '';
  }

  /**
   * Asynchronously initialize prompts and store the data into the class
   * properties for use during `createPages`
   */
  private async prompt() {
    this.answers = {
      ...this.answers,
      ...(await prompt(this.templatePrompt)),
      ...(await prompt(this.outputNamePrompt)),
      ...(await prompt(this.propsPrompt)),
      ...(await prompt(this.finishedPrompt))
    };

    console.log(this.answers);

    this.templatePath = join(
      __dirname,
      './templates',
      this.answers.template.filename
    );

    this.templateAsString = readFileSync(this.templatePath, 'utf8');

    this.templateRendered = render(this.templateAsString, {
      props: formatProps(this.answers.props),
      name: this.answers.outputName
    });

    // optional: nested filename passed when calling hendrix
    this.directoryArg = process.argv[2] || '';

    // optional: hendrix.baseDirectory in package.json as the starting directory
    if (
      packageJSON.hasOwnProperty('hendrix') &&
      packageJSON.hendrix.hasOwnProperty('baseDirectory')
    ) {
      this.basePath = packageJSON.hendrix.baseDirectory;
    }

    this.outputDirectory = join(
      process.cwd(),
      this.basePath,
      this.directoryArg
    );

    this.outputPath = join(
      this.outputDirectory,
      `${this.answers.outputName}.${this.answers.template.extension}`
    );
  }

  /**
   * Creates a new page using the data generated from the prompts
   */
  private createPage() {
    if (existsSync(this.outputDirectory)) {
      writeFileSync(this.outputPath, this.templateRendered);

      return logSuccess(this.answers.template.prettyName, this.outputDirectory);
    }

    // if the folder doesn't exist, create a new one
    mkdirSync(this.outputDirectory);

    writeFileSync(this.outputPath, this.templateRendered);

    return logSuccess(this.answers.template.prettyName, this.outputDirectory);
  }

  /**
   * Initializes the program
   */
  public async init() {
    await this.prompt();

    this.createPage();
  }
}
