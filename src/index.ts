#!/usr/bin/env node

import commander from "commander";
import { promisify } from "util";
import fs from "fs";
import mkdirp from "mkdirp";
import { ncp } from "ncp";
import { join } from "path";
import { pipe, map, join as joinStrings, head, split, filter } from "lodash/fp";
import { get } from "lodash";
import chalk from "chalk";
import { render } from "mustache";

/**
 * Utils
 */
const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const exists = promisify(fs.exists);
const mkdir = promisify(mkdirp);

const addMargin = str => `${str}\n`;

const safeAsync = async (
  callback,
  { shouldThrowError } = { shouldThrowError: false }
) => {
  try {
    return await callback();
  } catch (error) {
    if (shouldThrowError) {
      throw Error(error);
    }

    console.error(chalk.red(error));
  }
};

const safeRequire = (filePath, defaultValue = void 0) => {
  try {
    return require(filePath);
  } catch (_error) {
    return defaultValue;
  }
};

const currentWorkingDirectory = process.cwd();

const configPath = join(currentWorkingDirectory, ".hendrixrc.js");

const DEFAULT_CONFIG = { templatesPath: "hendrix", outputPaths: {} };

const { templatesPath, outputPaths } = safeRequire(configPath, DEFAULT_CONFIG);

const prettifyAvailableGenerators = pipe(
  map(generator => {
    return `  ${generator}`;
  }),
  joinStrings("\n")
);

const getAvailableGenerators = async () => {
  const availableGenerators = await safeAsync(async () => {
    const files = await readDir(templatesPath, { withFileTypes: true });
    const generatorDirectoryNames = files
      .filter(dirEnt => dirEnt.isDirectory())
      .map(({ name }) => name);

    return generatorDirectoryNames;
  });

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

const displayAvailableGenerators = pipe(
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

const createTemplatesDirectoryIfDoesNotExist = async () => {
  const templatesDirectoryExists = await safeAsync(() => exists(templatesPath));

  if (!templatesDirectoryExists) {
    console.log(
      addMargin(
        chalk.yellow(
          "Templates directory does not exist, creating default one..."
        )
      )
    );

    const examplesPath = join(__dirname, "../src/examples");

    await safeAsync(() =>
      ncp(examplesPath, templatesPath, err => console.log(err))
    );

    console.log(
      addMargin(
        chalk.green(
          `Successfully created new templates directory with some examples at "${templatesPath}"`
        )
      )
    );
  }
};

const generateFiles = async ({ template, outputPath, name, variables }) => {
  const templateFilesPath = join(templatesPath, template);

  await createTemplatesDirectoryIfDoesNotExist();

  const templateFiles = await safeAsync(() => readDir(templateFilesPath));

  templateFiles.forEach(async templateFile => {
    const templateFilePath = join(templateFilesPath, templateFile);
    const templateContent = await readFile(templateFilePath, "utf8");

    const renderedTemplate = render(templateContent, { variables, name });

    const baseFileOutputPath = get(outputPaths, templateFile, "");

    const directoryOutputPath = join(
      currentWorkingDirectory,
      baseFileOutputPath,
      outputPath
    );

    await safeAsync(() => mkdir(directoryOutputPath));

    const fileOutputPath = join(
      directoryOutputPath,
      stripTemplateExtension(templateFile)
    );

    await safeAsync(() => writeFile(fileOutputPath, renderedTemplate));

    console.log(
      chalk.green(`
       ----------------------------------------------------------------
          Successfully generated "${template}" files - happy coding!
       ----------------------------------------------------------------
        `)
    );
  });
};

const noCommandsEntered = process.argv.slice(2).length === 0;

const cli = new commander.Command();

/**
 * CLI
 */
const main = async () => {
  await createTemplatesDirectoryIfDoesNotExist();

  const availableGenerators = await getAvailableGenerators();

  cli
    .version("1.0.6")
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
          variables: formatVariables(variables)
        });
      }
    );

  cli.on("--help", () => {
    displayAvailableGenerators(availableGenerators);
  });

  if (noCommandsEntered) {
    cli.outputHelp();
  }

  cli.parse(process.argv);
};

main();

export default main;
