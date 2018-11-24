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
/**
 * Logs successful output to console
 * @param type
 * @param outputPath
 */
function logSuccess(type, outputPath) {
    console.log(chalk_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["{bold.green New ", " created} in ", "\n        {magenta Happy coding!}"], ["{bold.green New ", " created} in ", "\n        {magenta Happy coding!}"])), type, outputPath));
}
exports.logSuccess = logSuccess;
var templateObject_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2dzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGdEQUEwQjtBQUUxQjs7OztHQUlHO0FBQ0gsU0FBZ0IsVUFBVSxDQUFDLElBQVksRUFBRSxVQUFrQjtJQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQUssMklBQUEsa0JBQW1CLEVBQUksZUFBZ0IsRUFBVSxtQ0FDdEMsS0FEUSxJQUFJLEVBQWdCLFVBQVUsRUFDckMsQ0FBQztBQUNsQyxDQUFDO0FBSEQsZ0NBR0MifQ==