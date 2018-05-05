"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx = require("xlsx");
const csv_to_deep_json_1 = require("csv-to-deep-json");
const types_1 = require("./types");
const fs = require("fs");
var TestDataSourceType = types_1.Types.TestDataSourceType;
var TestUtils;
(function (TestUtils) {
    function match(filterExpression, text) {
        if (!filterExpression || filterExpression.length === 0)
            return true;
        if (text === null || text === undefined)
            return false;
        // replace operands with
        const operandsPairs = {
            "AND": "&",
            "OR": "|",
            "NOT": "!"
        };
        let filterWithTransformedOperators = (' ' + filterExpression).slice(1); // hack for copy filter expression itself
        Object.keys(operandsPairs).forEach(operatorDescription => filterWithTransformedOperators = filterWithTransformedOperators.replace(operatorDescription, operandsPairs[operatorDescription]));
        // replace text chunks with bool values
        filterWithTransformedOperators.match(/("[^"]+")|([^ \)\(&|!]+)/g)
            .map(part => {
            const inQuotes = part.includes('"');
            return {
                rawPart: part,
                transformedPart: text.includes(inQuotes ? part.replace(/"/g, '') : part)
            };
        }).forEach(pair => {
            const textToReplace = pair.rawPart;
            const valToReplace = pair.transformedPart;
            filterWithTransformedOperators = filterWithTransformedOperators.replace(textToReplace, String(valToReplace));
        });
        return !!eval(filterWithTransformedOperators);
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