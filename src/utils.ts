import { readdir, readFileSync } from 'fs';
import { promisify } from 'util';
import { join } from 'path';
import { Answers } from 'inquirer';
import fuzzy, { FilterResult } from 'fuzzy';
import chalk from 'chalk';

const _readdir = promisify(readdir);

/**
 * Logs successful output to console
 * @param type
 * @param outputPath
 */
export function logSuccess(type: string, outputPath: string) {
  console.log(chalk`
  {bold.green New ${type} created} in ${outputPath} 
  {magenta Happy coding!} 
  `);
}

export interface File {
  name: string;
  filename: string;
  content: string;
  extension: string;
}

/**
 * Formats the filename to look pretty in the console, and
 * gathers information from it, like the content, extension and
 * actual filename
 * @param filename
 */
export function getFileInfo(filename: string): File {
  const name = filename
    .split('.')[0]
    .split('-')
    .filter(wordOrCharacter => wordOrCharacter !== '-')
    .map(word => {
      const capitalizedFirstLetter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1, word.length);
      return `${capitalizedFirstLetter}${restOfWord}`;
    })
    .join(' ');

  const templatePath = join(__dirname, 'templates', filename);

  const contentAsBuffer = readFileSync(templatePath);
  const content = contentAsBuffer.toString('utf8');

  const extension = filename.split('.')[1];

  return {
    name,
    filename,
    content,
    extension
  };
}

/**
 * Reduces a prop string to an array of {name:value} objects
 * so they can be looped in the mustache template
 * @param props
 */
export function formatProps(
  props: Answers
): Array<{ name: string; value: string }> {
  return props
    .split(';')
    .filter(Boolean)
    .reduce((acc: Array<{ name: string; value: string }>, next: string) => {
      let [name, value] = next.split(':');
      return [...acc, { name, value }];
    }, []);
}

/**
 * Prompts
 */
export const templatePrompt = {
  message: 'What are we creating?',
  name: 'template',
  type: 'autocomplete',
  source: async (_: Answers, input: string = ''): Promise<File[]> => {
    const templatesPath = join(__dirname, 'templates');
    const files = await _readdir(templatesPath);
    const filesWithInfo = files.map(getFileInfo);
    const fuzzyOptions = {
      extract: (file: any) => file.name
    };

    return fuzzy
      .filter(input, filesWithInfo, fuzzyOptions)
      .map((file: any) => file.original);
  }
};

export const outputNamePrompt = {
  message: `What are we naming it?`,
  type: 'input',
  name: 'outputName',
  validate: (answer: string): boolean => answer.trim() !== ''
};

export const propsPrompt = {
  message: `List your template's key:value pairs separated by a semicolon, i.e. <key>:<value>; <key2>:<value2>;`,
  type: 'input',
  name: 'props'
};

export const finishedPrompt = {
  message: 'Create another file?',
  type: 'confirm',
  name: 'isFinished',
  default: false
};
