// @flow

import chalk from 'chalk';

/**
 * Notifies the user that the new component was created
 * @module log
 * @exports logSuccess
 * @param {string} type - Type of page that will be rendered
 * @param {string} outputPath - Path of the newly created component
 * @returns {undefined} - Side effects only
 * @license MIT
 * @author Sean W. Lawrence
 */
export function logSuccess(type: string, outputPath: string) {
  // eslint-disable-next-line no-console
  console.log(chalk`
  {bold.green New ${type} created} in ${outputPath} 
  {magenta Happy coding!} 
  `);

  /**
   * Ends the function
   */
  return;
}
