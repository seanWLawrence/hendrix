#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const mkdirp_1 = __importDefault(require("mkdirp"));
const path_1 = require("path");
const fp_1 = require("lodash/fp");
const lodash_1 = require("lodash");
const chalk_1 = __importDefault(require("chalk"));
const mustache_1 = require("mustache");
/**
 * Utils
 */
const readDir = util_1.promisify(fs_1.default.readdir);
const readFile = util_1.promisify(fs_1.default.readFile);
const writeFile = util_1.promisify(fs_1.default.writeFile);
const mkdir = util_1.promisify(mkdirp_1.default);
const defaultErrorLog = (msg) => console.error(chalk_1.default.red(msg));
const safeAsync = (callback, onError = defaultErrorLog) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield callback();
    }
    catch (error) {
        onError(error);
    }
});
const safeRequire = (filePath, onError = defaultErrorLog) => {
    try {
        return require(filePath);
    }
    catch (error) {
        return onError(error);
    }
};
const currentWorkingDirectory = process.cwd();
const configPath = path_1.join(currentWorkingDirectory, ".hendrixrc.js");
const DEFAULT_CONFIG = { templatesPath: "hendrix", outputPaths: {} };
const { templatesPath, outputPaths } = safeRequire(configPath, () => DEFAULT_CONFIG);
const prettifyAvailableGenerators = fp_1.pipe(fp_1.map(generator => {
    return `  ${generator}`;
}), fp_1.join("\n"));
const getAvailableGenerators = (availableGenerators) => {
    const hasAvailableGenerators = availableGenerators.length > 0;
    if (hasAvailableGenerators) {
        return prettifyAvailableGenerators(availableGenerators);
    }
    return "No available generators";
};
const additionalHelpMessage = (availableGenerators) => `
Note:
  You can also use the alias 'h' instead of 'hendrix', for example:

  h <template> <name> <output-path> [...variables]

Available generators:
${availableGenerators}

${chalk_1.default.underline("For more documentation and examples, visit: https://github.com/seanWLawrence/hendrix#readme")}
`;
const displayAvailableGenerators = fp_1.pipe(prettifyAvailableGenerators, additionalHelpMessage, console.log);
const formatVariables = fp_1.pipe(fp_1.head, fp_1.map(variableString => {
    const [variableName, variableValue] = variableString.split(":");
    return { [variableName]: variableValue };
}));
const stripTemplateExtension = fp_1.pipe(fp_1.split("."), fp_1.filter(word => word !== "mustache"), fp_1.join("."));
const templateDirectory = ({ template, outputPath, name, variables }) => __awaiter(void 0, void 0, void 0, function* () {
    const templateFilesPath = path_1.join(templatesPath, template);
    const templateFiles = yield safeAsync(() => readDir(templateFilesPath));
    templateFiles.forEach((templateFile) => __awaiter(void 0, void 0, void 0, function* () {
        const templateFilePath = path_1.join(templateFilesPath, templateFile);
        const templateContent = yield readFile(templateFilePath, "utf8");
        const renderedTemplate = mustache_1.render(templateContent, { variables, name });
        const baseFileOutputPath = lodash_1.get(outputPaths, templateFile, "");
        const directoryOutputPath = path_1.join(currentWorkingDirectory, baseFileOutputPath, outputPath);
        yield safeAsync(() => mkdir(directoryOutputPath));
        const fileOutputPath = path_1.join(directoryOutputPath, stripTemplateExtension(templateFile));
        safeAsync(() => writeFile(fileOutputPath, renderedTemplate));
    }));
});
const cli = new commander_1.default.Command();
/**
 * CLI
 */
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const availableGenerators = yield safeAsync(() => readDir(templatesPath));
    cli
        .version("1.0.6")
        .description("Generate files from your templates directory. Default: './hendrix'")
        .arguments("<template> <name> <output-path> [variables...]")
        .action((template, name, outputPath, ...variables) => {
        templateDirectory({
            template,
            outputPath,
            name,
            variables: formatVariables(variables)
        });
    });
    cli.on("--help", () => {
        displayAvailableGenerators(availableGenerators);
    });
    cli.parse(process.argv);
});
main();
//# sourceMappingURL=index.js.map