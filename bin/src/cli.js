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
function createPage(answers) {
    var outputName = answers.outputName, _a = answers.template, filename = _a.filename, extension = _a.extension, props = answers.props;
    var internalTemplatePath = path_1.join(__dirname, './templates', filename);
    var templateAsString = fs_1.readFileSync(internalTemplatePath, 'utf8');
    var fileContent = mustache_1.render(templateAsString, { props: props, name: outputName });
    var _b = process.argv, args = _b.slice(2);
    var outputDirectory = path_1.join(process.cwd(), args[0] ? args[0] : '');
    var outputPath = path_1.join(outputDirectory, outputName + "." + extension);
    if (fs_1.existsSync(outputDirectory)) {
        fs_1.writeFileSync(outputPath, fileContent);
    }
    else {
        fs_1.mkdirSync(path_1.join(process.cwd(), args[0]));
        fs_1.writeFileSync(outputPath, fileContent);
    }
    log_1.logSuccess(answers.template.prettyName, outputPath);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFDNUIscUNBQWtDO0FBQ2xDLHFDQUE4QztBQUM5Qyx5QkFNWTtBQUNaLG1DQUF5QztBQUN6Qyx5Q0FBNkQ7QUFHN0QsU0FBUyxVQUFVLENBQUMsT0FBZ0I7SUFFbEMsSUFBQSwrQkFBVSxFQUNWLHFCQUFpQyxFQUFyQixzQkFBUSxFQUFFLHdCQUFTLEVBQy9CLHFCQUFLLENBQ007SUFFWixJQUFNLG9CQUFvQixHQUFHLFdBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRXRFLElBQU0sZ0JBQWdCLEdBQUcsaUJBQVksQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUVwRSxJQUFNLFdBQVcsR0FBRyxpQkFBUSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxPQUFBLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFFdEUsSUFBQSxpQkFBNEIsRUFBdkIsa0JBQU8sQ0FBaUI7SUFFbkMsSUFBTSxlQUFlLEdBQVcsV0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFNUUsSUFBTSxVQUFVLEdBQVcsV0FBSSxDQUM5QixlQUFlLEVBQ1osVUFBVSxTQUFJLFNBQVcsQ0FDNUIsQ0FBQztJQUVGLElBQUksZUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQ2hDLGtCQUFhLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBQ3ZDO1NBQU07UUFDTixjQUFTLENBQUMsV0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXhDLGtCQUFhLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBQ3ZDO0lBRUQsZ0JBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBRUQsSUFBTSxXQUFXLEdBQUc7SUFDbkIsT0FBTyxFQUFFLHVCQUF1QjtJQUNoQyxJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksRUFBRSxVQUFVO0lBQ2hCLE9BQU8sRUFBRTtRQUNSLElBQU0sYUFBYSxHQUFHLFdBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDckQsT0FBTyxnQkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyx1QkFBYyxDQUFDLENBQUM7SUFDdkQsQ0FBQztDQUNELENBQUM7QUFFRixJQUFNLGFBQWEsR0FBRztJQUNyQixPQUFPLEVBQUUsd0JBQXdCO0lBQ2pDLElBQUksRUFBRSxPQUFPO0lBQ2IsSUFBSSxFQUFFLFlBQVk7SUFDbEIsUUFBUSxFQUFFLFVBQUMsTUFBYyxJQUFjLE9BQUEsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBcEIsQ0FBb0I7Q0FDM0QsQ0FBQztBQUVGLElBQU0sWUFBWSxHQUFHO0lBQ3BCLE9BQU8sRUFBRSxxR0FBcUc7SUFDOUcsSUFBSSxFQUFFLE9BQU87SUFDYixJQUFJLEVBQUUsT0FBTztDQUNiLENBQUM7QUFFRixTQUE4QixHQUFHOzs7Ozt3QkFDVixxQkFBTSxpQkFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFBOztvQkFBekMsUUFBUSxHQUFRLFNBQXlCO29CQUN2QixxQkFBTSxpQkFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFBOztvQkFBN0MsVUFBVSxHQUFRLFNBQTJCO29CQUM1QixxQkFBTSxpQkFBTSxDQUFDLFlBQVksQ0FBQyxFQUFBOztvQkFBM0MsU0FBUyxHQUFRLFNBQTBCO29CQUVqRCxVQUFVLGNBQ04sUUFBUSxFQUNSLFVBQVUsSUFDYixLQUFLLEVBQUUsb0JBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQ2xDLENBQUM7Ozs7O0NBQ0g7QUFWRCxzQkFVQyJ9