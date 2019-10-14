#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const fs_1 = require("fs");
const mkdirp_1 = __importDefault(require("mkdirp"));
const ncp_1 = require("ncp");
const path_1 = require("path");
const fp_1 = require("lodash/fp");
const lodash_1 = require("lodash");
const chalk_1 = __importDefault(require("chalk"));
const mustache_1 = require("mustache");
const addMargin = str => `${str}\n`;
const safeRequire = (filePath, defaultValue = void 0) => {
    try {
        return require(filePath);
    }
    catch (_error) {
        return defaultValue;
    }
};
const currentWorkingDirectory = process.cwd();
const configPath = path_1.join(currentWorkingDirectory, ".hendrixrc.js");
const DEFAULT_CONFIG = { templatesPath: "hendrix", outputPaths: {} };
const { templatesPath, outputPaths } = safeRequire(configPath, DEFAULT_CONFIG);
const prettifyAvailableGenerators = fp_1.pipe(fp_1.map(generator => {
    return `  ${generator}`;
}), fp_1.join("\n"));
const getAvailableGenerators = () => {
    const availableGenerators = fs_1.readdirSync(path_1.join(currentWorkingDirectory, templatesPath), {
        withFileTypes: true
    })
        .filter(dirEnt => dirEnt.isDirectory())
        .map(({ name }) => name);
    const hasAvailableGenerators = availableGenerators.length > 0;
    if (hasAvailableGenerators) {
        return prettifyAvailableGenerators(availableGenerators);
    }
    return "  No available generators";
};
const additionalHelpMessage = (availableGenerators) => `
Note:
  You can also use the alias 'h' instead of 'hendrix', for example:

  h <template> <name> <output-path> [...variables]

Available generators:
${availableGenerators}

${chalk_1.default.underline("For more documentation and examples, visit: https://github.com/seanWLawrence/hendrix#readme")}
`;
const displayAvailableGenerators = fp_1.pipe(additionalHelpMessage, console.log);
const formatVariables = fp_1.pipe(fp_1.head, fp_1.map(variableString => {
    const [variableName, variableValue] = variableString.split(":");
    return { [variableName]: variableValue };
}));
const stripTemplateExtension = fp_1.pipe(fp_1.split("."), fp_1.filter(word => word !== "mustache"), fp_1.join("."));
const createTemplatesDirectoryIfDoesNotExist = () => {
    const templatesDirectoryExists = fs_1.existsSync(templatesPath);
    if (templatesDirectoryExists) {
        return new Promise(resolve => resolve());
    }
    console.log(addMargin(chalk_1.default.yellow("Templates directory does not exist, creating one for you...")));
    const examplesPath = path_1.join(__dirname, "../src/examples");
    return new Promise((resolve, reject) => {
        return ncp_1.ncp(examplesPath, templatesPath, error => {
            if (error) {
                console.log(chalk_1.default.red(error.message));
                reject(error);
            }
            console.log(addMargin(chalk_1.default.green(`Successfully created new templates directory at "${templatesPath}" with some examples!`)));
            return resolve("asd");
        });
    });
};
const generateFiles = ({ template, outputPath, name, variables }) => {
    const templateFilesPath = path_1.join(templatesPath, template);
    createTemplatesDirectoryIfDoesNotExist().then(() => {
        const templateFiles = fs_1.readdirSync(templateFilesPath);
        templateFiles.forEach(templateFile => {
            const templateFilePath = path_1.join(templateFilesPath, templateFile);
            const templateContent = fs_1.readFileSync(templateFilePath, "utf8");
            const renderedTemplate = mustache_1.render(templateContent, { variables, name });
            const baseFileOutputPath = lodash_1.get(outputPaths, templateFile, "");
            const directoryOutputPath = path_1.join(currentWorkingDirectory, baseFileOutputPath, outputPath);
            mkdirp_1.default.sync(directoryOutputPath);
            const fileOutputPath = path_1.join(directoryOutputPath, stripTemplateExtension(templateFile));
            fs_1.writeFileSync(fileOutputPath, renderedTemplate);
            console.log(chalk_1.default.green(`
       ----------------------------------------------------------------
          Successfully generated "${template}" files - happy coding!
       ----------------------------------------------------------------
        `));
        });
    });
};
const noCommandsEntered = process.argv.slice(2).length === 0;
const cli = new commander_1.default.Command();
/**
 * CLI
 */
const main = () => {
    createTemplatesDirectoryIfDoesNotExist().then(() => {
        const availableGenerators = getAvailableGenerators();
        cli
            .version("1.0.6")
            .usage("<template> <name> <output-path> [variables...]")
            .description("Generate files from your templates directory. Default: './hendrix'")
            .arguments("<template> <name> <output-path> [variables...]")
            .action((template, name, outputPath, ...variables) => {
            generateFiles({
                template,
                outputPath,
                name,
                variables: formatVariables(variables)
            });
        });
        cli.on("--help", () => {
            displayAvailableGenerators(availableGenerators);
        });
        if (noCommandsEntered) {
            cli.outputHelp();
        }
        cli.parse(process.argv);
    });
};
main();
exports.default = main;
//# sourceMappingURL=index.js.map