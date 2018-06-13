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

export namespace Types {
    export type TestFunction = (() => void | Promise<void>) | ((...args) => void | Promise<void>)
    export type XlsxDataSourceInfo = { type: TestDataSourceType.XLSX, xlsxFilePath?: string, sheetIndex?: number, sheetName?: string };
    export type CsvDataSourceInfo = { type: TestDataSourceType.CSV, csvFilePath?: string };
    export type ArrayDataSourceInfo = { type: TestDataSourceType.DATA_ARRAY, source: any[] };
    export type DataSourceInfo = XlsxDataSourceInfo | CsvDataSourceInfo | ArrayDataSourceInfo;
    export type TestDataFilter = { field: string, exactValue?: string | number | boolean, partialValue?: string | number | boolean };

    export enum TestDataSourceType {
        XLSX,
        CSV,
        DATA_ARRAY
    }

    export type PTestOptions = {
        data: DataSourceInfo,
        filterBy?: TestDataFilter
    }

    export type TestOptions = {
        case: string,
        filterExpression?: string
    }

    export type SuiteOptions = {
        suite: string,
        beforeEach?: TestFunction,
        afterEach?: TestFunction,
        beforeAll?: TestFunction,
        afterAll?: TestFunction
    }

}