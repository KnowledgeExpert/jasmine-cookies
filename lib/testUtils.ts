import * as xlsx from 'xlsx';
import {CsvToDeepJson} from 'csv-to-deep-json';
import {Types} from './types';
import * as fs from 'fs';
import TestDataFilter = Types.TestDataFilter;
import DataSourceInfo = Types.DataSourceInfo;
import TestDataSourceType = Types.TestDataSourceType;
import XlsxDataSourceInfo = Types.XlsxDataSourceInfo;
import TestFunction = Types.TestFunction;


export namespace TestUtils {

    import CsvDataSourceInfo = Types.CsvDataSourceInfo;

    export function match(filterExpression: string, text: string): boolean {
        if (!filterExpression || filterExpression.length === 0) return true;
        if (text === null || text === undefined) return false;

        // replace operands with
        const operandsPairs = {
            'AND': '&',
            'OR': '|',
            'NOT': '!'
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

    export function filterByPropertyValue(testData: any, filterBy: TestDataFilter): boolean {
        if (!filterBy) {
            return true;
        }
        const filterByExactValue = !!filterBy.exactValue;
        const actualValue = getValueFromPath(testData, filterBy.field);
        return actualValue && filterByExactValue ? actualValue === filterBy.exactValue : actualValue.includes(filterBy.partialValue);
    }

    export function prepareTestDataFrom(dataSource: DataSourceInfo) {
        if (dataSource.type === TestDataSourceType.XLSX) {
            return prepareTestDataFromXlsx(dataSource);
        } else if (dataSource.type === TestDataSourceType.CSV) {
            return prepareTestDataFromCsv(dataSource);
        } else {
            return dataSource.source;
        }
    }

    function prepareTestDataFromXlsx(dataSource: XlsxDataSourceInfo): any[] {
        const wb = xlsx.readFile(dataSource.xlsxFilePath);
        const csvData = dataSource.sheetName
            ? xlsx.utils.sheet_to_csv(wb.Sheets[dataSource.sheetName])
            : xlsx.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[dataSource.sheetIndex || 0]]);
        return CsvToDeepJson.buildObjectsFromCsvString(csvData, '\n');
    }

    function prepareTestDataFromCsv(dataSource: CsvDataSourceInfo): any[] {
        const csvData = fs.readFileSync(dataSource.csvFilePath);
        return CsvToDeepJson.buildObjectsFromCsv(csvData.toString().split('\r'));
    }

    function getValueFromPath(obj: any, objPath: string): any {
        if (obj === undefined) return undefined;
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

    function mergeFunctions(mainFunction: Function, haveArgs: boolean, ...otherFunctions: Function[]): TestFunction {
        return haveArgs
            ? async (...args) => {
                try {
                    return await mainFunction(args);
                } finally {
                    await resolveAllPromises(...otherFunctions.map(async (func) => isAsync(func) ? await func() : func()));
                }
            }
            : async () => {
                try {
                    return await mainFunction();
                } finally {
                    await resolveAllPromises(...otherFunctions.map(async (func) => isAsync(func) ? await func() : func()));
                }
            };
    }

    function isAsync(fn: Function): boolean {
        return fn.constructor.name === 'AsyncFunction';
    }

    async function resolveAllPromises(...promises: Promise<any>[]): Promise<any[]> {
        const result = [];
        for (const promise of promises) {
            result.push(await promise.then(resolve => resolve, error => error));
        }
        return result;
    }
}
