#!/usr/bin/env node

import commander from "commander";
import { promisify } from "util";
import fs from "fs";
import mkdirp from "mkdirp";
import { join } from "path";
import { pipe, map, join as joinStrings, head, split, filter } from "lodash/fp";
import { get } from "lodash";
import chalk from "chalk";

/**
 * Utils
 */
const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const mkdir = promisify(mkdirp);

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

const DEFAULT_CONFIG = { templatesPath: "hendrix", outputPaths: {} };

const { templatesPath, outputPaths } = safeRequire(
  configPath,
  () => DEFAULT_CONFIG
);

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

const stripTemplateExtension = pipe(
  split("."),
  filter(word => word !== "mustache"),
  joinStrings(".")
);

const templateDirectory = async ({ template, outputPath }) => {
  const templateFilesPath = join(templatesPath, template);
  const templateFiles = await safeAsync(() => readDir(templateFilesPath));

  templateFiles.forEach(async templateFile => {
    const templateFilePath = join(templateFilesPath, templateFile);
    const templateContent = await readFile(templateFilePath, "utf8");

    const baseFileOutputPath = get(outputPaths, templateFile, "");

    const directoryOutputPath = join(
      currentWorkingDirectory,
      baseFileOutputPath,
      outputPath
    );

    await mkdir(directoryOutputPath);

    const fileOutputPath = join(
      directoryOutputPath,
      stripTemplateExtension(templateFile)
    );

    console.log(fileOutputPath);
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
        templateDirectory({ template, outputPath });
      }
    );

  cli.on("--help", () => {
    displayAvailableGenerators(availableGenerators);
  });

  cli.parse(process.argv);
};

main();
