import { join } from 'path';
import inquirer, { prompt, Answers } from 'inquirer';
import { render } from 'mustache';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import {
  logSuccess,
  templatePrompt,
  outputNamePrompt,
  propsPrompt,
  finishedPrompt
} from './utils';

const packageJSON = require(join(process.cwd(), 'package.json'));

// add autocomplete prompt type
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
   * propertiy `filesToCreate` for use during the `createFiles` method
   */
  private async prompt(): Promise<void> {
    this.filesToCreate.push({
      ...(await prompt(templatePrompt)),
      ...(await prompt(outputNamePrompt)),
      ...(await prompt(propsPrompt))
    });

    const { createAnotherFile }: Answers = await prompt(finishedPrompt);

    /**
     * Keeps running the prompt method until user
     * says that they don't want to create any more files
     */
    if (createAnotherFile === true) {
      return this.prompt();
    }
  }

  private createFiles() {
    this.filesToCreate.forEach(this.createFile);
  }

  /**
   * Creates a new file using the data generated from the prompts
   */
  private createFile(file: Answers) {
    const {
      template: { filename, extension, name },
      outputName,
      props
    } = file;

    const templatePath = join(__dirname, './templates', filename);

    const templateAsString = readFileSync(templatePath, 'utf8');

    const templateRendered = render(templateAsString, {
      name: outputName,
      ...props
    });

    // optional: nested filename passed when calling hendrix
    const directoryArg = process.argv[2] || '';

    let basePath = '';

    // optional: hendrix.baseDirectory in package.json as the starting directory
    if (
      packageJSON.hasOwnProperty('hendrix') &&
      packageJSON.hendrix.hasOwnProperty('baseDirectory')
    ) {
      basePath = packageJSON.hendrix.baseDirectory;
    }

    const outputDirectory = join(process.cwd(), basePath, directoryArg);

    const outputPath = join(outputDirectory, `${outputName}.${extension}`);

    if (existsSync(outputDirectory)) {
      writeFileSync(outputPath, templateRendered);

      return logSuccess(outputName, outputDirectory);
    }

    // if the folder doesn't exist, create a new one
    mkdirSync(outputDirectory);

    writeFileSync(outputPath, templateRendered);

    return logSuccess(outputName, outputDirectory);
  }

  /**
   * Initializes the program
   */
  public async init() {
    await this.prompt();

    this.createFiles();
  }
}
