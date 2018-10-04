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
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var inquirer_1 = __importStar(require("inquirer"));
var mustache_1 = require("mustache");
var fs_1 = require("fs");
var utils_1 = require("./utils");
var packageJSON = require(path_1.join(process.cwd(), 'package.json'));
// add autocomplete prompt type
inquirer_1.default.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
/**
 * @class Hendrix
 * Main program
 */
var Hendrix = /** @class */ (function () {
    function Hendrix() {
        this.filesToCreate = [];
    }
    /**
     * Asynchronously initialize prompts and store the data into the class
     * propertiy `filesToCreate` for use during the `createFiles` method
     */
    Hendrix.prototype.prompt = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, createAnotherFile;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = this.filesToCreate).push;
                        _c = [{}];
                        return [4 /*yield*/, inquirer_1.prompt(utils_1.templatePrompt)];
                    case 1:
                        _c = _c.concat([(_d.sent())]);
                        return [4 /*yield*/, inquirer_1.prompt(utils_1.outputNamePrompt)];
                    case 2:
                        _c = _c.concat([(_d.sent())]);
                        return [4 /*yield*/, inquirer_1.prompt(utils_1.propsPrompt)];
                    case 3:
                        _b.apply(_a, [__assign.apply(void 0, _c.concat([(_d.sent())]))]);
                        return [4 /*yield*/, inquirer_1.prompt(utils_1.finishedPrompt)];
                    case 4:
                        createAnotherFile = (_d.sent()).createAnotherFile;
                        /**
                         * Keeps running the prompt method until user
                         * says that they don't want to create any more files
                         */
                        if (createAnotherFile === true) {
                            return [2 /*return*/, this.prompt()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Hendrix.prototype.createFiles = function () {
        this.filesToCreate.forEach(this.createFile);
    };
    /**
     * Creates a new file using the data generated from the prompts
     */
    Hendrix.prototype.createFile = function (file) {
        var _a = file.template, filename = _a.filename, extension = _a.extension, name = _a.name, outputName = file.outputName, props = file.props;
        var templatePath = path_1.join(__dirname, './templates', filename);
        var templateAsString = fs_1.readFileSync(templatePath, 'utf8');
        var templateRendered = mustache_1.render(templateAsString, __assign({ name: outputName }, props));
        // optional: nested filename passed when calling hendrix
        var directoryArg = process.argv[2] || '';
        var basePath = '';
        // optional: hendrix.baseDirectory in package.json as the starting directory
        if (packageJSON.hasOwnProperty('hendrix') &&
            packageJSON.hendrix.hasOwnProperty('baseDirectory')) {
            basePath = packageJSON.hendrix.baseDirectory;
        }
        var outputDirectory = path_1.join(process.cwd(), basePath, directoryArg);
        var outputPath = path_1.join(outputDirectory, outputName + "." + extension);
        if (fs_1.existsSync(outputDirectory)) {
            fs_1.writeFileSync(outputPath, templateRendered);
            return utils_1.logSuccess(outputName, outputDirectory);
        }
        // if the folder doesn't exist, create a new one
        fs_1.mkdirSync(outputDirectory);
        fs_1.writeFileSync(outputPath, templateRendered);
        return utils_1.logSuccess(outputName, outputDirectory);
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
                        this.createFiles();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Hendrix;
}());
exports.default = Hendrix;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVuZHJpeC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9IZW5kcml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFDNUIsbURBQXFEO0FBQ3JELHFDQUFrQztBQUNsQyx5QkFBd0U7QUFDeEUsaUNBTWlCO0FBRWpCLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFFakUsK0JBQStCO0FBQy9CLGtCQUFRLENBQUMsY0FBYyxDQUNyQixjQUFjLEVBQ2QsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQ3hDLENBQUM7QUFFRjs7O0dBR0c7QUFDSDtJQUFBO1FBQ0Usa0JBQWEsR0FBYyxFQUFFLENBQUM7SUFzRmhDLENBQUM7SUFwRkM7OztPQUdHO0lBQ1csd0JBQU0sR0FBcEI7Ozs7Ozt3QkFDRSxLQUFBLENBQUEsS0FBQSxJQUFJLENBQUMsYUFBYSxDQUFBLENBQUMsSUFBSSxDQUFBOzt3QkFDakIscUJBQU0saUJBQU0sQ0FBQyxzQkFBYyxDQUFDLEVBQUE7O3dDQUE3QixDQUFDLFNBQTRCLENBQUM7d0JBQzdCLHFCQUFNLGlCQUFNLENBQUMsd0JBQWdCLENBQUMsRUFBQTs7d0NBQS9CLENBQUMsU0FBOEIsQ0FBQzt3QkFDL0IscUJBQU0saUJBQU0sQ0FBQyxtQkFBVyxDQUFDLEVBQUE7O3dCQUgvQixnREFHSyxDQUFDLFNBQXlCLENBQUMsS0FDOUIsQ0FBQzt3QkFFb0MscUJBQU0saUJBQU0sQ0FBQyxzQkFBYyxDQUFDLEVBQUE7O3dCQUEzRCxpQkFBaUIsR0FBYyxDQUFBLFNBQTRCLENBQUEsa0JBQTFDO3dCQUV6Qjs7OzJCQUdHO3dCQUNILElBQUksaUJBQWlCLEtBQUssSUFBSSxFQUFFOzRCQUM5QixzQkFBTyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUM7eUJBQ3RCOzs7OztLQUNGO0lBRU8sNkJBQVcsR0FBbkI7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOztPQUVHO0lBQ0ssNEJBQVUsR0FBbEIsVUFBbUIsSUFBYTtRQUU1QixJQUFBLGtCQUF1QyxFQUEzQixzQkFBUSxFQUFFLHdCQUFTLEVBQUUsY0FBSSxFQUNyQyw0QkFBVSxFQUNWLGtCQUFLLENBQ0U7UUFFVCxJQUFNLFlBQVksR0FBRyxXQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUU5RCxJQUFNLGdCQUFnQixHQUFHLGlCQUFZLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTVELElBQU0sZ0JBQWdCLEdBQUcsaUJBQU0sQ0FBQyxnQkFBZ0IsYUFDOUMsSUFBSSxFQUFFLFVBQVUsSUFDYixLQUFLLEVBQ1IsQ0FBQztRQUVILHdEQUF3RDtRQUN4RCxJQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUzQyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFFbEIsNEVBQTRFO1FBQzVFLElBQ0UsV0FBVyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFDckMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLEVBQ25EO1lBQ0EsUUFBUSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1NBQzlDO1FBRUQsSUFBTSxlQUFlLEdBQUcsV0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFcEUsSUFBTSxVQUFVLEdBQUcsV0FBSSxDQUFDLGVBQWUsRUFBSyxVQUFVLFNBQUksU0FBVyxDQUFDLENBQUM7UUFFdkUsSUFBSSxlQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDL0Isa0JBQWEsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUU1QyxPQUFPLGtCQUFVLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsZ0RBQWdEO1FBQ2hELGNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUUzQixrQkFBYSxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTVDLE9BQU8sa0JBQVUsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOztPQUVHO0lBQ1Usc0JBQUksR0FBakI7Ozs7NEJBQ0UscUJBQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFBOzt3QkFBbkIsU0FBbUIsQ0FBQzt3QkFFcEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOzs7OztLQUNwQjtJQUNILGNBQUM7QUFBRCxDQUFDLEFBdkZELElBdUZDIn0=