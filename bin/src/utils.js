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
 * Converts a template filename into an object with a pretty version of the filename,
 * (stored as name, so it can be seen by inquirer.js), the extension and template content
 * @param filename
 */
function formatFilename(filename) {
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
    var extension = filename.split('.')[1];
    var templatePath = path_1.join(__dirname, 'templates', filename);
    var content = fs_1.readFileSync(templatePath).toString('utf8');
    return {
        name: name,
        value: {
            filename: filename,
            content: content,
            extension: extension
        }
    };
}
/**
 * Reduces prop string into an array or object based on how they were input
 * @param props
 * @example formatProps('name = Yo') // { name: 'Yo' }
 * @example formatProps('names = Yo, Ye, Ya') // { names: ['Yo', 'Ye', 'Ya'] }
 * @example formatProps('names = first: Yo, middle: Ye, last: Ya') // { names: [{name: 'first', value: 'Yo', {name: 'middle', value: 'Ye'}, {name: 'last', value: 'Ya'] }
 */
function formatProps(props) {
    return props
        .split(';')
        .map(function (prop) { return prop.trim(); })
        .filter(Boolean)
        .reduce(function (acc, next) {
        var _a, _b, _c;
        var _d = next
            .split('=')
            .map(function (value) { return value.trim(); }), propName = _d[0], propValue = _d[1];
        // if value is an array of key:value pairs
        if (propValue.includes(':')) {
            var propValueList = propValue
                .split(',')
                .map(function (value) { return value.trim(); })
                .reduce(function (acc, next) {
                var _a = next
                    .split(':')
                    .map(function (value) { return value.trim(); }), name = _a[0], value = _a[1];
                return acc.concat([{ name: name, value: value }]);
            }, []);
            return __assign({}, acc, (_a = {}, _a[propName] = propValueList, _a));
            // if value is an array of single strings
        }
        else if (propValue.includes(',')) {
            var propValueList = propValue
                .split(',')
                .reduce(function (acc, next) {
                return acc.concat([next]);
            }, []);
            return __assign({}, acc, (_b = {}, _b[propName] = propValueList, _b));
        }
        // if value is a single string
        return __assign({}, acc, (_c = {}, _c[propName] = propValue, _c));
    }, {});
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
                        filesWithInfo = files.map(formatFilename);
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
    message: "List your template's variables",
    type: 'input',
    name: 'props',
    filter: function (input) { return formatProps(input); }
};
exports.finishedPrompt = {
    message: 'Create another file?',
    type: 'confirm',
    name: 'createAnotherFile',
    default: false
};
var templateObject_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUJBNEpBOztBQTVKQSx5QkFBMkM7QUFDM0MsNkJBQWlDO0FBQ2pDLDZCQUE0QjtBQUU1QixnREFBMEI7QUFDMUIsZ0RBQTBCO0FBRTFCLElBQU0sUUFBUSxHQUFHLGdCQUFTLENBQUMsWUFBTyxDQUFDLENBQUM7QUFFcEM7Ozs7R0FJRztBQUNILFNBQWdCLFVBQVUsQ0FBQyxJQUFZLEVBQUUsVUFBa0I7SUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFLLCtJQUFBLHNCQUNELEVBQUksZUFBZ0IsRUFBVSxtQ0FFL0MsS0FGaUIsSUFBSSxFQUFnQixVQUFVLEVBRTlDLENBQUM7QUFDTCxDQUFDO0FBTEQsZ0NBS0M7QUFXRDs7OztHQUlHO0FBQ0gsU0FBUyxjQUFjLENBQUMsUUFBZ0I7SUFDcEMsSUFBTSxJQUFJLEdBQUcsUUFBUTtTQUNoQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2IsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLE1BQU0sQ0FBQyxVQUFBLGVBQWUsSUFBSSxPQUFBLGVBQWUsS0FBSyxHQUFHLEVBQXZCLENBQXVCLENBQUM7U0FDbEQsR0FBRyxDQUFDLFVBQUEsSUFBSTtRQUNMLElBQU0sc0JBQXNCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1RCxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsT0FBTyxLQUFHLHNCQUFzQixHQUFHLFVBQVksQ0FBQztJQUNwRCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsR0FBRyxD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