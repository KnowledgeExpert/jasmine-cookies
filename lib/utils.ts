// Copyright 2018 Knowledge Expert SA
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as xlsx from 'xlsx';
import {CsvToDeepJson} from 'csv-to-deep-json';
import {Types} from './types';
import * as fs from 'fs';
import TestDataFilter = Types.TestDataFilter;
import DataSourceInfo = Types.DataSourceInfo;
import TestDataSourceType = Types.TestDataSourceType;
import XlsxDataSourceInfo = Types.XlsxDataSourceInfo;
import CsvDataSourceInfo = Types.CsvDataSourceInfo;

export namespace Utils {

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

    export type func = syncFunc | asyncFunc;
    export type syncFunc = (...args) => | any | void;
    export type asyncFunc = (...args) => | Promise<any> | Promise<void>;


    export function mergeFunctions(...functions: func[]): (...args) => Promise<void> | void {
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

    export function isAsync(func): boolean {
        return !func ? false : func.toString().startsWith('async');
    }

}
