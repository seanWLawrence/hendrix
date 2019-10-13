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
const path_1 = require("path");
const fp_1 = require("lodash/fp");
const chalk_1 = __importDefault(require("chalk"));
const readDir = util_1.promisify(fs_1.default.readdir);
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
const cli = new commander_1.default.Command();
const currentWorkingDirectory = process.cwd();
const configPath = path_1.join(currentWorkingDirectory, ".hendrixrc.js");
const DEFAULT_CONFIG = { templatesPath: "hendrix" };
const { templatesPath } = safeRequire(configPath, () => DEFAULT_CONFIG);
const prettifyAvailableGenerators = (availableGenerators) => {
    const hasAvailableGenerators = availableGenerators.length > 0;
    if (hasAvailableGenerators) {
        return availableGenerators
            .map(generator => {
            return `  ${generator}`;
        })
            .join("\n");
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
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const availableGenerators = yield safeAsync(() => readDir(templatesPath));
    cli
        .version("1.0.6")
        .description("Generate files from your templates directory. Default: './hendrix'")
        .arguments("<template> <output-path> [variables...]")
        .action((template, outputPath, ...variables) => { });
    cli.on("--help", () => {
        console.log(fp_1.pipe(prettifyAvailableGenerators, additionalHelpMessage)(availableGenerators));
    });
    cli.parse(process.argv);
});
main();
// const path = require("path");
// const fs = require("fs");
// const { render } = require("mustache");
// const cowsay = require("cowsay");
// const mkdirp = require("mkdirp");
// const args = process.argv.slice(2);
// const helpMessageTemplate = (availableGenerators: string) => `;
// Usage:
//   hendrix <template> <name> <output-path> [...variables]
// const defaultHelpMessage = (generators: string[] = []) => {
//   const hasGenerators = generators.length > 0;
//   const availableGenerators = hasGenerators
//     ? generators.map(g => `  ${g}`).join("\n")
//     : "No templates found in templates path";
//   return helpMessageTemplate(availableGenerators);
// };
// const needsHelp = args.length < 3 || args.includes("--help");
// const configPath = path.join(currentWorkingDirectory, ".hendrixrc.js");
// const displayHelpIfNeeded = () => {
//   if (needsHelp) {
//     try {
//       const { helpMessage, templatesPath = "hendrix" } = require(configPath);
//       return fs.readdir(
//         path.join(currentWorkingDirectory, templatesPath),
//         (err, generators) => {
//           if (err) {
//             throw Error(
//               `No templates directory found.
//             ---------------
//             ${err.stack}`
//             );
//           }
//           return console.log(helpMessage || defaultHelpMessage(generators));
//         }
//       );
//     } catch (err) {
//       throw Error(
//         `No templates directory found.
//         ---------------
//         ${err.stack}`
//       );
//     }
//     return console.log(defaultHelpMessage);
//   }
// };
// displayHelpIfNeeded();
// // @ts-ignore
// const [generatorName, name, relativeOutputPath, ...variablesArray] = args;
// const variables = variablesArray.map(variable => {
//   const [name, value] = variable.split(":");
//   return { name, value };
// });
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
//# sourceMappingURL=index.js.map