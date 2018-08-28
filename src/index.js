// @flow

/**
 * Main program
 * @author Sean W. Lawrence
 * @license MIT
 */

import cli from './cli';
import controller from './controller';
/**
 * Main program
 * @param {Function} callback - Callback function to call with the values
 * @returns {undefined} - Side effects only
 */
function main() {
  /**
   * Calls the cli prompt to gather data, and then runs
   * the controller switch statement to decide which generator to use and run
   * the generator
   */
  cli(controller);
}

/**
 * Initialize main program
 */
main();
