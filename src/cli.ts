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
import { logSuccess } from './utils/log';
import { formatFilename, formatProps } from './utils/format';
import { Answers } from './globals';
const packageJSON = require(join(process.cwd(), 'package.json'));

export function createPage(answers: Answers) {
	const {
		outputName,
		template: { filename, extension },
		props,
	} = answers;

	const internalTemplatePath = join(__dirname, './templates', filename);

	const templateAsString = readFileSync(internalTemplatePath, 'utf8');

	const fileContent = template(templateAsString, { props, name: outputName });

	const [, , ...args] = process.argv;

	const baseUrl = packageJSON.hendrix ? packageJSON.hendrix.baseDirectory : '';

	const additionalPath = args[0] || '';

	const outputDirectory: string = join(process.cwd(), baseUrl, additionalPath);

	const outputPath: string = join(
		outputDirectory,
		`${outputName}.${extension}`,
	);

	if (existsSync(outputDirectory)) {
		writeFileSync(outputPath, fileContent);
		return logSuccess(answers.template.prettyName, outputDirectory);
	}

	mkdirSync(outputDirectory);

	writeFileSync(outputPath, fileContent);

	return logSuccess(answers.template.prettyName, outputDirectory);
}

export const getTemplate = {
	message: 'What are we creating?',
	type: 'list',
	name: 'template',
	choices: () => {
		const templatesPath = join(__dirname, './templates');
		return readdirSync(templatesPath).map(formatFilename);
	},
};

export const getOutputName = {
	message: `What are we naming it?`,
	type: 'input',
	name: 'outputName',
	validate: (answer: string): boolean => answer.trim() !== '',
};

export const getVariables = {
	message: `List your template's key:value pairs separated by a semicolon, i.e. <key>:<value>; <key2>:<value2>;`,
	type: 'input',
	name: 'props',
};

export default async function cli() {
	const template: any = await prompt(getTemplate);
	const outputName: any = await prompt(getOutputName);
	const variables: any = await prompt(getVariables);

	createPage({
		...template,
		...outputName,
		props: formatProps(variables.props),
	});
}
