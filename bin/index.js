#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const { render } = require("mustache");
const cowsay = require("cowsay");

const args = process.argv.slice(2);
const currentWorkingDirectory = process.cwd();

const defaultHelpMessage = `
---------- Hendrix ---------

Usage:
  generate <template> <name> [...variables]

--- Assuming you have a template named view that accepts these variables ---

Examples:
    generate view Hello name:string age:number
`;

const needsHelp = args.length < 2 || args.includes("--help");
const configPath = path.join(currentWorkingDirectory, ".hendrixrc.js");

if (needsHelp) {
  try {
    const { helpMessage } = require(configPath);

    return console.log(helpMessage || defaultHelpMessage);
  } catch (e) {
    return console.log(defaultHelpMessage);
  }
}

const [generatorName, name, ...variablesArray] = args;

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

            const relativeOutputPath = outputPaths[generatorName] || "";

            const fullOutputPath = path.join(
              currentWorkingDirectory,
              relativeOutputPath,
              fileNameWithoutMustacheExtension
            );

            const renderedTemplate = render(fileContent, { name, variables });

            fs.writeFile(fullOutputPath, renderedTemplate, (err, _result) => {
              if (err) {
                throw Error(
                  `Failed to write "${fileNameWithoutMustacheExtension}" file`
                );
              }
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
