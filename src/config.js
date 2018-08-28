/**
 * Creates the configuration object with paths for all of the templates and generators
 * @module config
 * @license MIT
 * @author Sean W. Lawrence
 */

// @flow

import { join } from 'path';

/**
 * @typedef {Object} Config - Configuration object for the generators
 * @property {Object} paths - Paths for all of the templates and generated files to go
 */

/**
 * Function to create the configuration object
 * @function config
 * @param {string} filename - filename to add to the config
 * @returns {Config} - Configuration object
 */
export default function config(filename: string) {
  /**
   * TODO: Replace this static object with a prompt function in a file called setup.js
   */
  return {
    imports: {
      components: join(
        __dirname,
        '..',
        'src/templates/react-component',
        `${filename}.mustache`,
      ),
    },
    exports: {
      components: join(__dirname, '..', 'public', `${filename}.js`),
    },
  };
}
