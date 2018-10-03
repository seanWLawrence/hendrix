"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
var util_1 = require("util");
var inquirer_1 = __importStar(require("inquirer"));
var mustache_1 = require("mustache");
var fs_2 = require("fs");
var utils_1 = require("./utils");
var fuzzy_1 = __importDefault(require("fuzzy"));
var packageJSON = require(path_1.join(process.cwd(), 'package.json'));
var _readdir = util_1.promisify(fs_1.readdir);
inquirer_1.default.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
/**
 * @class Hendrix
 * Main program
 */
var Hendrix = /** @class */ (function () {
    /**
     * Create prompt questions
     */
    function Hendrix() {
        var _this = this;
        this.templatePrompt = {
            message: 'What are we creating?',
            name: 'template',
            type: 'autocomplete',
            source: function (_, input) {
                if (input === void 0) { input = ''; }
                return __awaiter(_this, void 0, void 0, function () {
                    var templatesPath, files, prettyFiles, fuzzyOptions, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                templatesPath = path_1.join(__dirname, 'templates');
                                return [4 /*yield*/, _readdir(templatesPath)];
                            case 1:
                                files = _a.sent();
                                prettyFiles = files.map(utils_1.formatFilename);
                                fuzzyOptions = {
                                    extract: function (file) { return file.value.prettyName; }
                                };
                                result = fuzzy_1.default
                                    .filter(input, prettyFiles, fuzzyOptions)
                                    .map(function (file) { return file.original; });
                                return [2 /*return*/, result];
                        }
                    });
                });
            }
        };
        this.outputNamePrompt = {
            message: "What are we naming it?",
            type: 'input',
            name: 'outputName',
            validate: function (answer) { return answer.trim() !== ''; }
        };
        this.propsPrompt = {
            message: "List your template's key:value pairs separated by a semicolon, i.e. <key>:<value>; <key2>:<value2>;",
            type: 'input',
            name: 'props'
        };
        this.finishedPrompt = {
            message: 'Create another page?',
            type: 'confirm',
            name: 'isFinished',
            default: false
        };
        this.basePath = '';
    }
    /**
     * Asynchronously initialize prompts and store the data into the class
     * properties for use during `createPages`
     */
    Hendrix.prototype.prompt = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        _b = [{}, this.answers];
                        return [4 /*yield*/, inquirer_1.prompt(this.templatePrompt)];
                    case 1:
                        _b = _b.concat([(_c.sent())]);
                        return [4 /*yield*/, inquirer_1.prompt(this.outputNamePrompt)];
                    case 2:
                        _b = _b.concat([(_c.sent())]);
                        return [4 /*yield*/, inquirer_1.prompt(this.propsPrompt)];
                    case 3:
                        _b = _b.concat([(_c.sent())]);
                        return [4 /*yield*/, inquirer_1.prompt(this.finishedPrompt)];
                    case 4:
                        _a.answers = __assign.apply(void 0, _b.concat([(_c.sent())]));
                        console.log(this.answers);
                        this.templatePath = path_1.join(__dirname, './templates', this.answers.template.filename);
                        this.templateAsString = fs_2.readFileSync(this.templatePath, 'utf8');
                        this.templateRendered = mustache_1.render(this.templateAsString, {
                            props: utils_1.formatProps(this.answers.props),
                            name: this.answers.outputName
                        });
                        // optional: nested filename passed when calling hendrix
                        this.directoryArg = process.argv[2] || '';
                        // optional: hendrix.baseDirectory in package.json as the starting directory
                        if (packageJSON.hasOwnProperty('hendrix') &&
                            packageJSON.hendrix.hasOwnProperty('baseDirectory')) {
                            this.basePath = packageJSON.hendrix.baseDirectory;
                        }
                        this.outputDirectory = path_1.join(process.cwd(), this.basePath, this.directoryArg);
                        this.outputPath = path_1.join(this.outputDirectory, this.answers.outputName + "." + this.answers.template.extension);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates a new page using the data generated from the prompts
     */
    Hendrix.prototype.createPage = function () {
        if (fs_2.existsSync(this.outputDirectory)) {
            fs_2.writeFileSync(this.outputPath, this.templateRendered);
            return utils_1.logSuccess(this.answers.template.prettyName, this.outputDirectory);
        }
        // if the folder doesn't exist, create a new one
        fs_2.mkdirSync(this.outputDirectory);
        fs_2.writeFileSync(this.outputPath, this.templateRendered);
        return utils_1.logSuccess(this.answers.template.prettyName, this.outputDirectory);
    };
    /**
     * Initializes the program
     */
    Hendrix.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prompt()];
                    case 1:
                        _a.sent();
                        this.createPage();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Hendrix;
}());
exports.default = Hendrix;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVuZHJpeC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9IZW5kcml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFDNUIseUJBQTZCO0FBQzdCLDZCQUFpQztBQUNqQyxtREFBK0Q7QUFDL0QscUNBQWtDO0FBQ2xDLHlCQUF3RTtBQUN4RSxpQ0FBa0U7QUFDbEUsZ0RBQTBCO0FBRTFCLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFDakUsSUFBTSxRQUFRLEdBQUcsZ0JBQVMsQ0FBQyxZQUFPLENBQUMsQ0FBQztBQUVwQyxrQkFBUSxDQUFDLGNBQWMsQ0FDckIsY0FBYyxFQUNkLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUN4QyxDQUFDO0FBRUY7OztHQUdHO0FBQ0g7SUFjRTs7T0FFRztJQUNIO1FBQUEsaUJBcURDO1FBMUNDLElBQUksQ0FBQyxjQUFjLEdBQUc7WUFDcEIsT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyxJQUFJLEVBQUUsVUFBVTtZQUNoQixJQUFJLEVBQUUsY0FBYztZQUNwQixNQUFNLEVBQUUsVUFDTixDQUFNLEVBQ04sS0FBa0I7Z0JBQWxCLHNCQUFBLEVBQUEsVUFBa0I7Ozs7OztnQ0FFWixhQUFhLEdBQUcsV0FBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztnQ0FDckMscUJBQU0sUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFBOztnQ0FBckMsS0FBSyxHQUFHLFNBQTZCO2dDQUNyQyxXQUFXLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxzQkFBYyxDQUFDLENBQUM7Z0NBQ3hDLFlBQVksR0FBRztvQ0FDbkIsT0FBTyxFQUFFLFVBQUMsSUFBc0IsSUFBSyxPQUFBLElBQUks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