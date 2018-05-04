"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx = require("xlsx");
const csv_to_deep_json_1 = require("csv-to-deep-json");
const types_1 = require("./types");
var TestDataSourceType = types_1.Types.TestDataSourceType;
const fs = require("fs");
var TestUtils;
(function (TestUtils) {
    function match(filterExpression, text) {
        if (!filterExpression || filterExpression.length === 0)
            return true;
        return text.includes(filterExpression);
        // const operandsPairs = [
        //     {literal: "AND", alias: "&"},
        //     {literal: "OR", alias: "|"},
        //     {literal: "NOT", alias: "!"}
        // ];
        //
        // const transformedExpr = filterExpression.split(" ")
        //     .map(token => token.match(/[)(]/g) ? `${token.substring(0, 1)} ${token.substring(1, token.length)}` : token)
        //     .reduce((f, s) => `${f} ${s}`)
        //     .split(" ")
        //     .map(token => {
        //         const operandPairs = operandsPairs.filter(pair => token === pair.literal || token === pair.alias);
        //         return operandPairs[0] ? operandPairs[0].alias :
        //             "()".includes(token) ? token :
        //                 `${text.includes(token)}`;
        //     })
        //     .reduce((f, s) => `${f} ${s}`);
        //
        // return !!eval(transformedExpr);
    }
    TestUtils.match = match;
    function filterByPropertyValue(testData, filterBy) {
        if (!filterBy) {
            return true;
        }
        const filterByExactValue = !!filterBy.exactValue;
        const actualValue = getValueFromPath(testData, filterBy.field);
        return actualValue && filterByExactValue ? actualValue === filterBy.exactValue : actualValue.includes(filterBy.partialValue);
    }
    TestUtils.filterByPropertyValue = filterByPropertyValue;
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
    TestUtils.prepareTestDataFrom = prepareTestDataFrom;
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
    // export function addJiraProcessing(jiraTestOptions: JiraTestOptions, testFunc: TestFunction): TestFunction {
    //     return jiraTestOptions
    //         ? mergeFunctions(testFunc, false, async () => {
    // const jira = new JiraClient();
    // if (jiraTestOptions.issueId) {
    //     AllureReporterExtensions.addArgument("JIRA ISSUE LINK", `${jira.config.protocol}://${jira.config.host}/browse/${jiraTestOptions.issueId}`);
    // }
    // if (jiraTestOptions.applyLabels) {
    //     await jira.issue(WithField.id.value(jiraTestOptions.issueId))
    //         .appendLabels(...jiraTestOptions.applyLabels)
    //         .catch(error => console.error(error))
    // }
    // })
    // : testFunc;
    // }
    function mergeFunctions(mainFunction, haveArgs, ...otherFunctions) {
        return haveArgs
            ? async (...args) => {
                try {
                    return await mainFunction(args);
                }
                finally {
                    await resolveAllPromises(...otherFunctions.map(async (func) => isAsync(func) ? await func() : func()));
                }
            }
            : async () => {
                try {
                    return await mainFunction();
                }
                finally {
                    await resolveAllPromises(...otherFunctions.map(async (func) => isAsync(func) ? await func() : func()));
                }
            };
    }
    function isAsync(fn) {
        return fn.constructor.name === 'AsyncFunction';
    }
    async function resolveAllPromises(...promises) {
        const result = [];
        for (const promise of promises) {
            result.push(await promise.then(resolve => resolve, error => error));
        }
        return result;
    }
})(TestUtils = exports.TestUtils || (exports.TestUtils = {}));
//# sourceMappingURL=testUtils.js.map