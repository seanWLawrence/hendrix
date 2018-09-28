import { readFileSync } from 'fs';
import { join } from 'path';
import { Answers } from 'inquirer';
import chalk from 'chalk';

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

/**
 * Formats the filename to look pretty in the console, and
 * gathers information from it, like the content, extension and
 * actual filename
 * @param filename
 */
export function formatFilename(filename: string) {
	const prettyName = filename
		.split('.')[0]
		.split('-')
		.filter((wordOrCharacter) => wordOrCharacter !== '-')
		.map((word) => {
			const capitalizedFirstLetter = word.charAt(0).toUpperCase();
			const restOfWord = word.slice(1, word.length);
			return `${capitalizedFirstLetter}${restOfWord}`;
		})
		.join(' ');

	const templatePath = join(__dirname, 'templates', filename);

	const content = readFileSync(templatePath).toString('utf8');

	const extension = filename.split('.')[1];

	return {
		name: prettyName,
		value: {
			filename,
			prettyName,
			content,
			extension,
		},
	};
}

/**
 * Reduces a prop string to an array of {name:value} objects
 * so they can be looped in the mustache template
 * @param props
 */
export function formatProps(
	props: Answers,
): Array<{ name: string; value: string }> {
	return props
		.split(';')
		.filter(Boolean)
		.reduce((acc: Array<{ name: string; value: string }>, next: string) => {
			let [name, value] = next.split(':');
			return [...acc, { name, value }];
		}, []);
}
