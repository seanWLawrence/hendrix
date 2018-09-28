"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CLI = __importStar(require("../cli"));
var mock_fs_1 = __importDefault(require("mock-fs"));
describe('CLI', function () {
    beforeAll(function () {
        return mock_fs_1.default({
            './templates': {
                'README.md.mustache': 'Test {{name}}',
            },
        });
    });
    it('reads all templates', function () { });
    it('gets outputDirectory from package.json', function () { });
    it('creates a new page in the correct directory', function () { });
    it('formats props as an array', function () { });
    it('formats template filename', function () { });
    it('calls the log function on success', function () {
        var mock = jest.spyOn(CLI, 'createPage');
        CLI.default();
        expect(mock).toBeCalledTimes(1);
    });
    it('calls the prompts', function () { });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9fX3Rlc3RzX18vaW5kZXguc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBOEI7QUFDOUIsb0RBQTZCO0FBRTdCLFFBQVEsQ0FBQyxLQUFLLEVBQUU7SUFDZixTQUFTLENBQUM7UUFDVCxPQUFBLGlCQUFNLENBQUM7WUFDTixhQUFhLEVBQUU7Z0JBQ2Qsb0JBQW9CLEVBQUUsZUFBZTthQUNyQztTQUNELENBQUM7SUFKRixDQUlFLENBQUMsQ0FBQztJQUVMLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxjQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxjQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRSxjQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzVELEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxjQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzFDLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxjQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzFDLEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtRQUN2QyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMzQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLG1CQUFtQixFQUFFLGNBQU8sQ0FBQyxDQUFDLENBQUM7QUFDbkMsQ0FBQyxDQUFDLENBQUMifQ==