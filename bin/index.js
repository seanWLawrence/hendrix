#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const { render } = require("mustache");
const cowsay = require("cowsay");
const mkdirp = require("mkdirp");

const args = process.argv.slice(2);
const currentWorkingDirectory = process.cwd();

const defaultHelpMessage = `
---------- Hendrix ---------

Usage:
hendrix <template> <name> <output-path> [...variables]

Examples:
  - Assuming the following for this example:
    - We have a template directory called "view"
    - In this directory is a file named "index.js.mustache" that accepts a variable "age" of type "number"

  generate view Person src/components/person age:number

  # Generates a new file at "src/views/person/index.js" 

  For more documentation and examples, visit: https://github.com/seanWLawrence/hendrix#readme
`;

const needsHelp = args.length < 3 || args.includes("--help");
const configPath = path.join(currentWorkingDirectory, ".hendrixrc.js");

if (needsHelp) {
  try {
    const { helpMessage } = require(configPath);

    return console.log(helpMessage || defaultHelpMessage);
  } catch (e) {
    return console.log(defaultHelpMessage);
  }
}

const [generatorName, name, relativeOutputPath, ...variablesArray] = args;

const variables = variablesArray.map(variable => {
  const [name, value] = variable.split(":");
  return { name, value };
});

const generateFiles = ({ templatesPath, outputPaths = {} }) => {
  fs.readdir(templatesPath, (err, templateDirectories) => {
    const [templateDirectory] = templateDirectories.filter(
      templateDirectory => templateDirectory === generatorName
    );

    if (err || !templateDirectory) {
      throw Error(
        `Failed to find "${generatorName}" templates in the "${templatesPath}" directory`
      );
    }

    fs.readdir(
      path.join(templatesPath, templateDirectory),
      "utf8",
      (err, files) => {
        if (err) {
          throw Error(`Failed to read "${templateDirectory}" templates`);
        }

        files.forEach(fileName => {
          const filePath = path.join(
            templatesPath,
            templateDirectory,
            fileName
          );

          fs.readFile(filePath, "utf8", (err, fileContent) => {
            if (err) {
              throw Error(`Failed to read "${fileName}" template`);
            }

            const splitFileName = fileName.split(".");

            const fileNameWithoutMustacheExtension = splitFileName
              .filter(name => name !== "mustache")
              .join(".");

            const baseOutputPath = path.join(
              outputPaths[generatorName] || "",
              relativeOutputPath
            );

            const outputDirPath = path.join(
              currentWorkingDirectory,
              baseOutputPath
            );

            const fullOutputPath = path.join(
              outputDirPath,
              fileNameWithoutMustacheExtension
            );

            const renderedTemplate = render(fileContent, { name, variables });

            mkdirp(outputDirPath, err => {
              if (err) {
                throw Error(`Couldn't create folder "${outputDirPath}"`);
              }

              fs.writeFile(fullOutputPath, renderedTemplate, (err, _result) => {
                if (err) {
                  throw Error(
                    `Failed to write "${fileNameWithoutMustacheExtension}" file`
                  );
                }
              });
            });
          });
        });
      }
    );
  });

  console.log(
    cowsay.say({
      text: `
      ---------------------------------------------
      ----- Generated ${name}, happy coding! ------
      ---------------------------------------------
      `
    })
  );
};

const defaultConfig = { templatesPath: "hendrix" };

const main = () => {
  try {
    const config = {
      ...defaultConfig,
      ...require(configPath)
    };

    generateFiles(config);
  } catch (e) {
    console.log("No custom config, using default...", e);

    generateFiles(defaultConfig);
  }
};

main();
