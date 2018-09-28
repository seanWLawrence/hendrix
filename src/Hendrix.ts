import { join } from 'path';
import { prompt, Question, Answers } from 'inquirer';
import { render } from 'mustache';
import {
	writeFileSync,
	readFileSync,
	existsSync,
	readdirSync,
	mkdirSync,
} from 'fs';
import { formatFilename, formatProps, logSuccess } from './utils';
const packageJSON = require(join(process.cwd(), 'package.json'));

/**
 * @class Hendrix
 * Main program
 */
export default class Hendrix {
	templatePrompt: Question;
	outputNamePrompt: Question;
	propsPrompt: Question;
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
		this.templatePrompt = {
			message: 'What are we creating?',
			type: 'list',
			name: 'template',
			choices: () => {
				const templatesPath = join(__dirname, './templates');
				return readdirSync(templatesPath).map(formatFilename);
			},
		};

		this.outputNamePrompt = {
			message: `What are we naming it?`,
			type: 'input',
			name: 'outputName',
			validate: (answer: string): boolean => answer.trim() !== '',
		};

		this.propsPrompt = {
			message: `List your template's key:value pairs separated by a semicolon, i.e. <key>:<value>; <key2>:<value2>;`,
			type: 'input',
			name: 'props',
		};
	}

	/**
	 * Asynchronously initialize prompts and store the data into the class
	 * properties for use during `createPages`
	 */
	private async prompt() {
		this.answers = {
			...(await prompt(this.templatePrompt)),
			...(await prompt(this.outputNamePrompt)),
			...(await prompt(this.propsPrompt)),
		};

		this.templatePath = join(
			__dirname,
			'./templates',
			this.answers.template.filename,
		);

		this.templateAsString = readFileSync(this.templatePath, 'utf8');

		this.templateRendered = render(this.templateAsString, {
			props: formatProps(this.answers.props),
			name: this.answers.outputName,
		});

		// optional: nested filename passed when calling hendrix
		this.directoryArg = process.argv[2] || '';

		// optional: hendrix.baseDirectory in package.json as the starting directory
		this.basePath = packageJSON.hendrix.baseDirectory || '';

		this.outputDirectory = join(
			process.cwd(),
			this.basePath,
			this.directoryArg,
		);

		this.outputPath = join(
			this.outputDirectory,
			`${this.answers.outputName}.${this.answers.template.extension}`,
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
