import { readdir, readFileSync } from 'fs';
import { promisify } from 'util';
import { join } from 'path';
import { Answers } from 'inquirer';
import fuzzy from 'fuzzy';
import chalk from 'chalk';

const _readdir = promisify(readdir);

/**
 * Logs successful output to console
 * @param type
 * @param outputPath
 */
export function logSuccess(type: string, outputPath: string): void {
  console.log(chalk`
  {bold.green New ${type} created} in ${outputPath} 
  {magenta Happy coding!} 
  `);
}

export interface FileInfo {
  name: string;
  value: {
    filename: string;
    content: string;
    extension: string;
  };
}

function formatFilename(filename: string): FileInfo {
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

  const extension = filename.split('.')[1];

  const templatePath = join(__dirname, 'templates', filename);

  const content = readFileSync(templatePath).toString('utf8');

  return {
    name,
    value: {
      filename,
      content,
      extension
    }
  };
}

type Props = { name: string; value: string }[];

/**
 * Reduces a prop string to an array of {name:value} objects
 * so they can be looped in the mustache template
 * @param props
 */
export function formatProps(props: Answers): Props {
  return props
    .split(';')
    .filter(Boolean)
    .reduce((acc: Props, next: string) => {
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
    const filesWithInfo = files.map(formatFilename);
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
  name: 'createAnotherFile',
  default: false
};
