// @flow

/**
 * Adds 'data-src' attribute to all images and removes the 'src' attribute.
 * Built to increase performance by using this with Lozad image lazy-loading
 * @param {MarkdownIt} md - MarkdownIt instance
 * @returns {undefined} - Side effects only
 */
function addDataSrc(md: *) {
  /**
   * Remember old renderer, if overriden, or proxy to default renderer.
   * TODO: figure out what this means! This is taken from the example in their docs
   * @param {Array<MarkdownItToken>} tokens - elements in Markdown that MarkdownIt will parse into HTML
   * @param {number} idx - Index of the token array
   * @param {Object} options - options passed into MarkdownIt, such as { html: true }, etc.
   * @param {Object} env - environment sandbox
   * @param {*} self - this value for the MarkdowIt class
   * @returns {MarkdownItRenderer} - MarkdownIt renderer instance
   */
  const defaultRender =
    md.renderer.rules.image ||
    function(tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  /**
   * Sets new rules for the image token parsing.
   * @param {Array<MarkdownItToken>} tokens - elements in Markdown that MarkdownIt will parse into HTML
   * @param {number} idx - Index of the token array
   * @param {Object} options - options passed into MarkdownIt, such as { html: true }, etc.
   * @param {Object} env - environment sandbox
   * @param {*} self - this value for the MarkdowIt class
   * @returns {undefined}
   */
  md.renderer.rules.image = function(tokens, idx, options, env, self) {
    /**
     * Index of the src element
     * @type {number}
     */
    var srcIndex = tokens[idx].attrIndex('src');

    /**
     * Value of src
     * @type {string}
     */
    const srcValue = tokens[idx].attrs[srcIndex][1];

    /**
     * Adds 'data-'src' attribute to the the elements token
     * @function
     */
    tokens[idx].attrPush(['data-src', srcValue]);

    /**
     * Removes the 'src' attribute from the element.
     * This is done so the browser will not try to load the image,
     * and it will instead be loaded with Lozad
     */
    tokens[idx].attrs.splice(srcIndex, 1);

    /**
     * Pass the updated token to the renderer
     */
    return defaultRender(tokens, idx, options, env, self);
  };
}

export default addDataSrc;
