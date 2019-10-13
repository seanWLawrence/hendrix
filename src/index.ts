#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const { render } = require("mustache");
const cowsay = require("cowsay");
const mkdirp = require("mkdirp");

const args = process.argv.slice(2);
const currentWorkingDirectory = process.cwd();

const helpMessageTemplate = availableGenerators => `
Usage:
  hendrix <template> <name> <output-path> [...variables]

Note:
  You can also use the alias 'h' instead of 'hendrix', for example:

  h <template> <name> <output-path> [...variables]

Available generators:
${availableGenerators}

Example (assuming we have a template called 'view' in our templates folder):

  hendrix view Person src/components/person age:number

  Generates a new file at "src/views/person/index.js" with
  the object {variables: [{name: 'age', value: 'number'}]}
  passed to the 'view' template

For more documentation and examples, visit: https://github.com/seanWLawrence/hendrix#readme
`;

const defaultHelpMessage = (generators = []) => {
  const hasGenerators = generators.length > 0;
  const availableGenerators = hasGenerators
    ? generators.map(g => `  ${g}`).join("\n")
    : "No templates found in templates path";

  return helpMessageTemplate(availableGenerators);
};

const needsHelp = args.length < 3 || args.includes("--help");
const configPath = path.join(currentWorkingDirectory, ".hendrixrc.js");

if (needsHelp) {
  try {
    const { helpMessage, templatesPath = "hendrix" } = require(configPath);

    return fs.readdir(
      path.join(currentWorkingDirectory, templatesPath),
      (err, generators) => {
        if (err) {
          throw Error(
            `No templates directory found. 
            ---------------
            ${err.stack}`
          );
        }
        return console.log(helpMessage || defaultHelpMessage(generators));
      }
    );
  } catch (e) {
    throw Error(
      `No templates directory found. 
        ---------------
        ${err.stack}`
    );
  }
  return console.log(defaultHelpMessage);
}

const [generatorName, name, relativeOutputPath, ...variablesArray] = args;

const variables = variablesArray.map(variable => {
  const [name, value] = variable.split(":");
  return { name, value };
});

const createFile = ({
  outputDirPath,
  fullOutputPath,
  renderedTemplate,
  fileNameWithoutMustacheExtension
}) => {
  mkdirp(outputDirPath, err => {
    if (err) {
      throw Error(
        `Couldn't create folder "${outputDirPath}"
          --------------
          ${err}`
      );
    }

    fs.writeFile(fullOutputPath, renderedTemplate, (err, _result) => {
      if (err) {
        throw Error(
          `Failed to write "${fileNameWithoutMustacheExtension}" file. 
            --------------
            ${err}`
        );
      }
    });
  });
};

const readTemplateFile = ({ filePath, fileName, outputPaths }) => {
  fs.readFile(filePath, "utf8", (err, fileContent) => {
    if (err) {
      throw Error(
        `Failed to read "${fileName}" template
          --------------
          ${err}`
      );
    }

    const splitFileName = fileName.split(".");

    const fileNameWithoutMustacheExtension = splitFileName
      .filter(name => name !== "mustache")
      .join(".");

    const baseOutputPath = path.join(
      outputPaths[generatorName] || "",
      relativeOutputPath
    );

    const outputDirPath = path.join(currentWorkingDirectory, baseOutputPath);

    const fullOutputPath = path.join(
      outputDirPath,
      fileNameWithoutMustacheExtension
    );

    const renderedTemplate = render(fileContent, { name, variables });

    createFile({
      outputDirPath,
      fullOutputPath,
      renderedTemplate,
      fileNameWithoutMustacheExtension
    });
  });
};

const getTemplateFiles = ({
  files,
  templatesPath,
  templateDirectory,
  outputPaths
}) => {
  files.forEach(fileName => {
    const filePath = path.join(templatesPath, templateDirectory, fileName);

    readTemplateFile({ outputPaths, filePath, fileName });
  });
};

const getTemplateDirectory = ({
  templatesPath,
  templateDirectory,
  outputPaths
}) =>
  fs.readdir(
    path.join(templatesPath, templateDirectory),
    "utf8",
    (err, files) => {
      if (err) {
        throw Error(
          `Failed to read "${templateDirectory}" templates
            --------------
            ${err}`
        );
      }

      getTemplateFiles({
        files,
        templatesPath,
        templateDirectory,
        outputPaths
      });
    }
  );

const generateFiles = ({ templatesPath, outputPaths }) => {
  fs.readdir(templatesPath, (err, templateDirectories) => {
    const [templateDirectory] = templateDirectories.filter(
      templateDirectory => templateDirectory === generatorName
    );

    if (err || !templateDirectory) {
      throw Error(
        `Failed to find "${generatorName}" templates in the "${templatesPath}" directory
          --------------
          ${err}`
      );
    }

    getTemplateDirectory({ templatesPath, templateDirectory, outputPaths });
  });

  console.log(
    cowsay.say({
      text: `
      ---------------------------------------------
      ----- Generated new "${name}", happy coding! ------
      ---------------------------------------------
      `
    })
  );
};

const defaultConfig = { templatesPath: "hendrix", outputPaths: {} };

const main = () => {
  try {
    const config = {
      ...defaultConfig,
      ...require(configPath)
    };

    generateFiles(config);
  } catch (e) {
    console.log("No custom config, using default...");

    generateFiles(defaultConfig);
  }
};

main();
