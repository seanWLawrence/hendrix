"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
var mustache_1 = require("mustache");
var chalk_1 = __importDefault(require("chalk"));
var logs_1 = require("./logs");
var config_1 = require("./config");
function createDirIfNoneExists(directoryToCheck) {
    console.log(chalk_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["{purple Checking if directory exists at ", "}"], ["{purple Checking if directory exists at ", "}"])), directoryToCheck));
    if (!fs_1.existsSync(directoryToCheck)) {
        fs_1.mkdirSync(directoryToCheck, { recursive: true });
        console.log(chalk_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["{green Created directory at ", "}"], ["{green Created directory at ", "}"])), directoryToCheck));
    }
    console.log(chalk_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["{green directory exists at ", "}"], ["{green directory exists at ", "}"])), directoryToCheck));
}
exports.createDirIfNoneExists = createDirIfNoneExists;
function createFiles(filesToCreate) {
    filesToCreate.forEach(createFile);
}
exports.createFiles = createFiles;
/**
 * Creates a new file using the data generated from the prompts
 */
function createFile(file) {
    var _a = file.template, filename = _a.filename, extension = _a.extension, outputName = file.outputName, props = file.props;
    var templatePath = path_1.join(__dirname, './templates', filename);
    var templateAsString = fs_1.readFileSync(templatePath, 'utf8');
    var templateRendered = mustache_1.render(templateAsString, __assign({ name: outputName }, props));
    var baseDirectory = config_1.getConfig().baseDirectory;
    // optional: nested filename passed when calling hendrix
    var directoryArg = process.argv[2] || '';
    var outputDirectory = path_1.join(process.cwd(), baseDirectory, directoryArg);
    var outputPath = path_1.join(outputDirectory, outputName + "." + extension);
    if (fs_1.existsSync(outputDirectory)) {
        fs_1.writeFileSync(outputPath, templateRendered);
        return logs_1.logSuccess(outputName, outputDirectory);
    }
    // if the outputDirectory folder doesn't exist, create a new one
    fs_1.mkdirSync(outputDirectory, { recursive: true });
    fs_1.writeFileSync(outputPath, templateRendered);
    return logs_1.logSuccess(outputName, outputDirectory);
}
exports.createFile = createFile;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zeXN0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvZmlsZS1zeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFDNUIseUJBQXdFO0FBQ3hFLHFDQUFrQztBQUVsQyxnREFBMEI7QUFFMUIsK0JBQW9DO0FBQ3BDLG1DQUFxQztBQUVyQyxTQUFnQixxQkFBcUIsQ0FBQyxnQkFBd0I7SUFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FDUCxlQUFLLGtIQUFBLDBDQUEyQyxFQUFnQixHQUFHLEtBQW5CLGdCQUFnQixFQUNuRSxDQUFDO0lBQ0YsSUFBSSxDQUFDLGVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQy9CLGNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBSyxzR0FBQSw4QkFBK0IsRUFBZ0IsR0FBRyxLQUFuQixnQkFBZ0IsRUFBSSxDQUFDO0tBQ3hFO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFLLHFHQUFBLDZCQUE4QixFQUFnQixHQUFHLEtBQW5CLGdCQUFnQixFQUFJLENBQUM7QUFDeEUsQ0FBQztBQVZELHNEQVVDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLGFBQXdCO0lBQ2hELGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQUZELGtDQUVDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixVQUFVLENBQUMsSUFBYTtJQUVoQyxJQUFBLGtCQUFpQyxFQUFyQixzQkFBUSxFQUFFLHdCQUFTLEVBQy9CLDRCQUFVLEVBQ1Ysa0JBQUssQ0FDQTtJQUVULElBQU0sWUFBWSxHQUFHLFdBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRTlELElBQU0sZ0JBQWdCLEdBQUcsaUJBQVksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFNUQsSUFBTSxnQkFBZ0IsR0FBRyxpQkFBTSxDQUFDLGdCQUFnQixhQUM1QyxJQUFJLEVBQUUsVUFBVSxJQUNiLEtBQUssRUFDVixDQUFDO0lBRUssSUFBQSxrREFBYSxDQUFpQjtJQUV0Qyx3REFBd0Q7SUFDeEQsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFM0MsSUFBTSxlQUFlLEdBQUcsV0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFFekUsSUFBTSxVQUFVLEdBQUcsV0FBSSxDQUFDLGVBQWUsRUFBSyxVQUFVLFNBQUksU0FBVyxDQUFDLENBQUM7SUFFdkUsSUFBSSxlQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDN0Isa0JBQWEsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUU1QyxPQUFPLGlCQUFVLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0tBQ2xEO0lBRUQsZ0VBQWdFO0lBQ2hFLGNBQVMsQ0FBQyxlQUFlLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUVoRCxrQkFBYSxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBRTVDLE9BQU8saUJBQVUsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQXJDRCxnQ0FxQ0MifQ==