#!/usr/bin/env node

import commander from "commander";
import { readdirSync, existsSync, readFileSync, writeFileSync } from "fs";
import mkdirp from "mkdirp";
import { ncp } from "ncp";
import { join } from "path";
import { pipe, map, join as joinStrings, head, split, filter } from "lodash/fp";
import { get } from "lodash";
import chalk from "chalk";
import { render } from "mustache";
import argv from "yargs-parser";

const cliInput = argv(process.argv.slice(2));

const addMargin = (str) => `${str}\n`;

const safeRequire = (filePath, defaultValue = void 0) => {
  try {
    return require(filePath);
  } catch (_error) {
    return defaultValue;
  }
};

const currentWorkingDirectory = process.cwd();

const configPath = join(currentWorkingDirectory, ".hendrixrc.js");

// eslint-disable-next-line
const noop = (): void => {};

const DEFAULT_CONFIG = {
  generatorsPath: "hendrix",
  outputPaths: {},
  renderTemplate: render,
  onPostHelp: noop,
};

const {
  generatorsPath = "hendrix",
  outputPaths = {},
  renderTemplate = render,
  onPostHelp = noop,
} = safeRequire(configPath, DEFAULT_CONFIG);

const prettifyAvailableGenerators = pipe(
  map((generator) => {
    return `  ${generator}`;
  }),
  joinStrings("\n")
);

const getAvailableGenerators = () => {
  const availableGenerators = readdirSync(
    join(currentWorkingDirectory, generatorsPath),
    {
      withFileTypes: true,
    }
  )
    .filter((dirEnt) => dirEnt.isDirectory())
    .map(({ name }) => name);

  const hasAvailableGenerators = availableGenerators.length > 0;

  if (hasAvailableGenerators) {
    return prettifyAvailableGenerators(availableGenerators);
  }

  return "  No available generators";
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

const displayAvailableGenerators = pipe(additionalHelpMessage, console.log);

const formatVariables = pipe(
  head,
  map((variableString) => {
    const [variableName, variableValue] = variableString.split(":");

    return { name: variableName, value: variableValue };
  })
);

const TEMPLATE_EXTENSIONS = [
  "mustache",
  "hbs",
  "handlebars",
  "ejs",
  "pug",
  "haml",
];

const isNotTemplateExtension = (word) => !TEMPLATE_EXTENSIONS.includes(word);

const stripTemplateExtension = pipe(
  split("."),
  filter(isNotTemplateExtension),
  joinStrings(".")
);

const customFileName = ({ templateFileName, fileName }) => {
  const baseFileName = stripTemplateExtension(templateFileName);
  const fileExtension = baseFileName.split(".").slice(1).join(".");

  return [fileName, fileExtension].join(".");
};

const createGeneratorsDirectoryIfDoesNotExist = () => {
  const generatorsDirectoryExists = existsSync(generatorsPath);

  if (generatorsDirectoryExists) {
    return new Promise<void>((resolve) => resolve());
  }

  console.log(
    addMargin(
      chalk.yellow(
        "Templates directory does not exist, creating one for you..."
      )
    )
  );

  const examplesPath = join(__dirname, "../examples-mustache");

  return new Promise<void>((resolve, reject) => {
    return ncp(examplesPath, generatorsPath, (error) => {
      if (error) {
        console.error(error);
        reject(error);
      }

      console.log(
        addMargin(
          chalk.green(
            `Successfully created new templates directory at "${generatorsPath}" with some examples!`
          )
        )
      );

      console.log(
        addMargin(
          chalk.blue(
            // eslint-disable-next-line
            'Run "hendrix" command again to see a list of available generators.'
          )
        )
      );

      return resolve();
    });
  });
};

const generateFiles = ({ template, outputPath, name, variables }) => {
  const templateFilesPath = join(generatorsPath, template);

  createGeneratorsDirectoryIfDoesNotExist()
    .then(() => {
      const templateFiles = readdirSync(templateFilesPath);

      templateFiles.forEach((templateFile) => {
        const templateFilePath = join(templateFilesPath, templateFile);
        const templateContent = readFileSync(templateFilePath, "utf8");

        const renderedTemplate = renderTemplate(templateContent, {
          variables,
          name,
          ...cliInput,
        });

        const baseFileOutputPath = get(outputPaths, template, "");

        const directoryOutputPath = join(
          currentWorkingDirectory,
          baseFileOutputPath,
          outputPath
        );

        mkdirp.sync(directoryOutputPath);

        const fileName = cliInput.fileName
          ? customFileName({
              templateFileName: templateFile,
              fileName: cliInput.fileName,
            })
          : stripTemplateExtension(templateFile);

        const fileOutputPath = join(directoryOutputPath, fileName);

        writeFileSync(fileOutputPath, renderedTemplate);
      });

      console.log(
        chalk.green(`
       ----------------------------------------------------------------
          Successfully generated "${template}" files - happy coding!
       ----------------------------------------------------------------
        `)
      );
    })
    .catch((e) => {
      throw Error(e);
    });
};

const noCommandsEntered = process.argv.slice(2).length === 0;

const cli = new commander.Command();

/**
 * CLI
 */
const main = () => {
  createGeneratorsDirectoryIfDoesNotExist()
    .then(() => {
      const availableGenerators = getAvailableGenerators();

      cli
        .version("2.0.3")
        .usage("<template> <name> <output-path> [variables...]")
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
            generateFiles({
              template,
              outputPath,
              name,
              variables: formatVariables(variables),
            });
          }
        );

      cli.on("--help", () => {
        displayAvailableGenerators(availableGenerators);

        onPostHelp();
      });

      if (noCommandsEntered) {
        cli.outputHelp();
      }

      cli.parse(process.argv);
    })
    .catch((e) => {
      throw Error(e);
    });
};

main();

export default main;
