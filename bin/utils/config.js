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
var path_1 = require("path");
var fs_1 = require("fs");
function getTemplates(userTemplatesPath) {
    if (userTemplatesPath === void 0) { userTemplatesPath = ''; }
    var defaultTemplatesPath = path_1.join(__dirname, 'templates');
    var defaultTemplates = fs_1.readdirSync(defaultTemplatesPath, 'utf8');
    var hasUserTemplates = userTemplatesPath !== '';
    return hasUserTemplates
        ? defaultTemplates.concat(fs_1.readdirSync(userTemplatesPath, 'utf8'))
        : defaultTemplates;
}
exports.getTemplates = getTemplates;
function getConfig() {
    var currentWorkingDirectory = process.cwd();
    var hendrixConfigPath = path_1.join(currentWorkingDirectory, 'hendrix.config.js');
    // check if hendrix.config.js exists
    console.log(chalk_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["{purple Checking for 'hendrix.config.js' file...}"], ["{purple Checking for 'hendrix.config.js' file...}"]))));
    var hasHendrixConfig = fs_1.existsSync(hendrixConfigPath);
    if (hasHendrixConfig) {
        console.log(chalk_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["{green 'hendrix.config.js' file found! Loading configuration...}"], ["{green 'hendrix.config.js' file found! Loading configuration...}"]))));
        var _a = require(hendrixConfigPath), _b = _a.baseDirectory, baseDirectory = _b === void 0 ? '' : _b, _c = _a.templatesDirectory, templatesDirectory = _c === void 0 ? null : _c;
        if (!templatesDirectory) {
            return { templates: getTemplates(), baseDirectory: baseDirectory };
        }
        return {
            templates: getTemplates(path_1.join(currentWorkingDirectory, templatesDirectory)),
            baseDirectory: baseDirectory,
        };
    }
    return {
        templates: getTemplates(),
        baseDirectory: '',
    };
}
exports.getConfig = getConfig;
var templateObject_1, templateObject_2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxnREFBMEI7QUFDMUIsNkJBQTRCO0FBQzVCLHlCQUE2QztBQUU3QyxTQUFnQixZQUFZLENBQUMsaUJBQThCO0lBQTlCLGtDQUFBLEVBQUEsc0JBQThCO0lBQ3ZELElBQU0sb0JBQW9CLEdBQUcsV0FBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMxRCxJQUFNLGdCQUFnQixHQUFHLGdCQUFXLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbkUsSUFBTSxnQkFBZ0IsR0FBRyxpQkFBaUIsS0FBSyxFQUFFLENBQUM7SUFFbEQsT0FBTyxnQkFBZ0I7UUFDbkIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxnQkFBVyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztBQUMzQixDQUFDO0FBUkQsb0NBUUM7QUFFRCxTQUFnQixTQUFTO0lBSXJCLElBQU0sdUJBQXVCLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzlDLElBQU0saUJBQWlCLEdBQUcsV0FBSSxDQUMxQix1QkFBdUIsRUFDdkIsbUJBQW1CLENBQ3RCLENBQUM7SUFFRixvQ0FBb0M7SUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFLLHNIQUFBLG1EQUFtRCxLQUFDLENBQUM7SUFFdEUsSUFBTSxnQkFBZ0IsR0FBRyxlQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUV2RCxJQUFJLGdCQUFnQixFQUFFO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQ1AsZUFBSyxxSUFBQSxrRUFBa0UsS0FDMUUsQ0FBQztRQUVJLElBQUEsK0JBR3dCLEVBRjFCLHFCQUFrQixFQUFsQix1Q0FBa0IsRUFDbEIsMEJBQXlCLEVBQXpCLDhDQUMwQixDQUFDO1FBRS9CLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUNyQixPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxFQUFFLGFBQWEsZUFBQSxFQUFFLENBQUM7U0FDdkQ7UUFFRCxPQUFPO1lBQ0gsU0FBUyxFQUFFLFlBQVksQ0FDbkIsV0FBSSxDQUFDLHVCQUF1QixFQUFFLGtCQUFrQixDQUFDLENBQ3BEO1lBQ0QsYUFBYSxlQUFBO1NBQ2hCLENBQUM7S0FDTDtJQUVELE9BQU87UUFDSCxTQUFTLEVBQUUsWUFBWSxFQUFFO1FBQ3pCLGFBQWEsRUFBRSxFQUFFO0tBQ3BCLENBQUM7QUFDTixDQUFDO0FBekNELDhCQXlDQyJ9