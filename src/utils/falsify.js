// @flow

/**
 * Turns empty strings and empty array values into false values
 * For use with controlling what is rendered in the mustache templates
 * Used in the cli.js file as a filter function
 * @summary Falsifies 'truthy' values that don't actually contain values
 * @author Sean W. Lawrence
 * @license MIT
 * @module falsify
 * @function falsify
 * @param {(string | string[])} value - Value to check and format
 * @returns {(string | string[])} - Either the non-empty original value or false
 * @exports falsify
 */
export default function falsify(value: *) {
  switch (value) {
    case '':
    case []:
    case {}:
      return false;
    default:
      return value;
  }
}
