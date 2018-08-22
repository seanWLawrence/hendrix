// @flow

/**
 * Convert raw header strings from Markdown into URL-friendly,
 * easy to read slugs
 * @summary Slug-maker
 * @author Sean W. Lawrence
 * @license MIT
 * @module slugify
 */

/**
 * Converts the rawSlug string into an array of individual characters,
 * then loops over the array of characters and filters out any character
 * that is not a letter or blank space
 * then joins the characters back together to form a single string,
 * replaces all non letter characters with an empty space,
 * trims the empty space from the beginning and end of the string,
 * and then replaces any empty space inside the string with a hyphen.
 * Whoo!
 * @summary Slugifies the string
 * @param {string} rawSlug - String to slugify
 * @returns {string} - Formatted string
 * @example slugify('Hello, world!') // 'hello-world'
 */
function slugify(rawSlug: string) {
  return [...rawSlug]
    .map((char) => char.toLowerCase())
    .join('')
    .replace(/(\W+)/gi, ' ')
    .trim()
    .replace(/ /g, '-');
}

export default slugify;
