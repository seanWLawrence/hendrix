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
var fs_1 = require("fs");
var util_1 = require("util");
var inquirer_1 = __importStar(require("inquirer"));
var utils_1 = require("./utils");
var packageJSON = require(path_1.join(process.cwd(), 'package.json'));
var _readdir = util_1.promisify(fs_1.readdir);
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
     * properties for use during `createPages`
     */
    Hendrix.prototype.prompt = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, lastPrompt;
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
                        lastPrompt = _d.sent();
                        console.log(lastPrompt);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates a new page using the data generated from the prompts
     */
    // private createPage() {
    //   this.templatePath = join(
    //     __dirname,
    //     './templates',
    //     this.answers.template.filename
    //   );
    //   this.templateAsString = readFileSync(this.templatePath, 'utf8');
    //   this.templateRendered = render(this.templateAsString, {
    //     props: formatProps(this.answers.props),
    //     name: this.answers.outputName
    //   });
    //   // optional: nested filename passed when calling hendrix
    //   this.directoryArg = process.argv[2] || '';
    //   // optional: hendrix.baseDirectory in package.json as the starting directory
    //   if (
    //     packageJSON.hasOwnProperty('hendrix') &&
    //     packageJSON.hendrix.hasOwnProperty('baseDirectory')
    //   ) {
    //     this.basePath = packageJSON.hendrix.baseDirectory;
    //   }
    //   this.outputDirectory = join(
    //     process.cwd(),
    //     this.basePath,
    //     this.directoryArg
    //   );
    //   this.outputPath = join(
    //     this.outputDirectory,
    //     `${this.answers.outputName}.${this.answers.template.extension}`
    //   );
    //   const isFinishedAnswer = await prompt(this.finishedPrompt);
    //   if (existsSync(this.outputDirectory)) {
    //     writeFileSync(this.outputPath, this.templateRendered);
    //     return logSuccess(this.answers.template.prettyName, this.outputDirectory);
    //   }
    //   // if the folder doesn't exist, create a new one
    //   mkdirSync(this.outputDirectory);
    //   writeFileSync(this.outputPath, this.templateRendered);
    //   return logSuccess(this.answers.template.prettyName, this.outputDirectory);
    // }
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
                        return [2 /*return*/];
                }
            });
        });
    };
    return Hendrix;
}());
exports.default = Hendrix;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVuZHJpeC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9IZW5kcml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFDNUIseUJBQTZCO0FBQzdCLDZCQUFpQztBQUNqQyxtREFBK0Q7QUFHL0QsaUNBUWlCO0FBRWpCLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFDakUsSUFBTSxRQUFRLEdBQUcsZ0JBQVMsQ0FBQyxZQUFPLENBQUMsQ0FBQztBQUVwQyxrQkFBUSxDQUFDLGNBQWMsQ0FDckIsY0FBYyxFQUNkLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUN4QyxDQUFDO0FBRUY7OztHQUdHO0FBQ0g7SUFBQTtRQUNFLGtCQUFhLEdBQWMsRUFBRSxDQUFDO0lBZ0ZoQyxDQUFDO0lBOUVDOzs7T0FHRztJQUNXLHdCQUFNLEdBQXBCOzs7Ozs7d0JBQ0UsS0FBQSxDQUFBLEtBQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQSxDQUFDLElBQUksQ0FBQTs7d0JBQ2pCLHFCQUFNLGlCQUFNLENBQUMsc0JBQWMsQ0FBQyxFQUFBOzt3Q0FBN0IsQ0FBQyxTQUE0QixDQUFDO3dCQUM3QixxQkFBTSxpQkFBTSxDQUFDLHdCQUFnQixDQUFDLEVBQUE7O3dDQUEvQixDQUFDLFNBQThCLENBQUM7d0JBQy9CLHFCQUFNLGlCQUFNLENBQUMsbUJBQVcsQ0FBQyxFQUFBOzt3QkFIL0IsZ0RBR0ssQ0FBQyxTQUF5QixDQUFDLEtBQzlCLENBQUM7d0JBRWdCLHFCQUFNLGlCQUFNLENBQUMsc0JBQWMsQ0FBQyxFQUFBOzt3QkFBekMsVUFBVSxHQUFHLFNBQTRCO3dCQUUvQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7OztLQUN6QjtJQUVEOztPQUVHO0lBQ0gseUJBQXlCO0lBQ3pCLDhCQUE4QjtJQUM5QixpQkFBaUI7SUFDakIscUJBQXFCO0lBQ3JCLHFDQUFxQztJQUNyQyxPQUFPO0lBRVAscUVBQXFFO0lBRXJFLDREQUE0RDtJQUM1RCw4Q0FBOEM7SUFDOUMsb0NBQW9DO0lBQ3BDLFFBQVE7SUFFUiw2REFBNkQ7SUFDN0QsK0NBQStDO0lBRS9DLGlGQUFpRjtJQUNqRixTQUFTO0lBQ1QsK0NBQStDO0lBQy9DLDBEQUEwRDtJQUMxRCxRQUFRO0lBQ1IseURBQXlEO0lBQ3pELE1BQU07SUFFTixpQ0FBaUM7SUFDakMscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQix3QkFBd0I7SUFDeEIsT0FBTztJQUVQLDRCQUE0QjtJQUM1Qiw0QkFBNEI7SUFDNUIsc0VBQXNFO0lBQ3RFLE9BQU87SUFFUCxnRUFBZ0U7SUFDaEUsNENBQTRDO0lBQzVDLDZEQUE2RDtJQUU3RCxpRkFBaUY7SUFDakYsTUFBTTtJQUVOLHFEQUFxRDtJQUNyRCxxQ0FBcUM7SUFFckMsMkRBQTJEO0lBRTNELCtFQUErRTtJQUMvRSxJQUFJO0lBRUo7O09BRUc7SUFDVSxzQkFBSSxHQUFqQjs7Ozs0QkFDRSxxQkFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUE7O3dCQUFuQixTQUFtQixDQUFDOzs7OztLQUdyQjtJQUNILGNBQUM7QUFBRCxDQUFDLEFBakZELElBaUZDIn0=