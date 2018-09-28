"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var chalk_1 = __importDefault(require("chalk"));
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
 * Formats the filename to look pretty in the console, and
 * gathers information from it, like the content, extension and
 * actual filename
 * @param filename
 */
function formatFilename(filename) {
    var prettyName = filename
        .split('.')[0]
        .split('-')
        .filter(function (wordOrCharacter) { return wordOrCharacter !== '-'; })
        .map(function (word) {
        var capitalizedFirstLetter = word.charAt(0).toUpperCase();
        var restOfWord = word.slice(1, word.length);
        return "" + capitalizedFirstLetter + restOfWord;
    })
        .join(' ');
    var templatePath = path_1.join(__dirname, 'templates', filename);
    var content = fs_1.readFileSync(templatePath).toString('utf8');
    var extension = filename.split('.')[1];
    return {
        name: prettyName,
        value: {
            filename: filename,
            prettyName: prettyName,
            content: content,
            extension: extension,
        },
    };
}
exports.formatFilename = formatFilename;
/**
 * Reduces a prop string to an array of {name:value} objects
 * so they can be looped in the mustache template
 * @param props
 */
function formatProps(props) {
    return props
        .split(';')
        .filter(Boolean)
        .reduce(function (acc, next) {
        var _a = next.split(':'), name = _a[0], value = _a[1];
        return acc.concat([{ name: name, value: value }]);
    }, []);
}
exports.formatProps = formatProps;
var templateObject_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseUJBQWtDO0FBQ2xDLDZCQUE0QjtBQUU1QixnREFBMEI7QUFFMUI7Ozs7R0FJRztBQUNILFNBQWdCLFVBQVUsQ0FBQyxJQUFZLEVBQUUsVUFBa0I7SUFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFLLCtJQUFBLHNCQUNFLEVBQUksZUFBZ0IsRUFBVSxtQ0FFL0MsS0FGaUIsSUFBSSxFQUFnQixVQUFVLEVBRTlDLENBQUM7QUFDTCxDQUFDO0FBTEQsZ0NBS0M7QUFFRDs7Ozs7R0FLRztBQUNILFNBQWdCLGNBQWMsQ0FBQyxRQUFnQjtJQUM5QyxJQUFNLFVBQVUsR0FBRyxRQUFRO1NBQ3pCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDYixLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1YsTUFBTSxDQUFDLFVBQUMsZUFBZSxJQUFLLE9BQUEsZUFBZSxLQUFLLEdBQUcsRUFBdkIsQ0FBdUIsQ0FBQztTQUNwRCxHQUFHLENBQUMsVUFBQyxJQUFJO1FBQ1QsSUFBTSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxPQUFPLEtBQUcsc0JBQXNCLEdBQUcsVUFBWSxDQUFDO0lBQ2pELENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVaLElBQU0sWUFBWSxHQUFHLFdBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRTVELElBQU0sT0FBTyxHQUFHLGlCQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTVELElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFekMsT0FBTztRQUNOLElBQUksRUFBRSxVQUFVO1FBQ2hCLEtBQUssRUFBRTtZQUNOLFFBQVEsVUFBQTtZQUNSLFVBQVUsWUFBQTtZQUNWLE9BQU8sU0FBQTtZQUNQLFNBQVMsV0FBQTtTQUNUO0tBQ0QsQ0FBQztBQUNILENBQUM7QUEzQkQsd0NBMkJDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLFdBQVcsQ0FDMUIsS0FBYztJQUVkLE9BQU8sS0FBSztTQUNWLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDVixNQUFNLENBQUMsT0FBTyxDQUFDO1NBQ2YsTUFBTSxDQUFDLFVBQUMsR0FBMkMsRUFBRSxJQUFZO1FBQzdELElBQUEsb0JBQStCLEVBQTlCLFlBQUksRUFBRSxhQUFLLENBQW9CO1FBQ3BDLE9BQVcsR0FBRyxTQUFFLEVBQUUsSUFBSSxNQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsR0FBRTtJQUNsQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDO0FBVkQsa0NBVUMifQ==