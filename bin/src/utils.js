"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var util_1 = require("util");
var path_1 = require("path");
var fuzzy_1 = __importDefault(require("fuzzy"));
var chalk_1 = __importDefault(require("chalk"));
var _readdir = util_1.promisify(fs_1.readdir);
/**
 * Logs successful output to console
 * @param type
 * @param outputPath
 */
function logSuccess(type, outputPath) {
    console.log(chalk_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  {bold.green New ", " created} in ", " \n  {magenta Happy coding!} \n  "], ["\n  {bold.green New ", " created} in ", " \n  {magenta Happy coding!} \n  "])), type, outputPath));
}
exports.logSuccess = logSuccess;
/**
 * Formats the filename to look pretty in the console, and
 * gathers information from it, like the content, extension and
 * actual filename
 * @param filename
 */
function getFileInfo(filename) {
    var name = filename
        .split('.')[0]
        .split('-')
        .filter(function (wordOrCharacter) { return wordOrCharacter !== '-'; })
        .map(function (word) {
        var capitalizedFirstLetter = word.charAt(0).toUpperCase();
        var restOfWord = word.slice(1, word.length);
        return "" + capitalizedFirstLetter + restOfWord;
    })
        .join(' ');
    var templatePath = path_1.join(__dirname, 'templates', filename);
    var contentAsBuffer = fs_1.readFileSync(templatePath);
    var content = contentAsBuffer.toString('utf8');
    var extension = filename.split('.')[1];
    return {
        name: name,
        filename: filename,
        content: content,
        extension: extension
    };
}
exports.getFileInfo = getFileInfo;
/**
 * Reduces a prop string to an array of {name:value} objects
 * so they can be looped in the mustache template
 * @param props
 */
function formatProps(props) {
    return props
        .split(';')
        .filter(Boolean)
        .reduce(function (acc, next) {
        var _a = next.split(':'), name = _a[0], value = _a[1];
        return acc.concat([{ name: name, value: value }]);
    }, []);
}
exports.formatProps = formatProps;
/**
 * Prompts
 */
exports.templatePrompt = {
    message: 'What are we creating?',
    name: 'template',
    type: 'autocomplete',
    source: function (_, input) {
        if (input === void 0) { input = ''; }
        return __awaiter(_this, void 0, void 0, function () {
            var templatesPath, files, filesWithInfo, fuzzyOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        templatesPath = path_1.join(__dirname, 'templates');
                        return [4 /*yield*/, _readdir(templatesPath)];
                    case 1:
                        files = _a.sent();
                        filesWithInfo = files.map(getFileInfo);
                        fuzzyOptions = {
                            extract: function (file) { return file.name; }
                        };
                        return [2 /*return*/, fuzzy_1.default
                                .filter(input, filesWithInfo, fuzzyOptions)
                                .map(function (file) { return file.original; })];
                }
            });
        });
    }
};
exports.outputNamePrompt = {
    message: "What are we naming it?",
    type: 'input',
    name: 'outputName',
    validate: function (answer) { return answer.trim() !== ''; }
};
exports.propsPrompt = {
    message: "List your template's key:value pairs separated by a semicolon, i.e. <key>:<value>; <key2>:<value2>;",
    type: 'input',
    name: 'props'
};
exports.finishedPrompt = {
    message: 'Create another file?',
    type: 'confirm',
    name: 'isFinished',
    default: false
};
var templateObject_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQXNIQTs7QUF0SEEseUJBQTJDO0FBQzNDLDZCQUFpQztBQUNqQyw2QkFBNEI7QUFFNUIsZ0RBQTRDO0FBQzVDLGdEQUEwQjtBQUUxQixJQUFNLFFBQVEsR0FBRyxnQkFBUyxDQUFDLFlBQU8sQ0FBQyxDQUFDO0FBRXBDOzs7O0dBSUc7QUFDSCxTQUFnQixVQUFVLENBQUMsSUFBWSxFQUFFLFVBQWtCO0lBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBSywrSUFBQSxzQkFDQyxFQUFJLGVBQWdCLEVBQVUsbUNBRS9DLEtBRmlCLElBQUksRUFBZ0IsVUFBVSxFQUU5QyxDQUFDO0FBQ0wsQ0FBQztBQUxELGdDQUtDO0FBU0Q7Ozs7O0dBS0c7QUFDSCxTQUFnQixXQUFXLENBQUMsUUFBZ0I7SUFDMUMsSUFBTSxJQUFJLEdBQUcsUUFBUTtTQUNsQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2IsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLE1BQU0sQ0FBQyxVQUFBLGVBQWUsSUFBSSxPQUFBLGVBQWUsS0FBSyxHQUFHLEVBQXZCLENBQXVCLENBQUM7U0FDbEQsR0FBRyxDQUFDLFVBQUEsSUFBSTtRQUNQLElBQU0sc0JBQXNCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1RCxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsT0FBTyxLQUFHLHNCQUFzQixHQUFHLFVBQVksQ0FBQztJQUNsRCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7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