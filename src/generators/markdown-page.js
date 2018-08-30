// // @flow

// import { createPage } from './index';
// import config from '../config';

// /**
//  * Generates a new Markdown page
//  * @function generateMarkdownPage
//  * @module generateMarkdownPage
//  * @param {Object} answers - Answers object
//  * @returns {undefined} - Side effects only
//  * @license MIT
//  * @author Sean W. Lawrence
//  */
// export default function generateReactComponent(answers) {
//   /**
//    * Gets the path of the with-flow template from the config
//    * @const
//    * @type {string}
//    */
//   let templatePath = config('markdown').imports.components;

//   /**
//    * Gets the path for the new component file to go
//    */
//   const outputPath = config(answers.name).exports.components;

//   /**
//    * Checks if flow boolean is true, if yes, change path of template
//    * to the 'with-flow' template
//    */
//   if (withFlow === true) {
//     templatePath = config('with-flow').imports.components;
//   }

//   /**
//    * Runs generator
//    */
//   createPage({ answers, templatePath, outputPath });

//   /**
//    * Ends function
//    */
//   return;
// }

export default function generateMarkdownPage({
  name,
  frontmatter,
}: {
  name: string,
  frontmatter: string,
}) {}
