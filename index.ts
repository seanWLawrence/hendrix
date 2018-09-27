#!/usr/bin/env node

import { join } from 'path';
import { prompt } from 'inquirer';

import { render as template } from 'mustache';
import {
	writeFileSync,
	readFileSync,
	existsSync,
	readdirSync,
	mkdirSync,
} from 'fs';
import { logSuccess } from './src/utils/log';
import { formatFilename, formatProps } from './src/utils/format';
import { Answers } from './src/globals';

export default function createPage(answers: Answers) {
	const {
		outputName,
		template: { filename, extension },
		props,
	} = answers;

	const internalTemplatePath = join(__dirname, './src/templates', filename);

	const templateAsString = readFileSync(internalTemplatePath, 'utf8');

	const fileContent = template(templateAsString, { props, name: outputName });

	const [, , ...args] = process.argv;

	const outputPath: string = join(
		process.cwd(),
		args[0],
		`${outputName}.${extension}`,
	);

	if (existsSync(outputPath)) {
		writeFileSync(outputPath, fileContent);
	} else {
		mkdirSync(join(process.cwd(), args[0]));

		writeFileSync(outputPath, fileContent);
	}

	logSuccess(answers.template.prettyName, outputPath);
}

const getTemplate = {
	message: 'What are we creating?',
	type: 'list',
	name: 'template',
	choices: () => {
		const templatesPath = join(__dirname, './src/templates');
		return readdirSync(templatesPath).map(formatFilename);
	},
};

const getOutputName = {
	message: `What are we naming it?`,
	type: 'input',
	name: 'outputName',
	validate: (answer: string): boolean => answer.trim() !== '',
};

const getVariables = {
	message: `List your template's key:value pairs separated by a semicolon, i.e. <key>:<value>; <key2>:<value2>;`,
	type: 'input',
	name: 'props',
};

async function main() {
	const template: any = await prompt(getTemplate);
	const outputName: any = await prompt(getOutputName);
	const variables: any = await prompt(getVariables);

	createPage({
		...template,
		...outputName,
		props: formatProps(variables.props),
	});
}

main();

console.log('hello, world!');
