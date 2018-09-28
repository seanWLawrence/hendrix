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
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var inquirer_1 = require("inquirer");
var mustache_1 = require("mustache");
var fs_1 = require("fs");
var utils_1 = require("./utils");
var packageJSON = require(path_1.join(process.cwd(), 'package.json'));
/**
 * @class Hendrix
 * Main program
 */
var Hendrix = /** @class */ (function () {
    /**
     * Create prompt questions
     */
    function Hendrix() {
        this.templatePrompt = {
            message: 'What are we creating?',
            type: 'list',
            name: 'template',
            choices: function () {
                var templatesPath = path_1.join(__dirname, './templates');
                return fs_1.readdirSync(templatesPath).map(utils_1.formatFilename);
            },
        };
        this.outputNamePrompt = {
            message: "What are we naming it?",
            type: 'input',
            name: 'outputName',
            validate: function (answer) { return answer.trim() !== ''; },
        };
        this.propsPrompt = {
            message: "List your template's key:value pairs separated by a semicolon, i.e. <key>:<value>; <key2>:<value2>;",
            type: 'input',
            name: 'props',
        };
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
                        _b = [{}];
                        return [4 /*yield*/, inquirer_1.prompt(this.templatePrompt)];
                    case 1:
                        _b = _b.concat([(_c.sent())]);
                        return [4 /*yield*/, inquirer_1.prompt(this.outputNamePrompt)];
                    case 2:
                        _b = _b.concat([(_c.sent())]);
                        return [4 /*yield*/, inquirer_1.prompt(this.propsPrompt)];
                    case 3:
                        _a.answers = __assign.apply(void 0, _b.concat([(_c.sent())]));
                        this.templatePath = path_1.join(__dirname, './templates', this.answers.template.filename);
                        this.templateAsString = fs_1.readFileSync(this.templatePath, 'utf8');
                        this.templateRendered = mustache_1.render(this.templateAsString, {
                            props: utils_1.formatProps(this.answers.props),
                            name: this.answers.outputName,
                        });
                        // optional: nested filename passed when calling hendrix
                        this.directoryArg = process.argv[2] || '';
                        // optional: hendrix.baseDirectory in package.json as the starting directory
                        this.basePath = packageJSON.hendrix.baseDirectory || '';
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
        if (fs_1.existsSync(this.outputDirectory)) {
            fs_1.writeFileSync(this.outputPath, this.templateRendered);
            return utils_1.logSuccess(this.answers.template.prettyName, this.outputDirectory);
        }
        // if the folder doesn't exist, create a new one
        fs_1.mkdirSync(this.outputDirectory);
        fs_1.writeFileSync(this.outputPath, this.templateRendered);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVuZHJpeC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9IZW5kcml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUE0QjtBQUM1QixxQ0FBcUQ7QUFDckQscUNBQWtDO0FBQ2xDLHlCQU1ZO0FBQ1osaUNBQWtFO0FBQ2xFLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFFakU7OztHQUdHO0FBQ0g7SUFhQzs7T0FFRztJQUNIO1FBQ0MsSUFBSSxDQUFDLGNBQWMsR0FBRztZQUNyQixPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLFVBQVU7WUFDaEIsT0FBTyxFQUFFO2dCQUNSLElBQU0sYUFBYSxHQUFHLFdBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ3JELE9BQU8sZ0JBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsc0JBQWMsQ0FBQyxDQUFDO1lBQ3ZELENBQUM7U0FDRCxDQUFDO1FBRUYsSUFBSSxDQUFDLGdCQUFnQixHQUFHO1lBQ3ZCLE9BQU8sRUFBRSx3QkFBd0I7WUFDakMsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsWUFBWTtZQUNsQixRQUFRLEVBQUUsVUFBQyxNQUFjLElBQWMsT0FBQSxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFwQixDQUFvQjtTQUMzRCxDQUFDO1FBRUYsSUFBSSxDQUFDLFdBQVcsR0FBRztZQUNsQixPQUFPLEVBQUUscUdBQXFHO1lBQzlHLElBQUksRUFBRSxPQUFPO1lBQ2IsSUFBSSxFQUFFLE9BQU87U0FDYixDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNXLHdCQUFNLEdBQXBCOzs7Ozs7d0JBQ0MsS0FBQSxJQUFJLENBQUE7O3dCQUNDLHFCQUFNLGlCQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFBOzt3Q0FBbEMsQ0FBQyxTQUFpQyxDQUFDO3dCQUNsQyxxQkFBTSxpQkFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFBOzt3Q0FBcEMsQ0FBQyxTQUFtQyxDQUFDO3dCQUNwQyxxQkFBTSxpQkFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQTs7d0JBSG5DLEdBQUssT0FBTyxxQ0FHUixDQUFDLFNBQThCLENBQUMsR0FDbkMsQ0FBQzt3QkFFRixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQUksQ0FDdkIsU0FBUyxFQUNULGFBQWEsRUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQzlCLENBQUM7d0JBRUYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGlCQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFFaEUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGlCQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFOzRCQUNyRCxLQUFLLEVBQUUsbUJBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQzs0QkFDdEMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVTt5QkFDN0IsQ0FBQyxDQUFDO3dCQUVILHdEQUF3RDt3QkFDeEQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFFMUMsNEVBQTRFO3dCQUM1RSxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQzt3QkFFeEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxXQUFJLENBQzFCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDYixJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxZQUFZLENBQ2pCLENBQUM7d0JBRUYsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFJLENBQ3JCLElBQUksQ0FBQyxlQUFlLEVBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxTQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVcsQ0FDL0QsQ0FBQzs7Ozs7S0FDRjtJQUVEOztPQUVHO0lBQ0ssNEJBQVUsR0FBbEI7UUFDQyxJQUFJLGVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDckMsa0JBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRXRELE9BQU8sa0JBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQzFFO1FBRUQsZ0RBQWdEO1FBQ2hELGNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFaEMsa0JBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXRELE9BQU8sa0JBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRDs7T0FFRztJQUNVLHNCQUFJLEdBQWpCOzs7OzRCQUNDLHFCQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQTs7d0JBQW5CLFNBQW1CLENBQUM7d0JBRXBCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7Ozs7S0FDbEI7SUFDRixjQUFDO0FBQUQsQ0FBQyxBQTdHRCxJQTZHQyJ9