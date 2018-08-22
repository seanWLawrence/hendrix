import Slug from '../slug';

describe.only('Slug', () => {
  /**
   * Array of strings with random cases to test case sensitivity
   * @type {string[]}
   * @const
   */
  const stringsWithDifferentCases = [
    'hello world',
    'Hello World',
    'HELLO WORLD',
    'hELlO WoRlD',
  ];

  /**
   * Array of strings with random punctuation to test that it removes unwanted symbols
   * @type {string[]}
   * @const
   */
  const stringsWithPunctuation = [
    'hello, world?',
    'hello, world!',
    'hello: world',
    'hello; world',
    'hello (world)',
    'hello [world]',
    'hello {world}',
    'hello + world',
    '# hello world',
    '@hello world',
    'hello & world',
    'hello *world*',
    'hello "world"',
    'hello \'world\'',
    'hello world',
    'hello = world',
    'hello | world',
    'hello > world',
    '!!!!$$^%&%^&hello world!@$@%',
  ];

  /**
   * Array of strings with random whitespace to test that it gets trimmed
   * @type {string[]}
   * @const
   */
  const stringsWithWhitespace = [
    '    hello     world      ',
    'hello      world',
    '    hello world',
    'hello world         ',
  ];

  /**
   * Array of strings with reandon hyphens to test that they get formatted
   * @type {string[]}
   * @const
   */
  const stringsWithHyphens = [
    '--hello world',
    'hello - world',
    'hello world--',
    '- hello - w - o - r- ld',
  ];

  /**
   * Loops over an array of test strings and slugifies each string
   * @param {string[]} arrayOfTestStrings - Array of 'un-slugified', raw strings for testing
   * @returns {string[]} - Array of slugified strings
   */
  function loop(arrayOfTestStrings) {
    return arrayOfTestStrings.map((string) => {
      return new Slug(string).slugify();
    });
  }

  /**
   * Creates an array of expected results
   * @param {number} expectedArraySize - Number of entries in the result array
   * @returns {string[]} - Array with the specified amount of 'hello-world' entries
   * @example createExpectedArray(2) // ['hello-world', 'hello-world']
   */
  function expectedResult(expectedArraySize) {
    /**
     * Resulting array that will contain the expected result strings
     * @type {string[]}
     */
    const result = [];

    /**
     * Loops as many times as the expectedArraySize number specifies
     * and adds the expectedString to the array on each iteration
     * @function
     * @returns {undefined} - Purely a side effect for loop
     */
    let index;

    for (index = 0; index < expectedArraySize; index++) {
      result.push('hello-world');
    }

    /**
     * Returns the result array
     */
    return result;
  }

  test('Removes whitespace from ends', () => {
    const result = loop(stringsWithWhitespace);
    const expected = expectedResult(stringsWithWhitespace.length);

    expect(result).toEqual(expected);
  });

  test('Converts all text to lowercase', () => {
    const result = loop(stringsWithDifferentCases);
    const expected = expectedResult(stringsWithDifferentCases.length);

    expect(result).toEqual(expected);
  });

  test('Converts blank spaces inside the string to hyphens', () => {
    const result = loop(stringsWithWhitespace);
    const expected = expectedResult(stringsWithWhitespace.length);

    expect(result).toEqual(expected);
  });

  test('Removes any character that is not a letter or blank space inside the string', () => {
    const result = loop(stringsWithPunctuation);
    const expected = expectedResult(stringsWithPunctuation.length);

    expect(result).toEqual(expected);
  });

  test('Returns a single string', () => {
    const result = new Slug('hello world').slugify();
    const expected = 'hello-world';

    expect(result).toEqual(expected);
    expect(typeof result).toBe('string');
  });

  test('TODO: removes hyphens from inside the string', () => {
    const result = loop(stringsWithHyphens);
    const expected = expectedResult(4);

    expect(result).toEqual(expected);
  });
});
