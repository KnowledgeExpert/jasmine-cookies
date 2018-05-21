"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx = require("xlsx");
const csv_to_deep_json_1 = require("csv-to-deep-json");
const types_1 = require("./types");
const fs = require("fs");
var TestDataSourceType = types_1.Types.TestDataSourceType;
var Utils;
(function (Utils) {
    function filterByPropertyValue(testData, filterBy) {
        if (!filterBy) {
            return true;
        }
        const filterByExactValue = !!filterBy.exactValue;
        const actualValue = getValueFromPath(testData, filterBy.field);
        return actualValue && filterByExactValue ? actualValue === filterBy.exactValue : actualValue.includes(filterBy.partialValue);
    }
    Utils.filterByPropertyValue = filterByPropertyValue;
    function prepareTestDataFrom(dataSource) {
        if (dataSource.type === TestDataSourceType.XLSX) {
            return prepareTestDataFromXlsx(dataSource);
        }
        else if (dataSource.type === TestDataSourceType.CSV) {
            return prepareTestDataFromCsv(dataSource);
        }
        else {
            return dataSource.source;
        }
    }
    Utils.prepareTestDataFrom = prepareTestDataFrom;
    function prepareTestDataFromXlsx(dataSource) {
        const wb = xlsx.readFile(dataSource.xlsxFilePath);
        const csvData = dataSource.sheetName
            ? xlsx.utils.sheet_to_csv(wb.Sheets[dataSource.sheetName])
            : xlsx.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[dataSource.sheetIndex || 0]]);
        return csv_to_deep_json_1.CsvToDeepJson.buildObjectsFromCsvString(csvData, '\n');
    }
    function prepareTestDataFromCsv(dataSource) {
        const csvData = fs.readFileSync(dataSource.csvFilePath);
        return csv_to_deep_json_1.CsvToDeepJson.buildObjectsFromCsv(csvData.toString().split('\r'));
    }
    function getValueFromPath(obj, objPath) {
        if (obj === undefined)
            return undefined;
        const parts = objPath.split('.');
        return parts.length === 1 ? obj[parts[0]] : getValueFromPath(obj[parts[0]], parts.slice(1).reduce((f, s) => `${f} ${s}`));
    }
    function mergeFunctions(...functions) {
        const haveAsnycFunctions = functions.filter(func => isAsync(func)).length > 0;
        return haveAsnycFunctions ? async () => {
            for (let func of functions) {
                await func();
            }
        } : () => {
            for (let func of functions) {
                func();
            }
        };
    }
    Utils.mergeFunctions = mergeFunctions;
    function isAsync(func) {
        return !func ? false : func.toString().startsWith('async');
    }
    Utils.isAsync = isAsync;
})(Utils = exports.Utils || (exports.Utils = {}));
//# sourceMappingURL=utils.js.map