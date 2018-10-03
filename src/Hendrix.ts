import { join } from 'path';
import { readdir } from 'fs';
import { promisify } from 'util';
import inquirer, { prompt, Question, Answers } from 'inquirer';
import { render } from 'mustache';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import {
  formatProps,
  logSuccess,
  File,
  templatePrompt,
  outputNamePrompt,
  propsPrompt,
  finishedPrompt
} from './utils';

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
  filesToCreate: Answers[] = [];

  /**
   * Asynchronously initialize prompts and store the data into the class
   * properties for use during `createPages`
   */
  private async prompt() {
    this.filesToCreate.push({
      ...(await prompt(templatePrompt)),
      ...(await prompt(outputNamePrompt)),
      ...(await prompt(propsPrompt))
    });

    const lastPrompt = await prompt(finishedPrompt);

    console.log(lastPrompt);
  }

  /**
   * Creates a new page using the data generated from the prompts
   */
  // private createPage() {
  //   this.templatePath = join(
  //     __dirname,
  //     './templates',
  //     this.answers.template.filename
  //   );

  //   this.templateAsString = readFileSync(this.templatePath, 'utf8');

  //   this.templateRendered = render(this.templateAsString, {
  //     props: formatProps(this.answers.props),
  //     name: this.answers.outputName
  //   });

  //   // optional: nested filename passed when calling hendrix
  //   this.directoryArg = process.argv[2] || '';

  //   // optional: hendrix.baseDirectory in package.json as the starting directory
  //   if (
  //     packageJSON.hasOwnProperty('hendrix') &&
  //     packageJSON.hendrix.hasOwnProperty('baseDirectory')
  //   ) {
  //     this.basePath = packageJSON.hendrix.baseDirectory;
  //   }

  //   this.outputDirectory = join(
  //     process.cwd(),
  //     this.basePath,
  //     this.directoryArg
  //   );

  //   this.outputPath = join(
  //     this.outputDirectory,
  //     `${this.answers.outputName}.${this.answers.template.extension}`
  //   );

  //   const isFinishedAnswer = await prompt(this.finishedPrompt);
  //   if (existsSync(this.outputDirectory)) {
  //     writeFileSync(this.outputPath, this.templateRendered);

  //     return logSuccess(this.answers.template.prettyName, this.outputDirectory);
  //   }

  //   // if the folder doesn't exist, create a new one
  //   mkdirSync(this.outputDirectory);

  //   writeFileSync(this.outputPath, this.templateRendered);

  //   return logSuccess(this.answers.template.prettyName, this.outputDirectory);
  // }

  /**
   * Initializes the program
   */
  public async init() {
    await this.prompt();

    // this.createPage();
  }
}
