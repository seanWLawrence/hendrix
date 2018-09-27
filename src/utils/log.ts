import chalk from 'chalk';

export function logSuccess(type: string, outputPath: string) {
	console.log(chalk`
  {bold.green New ${type} created} in ${outputPath} 
  {magenta Happy coding!} 
  `);
}
