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
var log_1 = require("./utils/log");
var format_1 = require("./utils/format");
var packageJSON = require(path_1.join(process.cwd(), 'package.json'));
function createPage(answers) {
    var outputName = answers.outputName, _a = answers.template, filename = _a.filename, extension = _a.extension, props = answers.props;
    var internalTemplatePath = path_1.join(__dirname, './templates', filename);
    var templateAsString = fs_1.readFileSync(internalTemplatePath, 'utf8');
    var fileContent = mustache_1.render(templateAsString, { props: props, name: outputName });
    var _b = process.argv, args = _b.slice(2);
    var baseUrl = packageJSON.hendrix ? packageJSON.hendrix.baseDirectory : '';
    var additionalPath = args[0] || '';
    var outputDirectory = path_1.join(process.cwd(), baseUrl, additionalPath);
    console.log('PATH', baseUrl, additionalPath, outputDirectory);
    var outputPath = path_1.join(outputDirectory, outputName + "." + extension);
    if (fs_1.existsSync(outputDirectory)) {
        console.log('FILE EXISTS', outputDirectory);
        fs_1.writeFileSync(outputPath, fileContent);
        return log_1.logSuccess(answers.template.prettyName, outputDirectory);
    }
    console.log('FILE NO EXISTS', outputDirectory);
    fs_1.mkdirSync(outputDirectory);
    fs_1.writeFileSync(outputPath, fileContent);
    return log_1.logSuccess(answers.template.prettyName, outputDirectory);
}
var getTemplate = {
    message: 'What are we creating?',
    type: 'list',
    name: 'template',
    choices: function () {
        var templatesPath = path_1.join(__dirname, './templates');
        return fs_1.readdirSync(templatesPath).map(format_1.formatFilename);
    },
};
var getOutputName = {
    message: "What are we naming it?",
    type: 'input',
    name: 'outputName',
    validate: function (answer) { return answer.trim() !== ''; },
};
var getVariables = {
    message: "List your template's key:value pairs separated by a semicolon, i.e. <key>:<value>; <key2>:<value2>;",
    type: 'input',
    name: 'props',
};
function cli() {
    return __awaiter(this, void 0, void 0, function () {
        var template, outputName, variables;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.prompt(getTemplate)];
                case 1:
                    template = _a.sent();
                    return [4 /*yield*/, inquirer_1.prompt(getOutputName)];
                case 2:
                    outputName = _a.sent();
                    return [4 /*yield*/, inquirer_1.prompt(getVariables)];
                case 3:
                    variables = _a.sent();
                    createPage(__assign({}, template, outputName, { props: format_1.formatProps(variables.props) }));
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = cli;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFDNUIscUNBQWtDO0FBQ2xDLHFDQUE4QztBQUM5Qyx5QkFNWTtBQUNaLG1DQUF5QztBQUN6Qyx5Q0FBNkQ7QUFFN0QsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztBQUVqRSxTQUFTLFVBQVUsQ0FBQyxPQUFnQjtJQUVsQyxJQUFBLCtCQUFVLEVBQ1YscUJBQWlDLEVBQXJCLHNCQUFRLEVBQUUsd0JBQVMsRUFDL0IscUJBQUssQ0FDTTtJQUVaLElBQU0sb0JBQW9CLEdBQUcsV0FBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFdEUsSUFBTSxnQkFBZ0IsR0FBRyxpQkFBWSxDQUFDLG9CQUFvQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXBFLElBQU0sV0FBVyxHQUFHLGlCQUFRLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxLQUFLLE9BQUEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUV0RSxJQUFBLGlCQUE0QixFQUF2QixrQkFBTyxDQUFpQjtJQUVuQyxJQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzdFLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckMsSUFBTSxlQUFlLEdBQVcsV0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFFN0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUU5RCxJQUFNLFVBQVUsR0FBVyxXQUFJLENBQzlCLGVBQWUsRUFDWixVQUFVLFNBQUksU0FBVyxDQUM1QixDQUFDO0lBRUYsSUFBSSxlQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDNUMsa0JBQWEsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdkMsT0FBTyxnQkFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0tBQ2hFO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUMvQyxjQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFM0Isa0JBQWEsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDdkMsT0FBTyxnQkFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7QUFFRCxJQUFNLFdBQVcsR0FBRztJQUNuQixPQUFPLEVBQUUsdUJBQXVCO0lBQ2hDLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLFVBQVU7SUFDaEIsT0FBTyxFQUFFO1FBQ1IsSUFBTSxhQUFhLEdBQUcsV0FBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNyRCxPQUFPLGdCQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLHVCQUFjLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBQ0QsQ0FBQztBQUVGLElBQU0sYUFBYSxHQUFHO0lBQ3JCLE9BQU8sRUFBRSx3QkFBd0I7SUFDakMsSUFBSSxFQUFFLE9BQU87SUFDYixJQUFJLEVBQUUsWUFBWTtJQUNsQixRQUFRLEVBQUUsVUFBQyxNQUFjLElBQWMsT0FBQSxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFwQixDQUFvQjtDQUMzRCxDQUFDO0FBRUYsSUFBTSxZQUFZLEdBQUc7SUFDcEIsT0FBTyxFQUFFLHFHQUFxRztJQUM5RyxJQUFJLEVBQUUsT0FBTztJQUNiLElBQUksRUFBRSxPQUFPO0NBQ2IsQ0FBQztBQUVGLFNBQThCLEdBQUc7Ozs7O3dCQUNWLHFCQUFNLGlCQUFNLENBQUMsV0FBVyxDQUFDLEVBQUE7O29CQUF6QyxRQUFRLEdBQVEsU0FBeUI7b0JBQ3ZCLHFCQUFNLGlCQUFNLENBQUMsYUFBYSxDQUFDLEVBQUE7O29CQUE3QyxVQUFVLEdBQVEsU0FBMkI7b0JBQzVCLHFCQUFNLGlCQUFNLENBQUMsWUFBWSxDQUFDLEVBQUE7O29CQUEzQyxTQUFTLEdBQVEsU0FBMEI7b0JBRWpELFVBQVUsY0FDTixRQUFRLEVBQ1IsVUFBVSxJQUNiLEtBQUssRUFBRSxvQkFBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFDbEMsQ0FBQzs7Ozs7Q0FDSDtBQVZELHNCQVVDIn0=