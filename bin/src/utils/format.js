"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
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
    var templatePath = path_1.join(__dirname, '..', 'templates', filename);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2Zvcm1hdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlCQUFrQztBQUNsQyw2QkFBNEI7QUFFNUIsU0FBZ0IsY0FBYyxDQUFDLFFBQWdCO0lBQzlDLElBQU0sVUFBVSxHQUFHLFFBQVE7U0FDekIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNiLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDVixNQUFNLENBQUMsVUFBQyxlQUFlLElBQUssT0FBQSxlQUFlLEtBQUssR0FBRyxFQUF2QixDQUF1QixDQUFDO1NBQ3BELEdBQUcsQ0FBQyxVQUFDLElBQUk7UUFDVCxJQUFNLHNCQUFzQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUQsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLE9BQU8sS0FBRyxzQkFBc0IsR0FBRyxVQUFZLENBQUM7SUFDakQsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRVosSUFBTSxZQUFZLEdBQUcsV0FBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRWxFLElBQU0sT0FBTyxHQUFHLGlCQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTVELElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFekMsT0FBTztRQUNOLElBQUksRUFBRSxVQUFVO1FBQ2hCLEtBQUssRUFBRTtZQUNOLFFBQVEsVUFBQTtZQUNSLFVBQVUsWUFBQTtZQUNWLE9BQU8sU0FBQTtZQUNQLFNBQVMsV0FBQTtTQUNUO0tBQ0QsQ0FBQztBQUNILENBQUM7QUEzQkQsd0NBMkJDO0FBRUQsU0FBZ0IsV0FBVyxDQUMxQixLQUFhO0lBRWIsT0FBTyxLQUFLO1NBQ1YsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDZixNQUFNLENBQUMsVUFBQyxHQUEyQyxFQUFFLElBQVk7UUFDN0QsSUFBQSxvQkFBK0IsRUFBOUIsWUFBSSxFQUFFLGFBQUssQ0FBb0I7UUFDcEMsT0FBVyxHQUFHLFNBQUUsRUFBRSxJQUFJLE1BQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxHQUFFO0lBQ2xDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNULENBQUM7QUFWRCxrQ0FVQyJ9