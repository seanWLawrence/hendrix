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

interface Props {
  [propName: string]:
    | Array<{ name: string; value: string }>
    | string[]
    | string;
}

/**
 * Reduces prop string into an array or object based on how they were input
 * @param props
 * @example formatProps('name = Yo') // { name: 'Yo' }
 * @example formatProps('names = Yo, Ye, Ya') // { names: ['Yo', 'Ye', 'Ya'] }
 * @example formatProps('names = first: Yo, middle: Ye, last: Ya') // { names: [{name: 'first', value: 'Yo', {name: 'middle', value: 'Ye'}, {name: 'last', value: 'Ya'] }
 */
export function formatProps(props: string): Props {
  return props
    .split(';')
    .map((prop: string) => prop.trim())
    .filter(Boolean)
    .reduce((acc: {}, next: string) => {
      const [propName, propValue] = next
        .split('=')
        .map((value: string) => value.trim());

      // if value is an array of key:value pairs
      if (propValue.includes(':')) {
        const propValueList = propValue
          .split(',')
          .map((value: string) => value.trim())
          .reduce((acc: { name: string; value: string }[], next: string) => {
            let [name, value] = next
              .split(':')
              .map((value: string) => value.trim());
            return [...acc, { name, value }];
          }, []);

        return { ...acc, ...{ [propName]: propValueList } };
        // if value is an array of single strings
      } else if (propValue.includes(',')) {
        const propValueList = propValue
          .split(',')
          .reduce((acc: string[], next: string) => {
            return [...acc, next];
          }, []);
        return { ...acc, ...{ [propName]: propValueList } };
      }

      // if value is a single string
      return { ...acc, ...{ [propName]: propValue } };
    }, {});
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
  message: `List your template's props`,
  type: 'input',
  name: 'props',
  filter: (input: string) => formatProps(input)
};

export const finishedPrompt = {
  message: 'Create another file?',
  type: 'confirm',
  name: 'createAnotherFile',
  default: false
};
