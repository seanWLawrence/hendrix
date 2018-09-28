// import * as CLI from '../cli';
// import mockFs from 'mock-fs';

// describe('CLI', () => {
// 	const fakeAnswers = {
// 		template: {
// 			prettyName: 'README',
// 			filename: 'REDME.md.mustache',
// 			extension: 'md',
// 			content: '{{name}}',
// 		},
// 		outputName: 'README',
// 		props: [{ name: 'Test', value: 'Test value' }],
// 	};

// 	beforeEach(() =>
// 		mockFs({
// 			hendrix: {
// 				'package.json': 'hello',
// 				src: {
// 					templates: {
// 						'README.md.mustache': 'Test {{name}}',
// 						'yo.md.mustache': 'Test {{name}}',
// 					},
// 				},
// 			},
// 		}));

// 	afterAll(() => {
// 		mockFs.restore();
// 	});

// 	it('reads all templates', () => {});
// 	it('gets outputDirectory from package.json', () => {});
// 	it('creates a new page in the correct directory', () => {});
// 	it('formats props as an array', () => {});
// 	it('formats template filename', () => {});
// 	it('calls the log function on success', () => {
// 		const mockDefault = jest
// 			.spyOn(CLI, 'default')
// 			.mockName('default')
// 		const mockCreatePage = jest.spyOn(CLI, 'createPage');

// 		CLI.default();

// 		expect(mockDefault).toBeCalledTimes(1);
// 		expect(mockCreatePage).toBeCalledTimes(1);
// 	});
// 	it('calls the prompts', () => {});
// });
