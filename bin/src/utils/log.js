"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
function logSuccess(type, outputPath) {
    console.log(chalk_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  {bold.green New ", " created} in ", " \n  {magenta Happy coding!} \n  "], ["\n  {bold.green New ", " created} in ", " \n  {magenta Happy coding!} \n  "])), type, outputPath));
}
exports.logSuccess = logSuccess;
var templateObject_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxnREFBMEI7QUFFMUIsU0FBZ0IsVUFBVSxDQUFDLElBQVksRUFBRSxVQUFrQjtJQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQUssK0lBQUEsc0JBQ0UsRUFBSSxlQUFnQixFQUFVLG1DQUUvQyxLQUZpQixJQUFJLEVBQWdCLFVBQVUsRUFFOUMsQ0FBQztBQUNMLENBQUM7QUFMRCxnQ0FLQyJ9