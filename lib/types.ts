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