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
 * Gets the templates path
 * @const
 * @type {string}
 */
const templatesPath = join(__dirname, '..', 'src/templates');

/**
 * Helper to get the import path for the templates with little effort
 * @function getImportPath
 * @param {string} directory - Directory that the template exists
 * @param {string} filename - Name of the file
 * @returns {string} path of the import
 */
function getImportPath(directory, filename) {
  /**
   * Joins the template and file paths into a single string value
   */
  return join(templatesPath, directory, `${filename}.mustache`);
}

/**
 * Helper to get the import path for the templates with little effort
 * @function getExportPath
 * @param {string} directory - Directory that the file will go to
 * @param {string} filename - Name of the file
 * @param {string} extension - Extension of the exported filename
 * @returns {string} path of the export
 */
function getExportPath(
  directory: string,
  filename: string,
  extension: string,
): string {
  /**
   * Joins the template and file paths into a single string value
   */
  return join(__dirname, '..', directory, `${filename}.${extension}`);
}

type Config = {
  imports: {
    components: string,
    pages: string,
    projects: string,
    templates: string,
  },
  exports: {
    components: string,
    pages: string,
    projects: string,
    templates: string,
  },
};

/**
 * Function to create the configuration object
 * @function config
 * @param {string} filename - filename to add to the config
 * @returns {Config} - Configuration object
 */
export default function config(filename: string): Config {
  /**
   * TODO: Replace this static object with a prompt function in a file called setup.js
   */
  return {
    imports: {
      components: getImportPath('components', filename),
      pages: getImportPath('pages', filename),
      projects: getImportPath('projects', filename),
      templates: getImportPath('templates', filename),
      tests: getImportPath('tests', filename),
    },
    exports: {
      components: getExportPath('public/components', filename, 'js'),
      pages: getExportPath('public/pages', filename, 'md'),
      projects: getExportPath('public/projects', filename, 'js'),
      templates: getExportPath('public/templates', filename, 'mustache'),
      tests: getExportPath('public/__tests__', filename, 'spec.js'),
    },
  };
}
