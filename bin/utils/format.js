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
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
/**
 * Converts a template filename into an object with a pretty version of the filename,
 * (stored as name, so it can be seen by inquirer.js), the extension and template content
 * @param filename
 */
function formatFilename(filename) {
    var name = filename
        .split('.')[0]
        .split('-')
        .filter(function (wordOrCharacter) { return wordOrCharacter !== '-'; })
        .map(function (word) {
        var capitalizedFirstLetter = word.charAt(0).toUpperCase();
        var restOfWord = word.slice(1, word.length);
        return "" + capitalizedFirstLetter + restOfWord;
    })
        .join(' ');
    var extension = filename.split('.')[1];
    var templatePath = path_1.join(__dirname, 'templates', filename);
    var content = fs_1.readFileSync(templatePath).toString('utf8');
    return {
        name: name,
        value: {
            filename: filename,
            content: content,
            extension: extension,
        },
    };
}
exports.formatFilename = formatFilename;
/**
 * Reduces prop string into an array or object based on how they were input
 * @param props
 * @example formatProps('name = Yo') // { name: 'Yo' }
 * @example formatProps('names = Yo, Ye, Ya') // { names: ['Yo', 'Ye', 'Ya'] }
 * @example formatProps('names = first: Yo, middle: Ye, last: Ya') // { names: [{name: 'first', value: 'Yo', {name: 'middle', value: 'Ye'}, {name: 'last', value: 'Ya'] }
 */
function formatProps(props) {
    return props
        .split(';')
        .map(function (prop) { return prop.trim(); })
        .filter(Boolean)
        .reduce(function (acc, next) {
        var _a, _b, _c;
        var _d = next
            .split('=')
            .map(function (value) { return value.trim(); }), propName = _d[0], propValue = _d[1];
        // if value is an array of key:value pairs
        if (propValue.includes(':')) {
            var propValueList = propValue
                .split(',')
                .map(function (value) { return value.trim(); })
                .reduce(function (acc, next) {
                var _a = next
                    .split(':')
                    .map(function (value) { return value.trim(); }), name = _a[0], value = _a[1];
                return acc.concat([{ name: name, value: value }]);
            }, []);
            return __assign({}, acc, (_a = {}, _a[propName] = propValueList, _a));
            // if value is an array of single strings
        }
        else if (propValue.includes(',')) {
            var propValueList = propValue
                .split(',')
                .reduce(function (acc, next) {
                return acc.concat([next]);
            }, []);
            return __assign({}, acc, (_b = {}, _b[propName] = propValueList, _b));
        }
        // if value is a single string
        return __assign({}, acc, (_c = {}, _c[propName] = propValue, _c));
    }, {});
}
exports.formatProps = formatProps;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2Zvcm1hdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEseUJBQWtDO0FBQ2xDLDZCQUE0QjtBQUk1Qjs7OztHQUlHO0FBQ0gsU0FBZ0IsY0FBYyxDQUFDLFFBQWdCO0lBQzNDLElBQU0sSUFBSSxHQUFHLFFBQVE7U0FDaEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNiLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDVixNQUFNLENBQUMsVUFBQSxlQUFlLElBQUksT0FBQSxlQUFlLEtBQUssR0FBRyxFQUF2QixDQUF1QixDQUFDO1NBQ2xELEdBQUcsQ0FBQyxVQUFBLElBQUk7UUFDTCxJQUFNLHNCQUFzQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUQsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLE9BQU8sS0FBRyxzQkFBc0IsR0FBRyxVQUFZLENBQUM7SUFDcEQsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV6QyxJQUFNLFlBQVksR0FBRyxXQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUU1RCxJQUFNLE9BQU8sR0FBRyxpQkFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU1RCxPQUFPO1FBQ0gsSUFBSSxNQUFBO1FBQ0osS0FBSyxFQUFFO1lBQ0gsUUFBUSxVQUFBO1lBQ1IsT0FBTyxTQUFBO1lBQ1AsU0FBUyxXQUFBO1NBQ1o7S0FDSixDQUFDO0FBQ04sQ0FBQztBQTFCRCx3Q0EwQkM7QUFTRDs7Ozs7O0dBTUc7QUFDSCxTQUFnQixXQUFXLENBQUMsS0FBYTtJQUNyQyxPQUFPLEtBQUs7U0FDUCxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1YsR0FBRyxDQUFDLFVBQUMsSUFBWSxJQUFLLE9BQUEsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFYLENBQVcsQ0FBQztTQUNsQyxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQ2YsTUFBTSxDQUFDLFVBQUMsR0FBTyxFQUFFLElBQVk7O1FBQ3BCLElBQUE7OzJEQUVtQyxFQUZsQyxnQkFBUSxFQUFFLGlCQUV3QixDQUFDO1FBRTFDLDBDQUEwQztRQUMxQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDekIsSUFBTSxhQUFhLEdBQUcsU0FBUztpQkFDMUIsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixHQUFHLENBQUMsVUFBQyxLQUFhLElBQUssT0FBQSxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQVosQ0FBWSxDQUFDO2lCQUNwQyxNQUFNLENBQ0gsVUFDSSxHQUFzQyxFQUN0QyxJQUFZO2dCQUVSLElBQUE7O21FQUVxQyxFQUZwQyxZQUFJLEVBQUUsYUFFOEIsQ0FBQztnQkFDMUMsT0FBVyxHQUFHLFNBQUUsRUFBRSxJQUFJLE1BQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxHQUFFO1lBQ3JDLENBQUMsRUFDRCxFQUFFLENBQ0wsQ0FBQztZQUVOLG9CQUFZLEdBQUcsWUFBTyxHQUFDLFFBQVEsSUFBRyxhQUFhLE9BQUs7WUFDcEQseUNBQXlDO1NBQzVDO2FBQU0sSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2hDLElBQU0sYUFBYSxHQUFHLFNBQVM7aUJBQzFCLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsTUFBTSxDQUFDLFVBQUMsR0FBYSxFQUFFLElBQVk7Z0JBQ2hDLE9BQVcsR0FBRyxTQUFFLElBQUksR0FBRTtZQUMxQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDWCxvQkFBWSxHQUFHLFlBQU8sR0FBQyxRQUFRLElBQUcsYUFBYSxPQUFLO1NBQ3ZEO1FBRUQsOEJBQThCO1FBQzlCLG9CQUFZLEdBQUcsWUFBTyxHQUFDLFFBQVEsSUFBRyxTQUFTLE9BQUs7SUFDcEQsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2YsQ0FBQztBQTFDRCxrQ0EwQ0MifQ==