import { readFileSync } from 'fs';
import { join } from 'path';

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

	const templatePath = join(__dirname, '..', 'templates', filename);

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

export function formatProps(
	props: string,
): Array<{ name: string; value: string }> {
	return props
		.split(';')
		.filter(Boolean)
		.reduce((acc: Array<{ name: string; value: string }>, next: string) => {
			let [name, value] = next.split(':');
			return [...acc, { name, value }];
		}, []);
}
