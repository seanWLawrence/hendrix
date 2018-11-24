"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fuzzy_1 = __importDefault(require("fuzzy"));
var format_1 = require("./format");
var config_1 = require("./config");
/**
 * Prompts
 */
exports.templatePrompt = {
    message: 'What are we creating?',
    name: 'template',
    type: 'autocomplete',
    source: function (_, input) {
        if (input === void 0) { input = ''; }
        var templates = config_1.getConfig().templates;
        var filesWithInfo = templates.map(format_1.formatFilename);
        var fuzzyOptions = {
            extract: function (file) { return file.name; },
        };
        return fuzzy_1.default
            .filter(input, filesWithInfo, fuzzyOptions)
            .map(function (file) { return file.original; });
    },
};
exports.outputNamePrompt = {
    message: "What are we naming it?",
    type: 'input',
    name: 'outputName',
    validate: function (answer) { return answer.trim() !== ''; },
};
exports.propsPrompt = {
    message: "List your template's variables",
    type: 'input',
    name: 'props',
    filter: function (input) { return format_1.formatProps(input); },
};
exports.finishedPrompt = {
    message: 'Create another file?',
    type: 'confirm',
    name: 'createAnotherFile',
    default: false,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbXB0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9wcm9tcHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQTBCO0FBRzFCLG1DQUF1RDtBQUN2RCxtQ0FBcUM7QUFFckM7O0dBRUc7QUFDVSxRQUFBLGNBQWMsR0FBRztJQUMxQixPQUFPLEVBQUUsdUJBQXVCO0lBQ2hDLElBQUksRUFBRSxVQUFVO0lBQ2hCLElBQUksRUFBRSxjQUFjO0lBQ3BCLE1BQU0sRUFBRSxVQUFDLENBQVUsRUFBRSxLQUFrQjtRQUFsQixzQkFBQSxFQUFBLFVBQWtCO1FBQzNCLElBQUEsMENBQVMsQ0FBaUI7UUFDbEMsSUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyx1QkFBYyxDQUFDLENBQUM7UUFDcEQsSUFBTSxZQUFZLEdBQUc7WUFDakIsT0FBTyxFQUFFLFVBQUMsSUFBUyxJQUFLLE9BQUEsSUFBSSxDQUFDLElBQUksRUFBVCxDQUFTO1NBQ3BDLENBQUM7UUFFRixPQUFPLGVBQUs7YUFDUCxNQUFNLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUM7YUFDMUMsR0FBRyxDQUFDLFVBQUMsSUFBUyxJQUFLLE9BQUEsSUFBSSxDQUFDLFFBQVEsRUFBYixDQUFhLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQ0osQ0FBQztBQUVXLFFBQUEsZ0JBQWdCLEdBQUc7SUFDNUIsT0FBTyxFQUFFLHdCQUF3QjtJQUNqQyxJQUFJLEVBQUUsT0FBTztJQUNiLElBQUksRUFBRSxZQUFZO0lBQ2xCLFFBQVEsRUFBRSxVQUFDLE1BQWMsSUFBYyxPQUFBLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQXBCLENBQW9CO0NBQzlELENBQUM7QUFFVyxRQUFBLFdBQVcsR0FBRztJQUN2QixPQUFPLEVBQUUsZ0NBQWdDO0lBQ3pDLElBQUksRUFBRSxPQUFPO0lBQ2IsSUFBSSxFQUFFLE9BQU87SUFDYixNQUFNLEVBQUUsVUFBQyxLQUFhLElBQUssT0FBQSxvQkFBVyxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQjtDQUNoRCxDQUFDO0FBRVcsUUFBQSxjQUFjLEdBQUc7SUFDMUIsT0FBTyxFQUFFLHNCQUFzQjtJQUMvQixJQUFJLEVBQUUsU0FBUztJQUNmLElBQUksRUFBRSxtQkFBbUI7SUFDekIsT0FBTyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyJ9