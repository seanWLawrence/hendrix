#!/usr/bin/env node

import commander from "commander";
import { promisify } from "util";
import fs from "fs";
import { join } from "path";
import { pipe, map, join as joinStrings, head } from "lodash/fp";
import chalk from "chalk";

/**
 * Utils
 */
const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const defaultErrorLog = (msg: string): void => console.error(chalk.red(msg));

const safeAsync = async (callback, onError = defaultErrorLog) => {
  try {
    return await callback();
  } catch (error) {
    onError(error);
  }
};

const safeRequire = (filePath, onError: any = defaultErrorLog) => {
  try {
    return require(filePath);
  } catch (error) {
    return onError(error);
  }
};

const currentWorkingDirectory = process.cwd();

const configPath = join(currentWorkingDirectory, ".hendrixrc.js");

const DEFAULT_CONFIG = { templatesPath: "hendrix" };

const { templatesPath } = safeRequire(configPath, () => DEFAULT_CONFIG);

const prettifyAvailableGenerators = pipe(
  map(generator => {
    return `  ${generator}`;
  }),
  joinStrings("\n")
);

const getAvailableGenerators = (availableGenerators: string[]) => {
  const hasAvailableGenerators = availableGenerators.length > 0;

  if (hasAvailableGenerators) {
    return prettifyAvailableGenerators(availableGenerators);
  }

  return "No available generators";
};

const additionalHelpMessage = (availableGenerators: string) => `
Note:
  You can also use the alias 'h' instead of 'hendrix', for example:

  h <template> <name> <output-path> [...variables]

Available generators:
${availableGenerators}

${chalk.underline(
  "For more documentation and examples, visit: https://github.com/seanWLawrence/hendrix#readme"
)}
`;

const displayAvailableGenerators = pipe(
  prettifyAvailableGenerators,
  additionalHelpMessage,
  console.log
);

const formatVariables = pipe(
  head,
  map(variableString => {
    const [variableName, variableValue] = variableString.split(":");

    return { [variableName]: variableValue };
  })
);

const templateDirectory = async (template: string) => {
  const templateFilesPath = join(templatesPath, template);
  const templateFiles = await safeAsync(() => readDir(templateFilesPath));

  templateFiles.forEach(async templateFile => {
    const templateFilePath = join(templateFilesPath, templateFile);
    const templateContent = await readFile(templateFilePath, "utf8");

    console.log(templateContent);
  });
};

const cli = new commander.Command();

/**
 * CLI
 */
const main = async () => {
  const availableGenerators = await safeAsync(() => readDir(templatesPath));

  cli
    .version("1.0.6")
    .description(
      "Generate files from your templates directory. Default: './hendrix'"
    )
    .arguments("<template> <name> <output-path> [variables...]")
    .action(
      (
        template: string,
        name: string,
        outputPath: string,
        ...variables: string[]
      ) => {
        templateDirectory(template);
      }
    );

  cli.on("--help", () => {
    displayAvailableGenerators(availableGenerators);
  });

  cli.parse(process.argv);
};

main();

// const path = require("path");
// const fs = require("fs");
// const { render } = require("mustache");
// const cowsay = require("cowsay");
// const mkdirp = require("mkdirp");

// const createFile = ({
//   outputDirPath,
//   fullOutputPath,
//   renderedTemplate,
//   fileNameWithoutMustacheExtension
// }) => {
//   mkdirp(outputDirPath, err => {
//     if (err) {
//       throw Error(
//         `Couldn't create folder "${outputDirPath}"
//           --------------
//           ${err}`
//       );
//     }

//     fs.writeFile(fullOutputPath, renderedTemplate, (err, _result) => {
//       if (err) {
//         throw Error(
//           `Failed to write "${fileNameWithoutMustacheExtension}" file.
//             --------------
//             ${err}`
//         );
//       }
//     });
//   });
// };

// const readTemplateFile = ({ filePath, fileName, outputPaths }) => {
//   fs.readFile(filePath, "utf8", (err, fileContent) => {
//     if (err) {
//       throw Error(
//         `Failed to read "${fileName}" template
//           --------------
//           ${err}`
//       );
//     }

//     const splitFileName = fileName.split(".");

//     const fileNameWithoutMustacheExtension = splitFileName
//       .filter(name => name !== "mustache")
//       .join(".");

//     const baseOutputPath = path.join(
//       outputPaths[generatorName] || "",
//       relativeOutputPath
//     );

//     const outputDirPath = path.join(currentWorkingDirectory, baseOutputPath);

//     const fullOutputPath = path.join(
//       outputDirPath,
//       fileNameWithoutMustacheExtension
//     );

//     const renderedTemplate = render(fileContent, { name, variables });

//     createFile({
//       outputDirPath,
//       fullOutputPath,
//       renderedTemplate,
//       fileNameWithoutMustacheExtension
//     });
//   });
// };

// const getTemplateFiles = ({
//   files,
//   templatesPath,
//   templateDirectory,
//   outputPaths
// }) => {
//   files.forEach(fileName => {
//     const filePath = path.join(templatesPath, templateDirectory, fileName);

//     readTemplateFile({ outputPaths, filePath, fileName });
//   });
// };

// const getTemplateDirectory = ({
//   templatesPath,
//   templateDirectory,
//   outputPaths
// }) =>
//   fs.readdir(
//     path.join(templatesPath, templateDirectory),
//     "utf8",
//     (err, files) => {
//       if (err) {
//         throw Error(
//           `Failed to read "${templateDirectory}" templates
//             --------------
//             ${err}`
//         );
//       }

//       getTemplateFiles({
//         files,
//         templatesPath,
//         templateDirectory,
//         outputPaths
//       });
//     }
//   );

// const generateFiles = ({ templatesPath, outputPaths }) => {
//   fs.readdir(templatesPath, (err, templateDirectories) => {
//     const [templateDirectory] = templateDirectories.filter(
//       templateDirectory => templateDirectory === generatorName
//     );

//     if (err || !templateDirectory) {
//       throw Error(
//         `Failed to find "${generatorName}" templates in the "${templatesPath}" directory
//           --------------
//           ${err}`
//       );
//     }

//     getTemplateDirectory({ templatesPath, templateDirectory, outputPaths });
//   });

//   console.log(
//     cowsay.say({
//       text: `
//       ---------------------------------------------
//       ----- Generated new "${name}", happy coding! ------
//       ---------------------------------------------
//       `
//     })
//   );
// };

// const defaultConfig = { templatesPath: "hendrix", outputPaths: {} };

// const main = () => {
//   try {
//     const config = {
//       ...defaultConfig,
//       ...require(configPath)
//     };

//     generateFiles(config);
//   } catch (e) {
//     console.log("No custom config, using default...");

//     generateFiles(defaultConfig);
//   }
// };

// main();
