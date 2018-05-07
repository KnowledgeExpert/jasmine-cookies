export declare namespace Types {
    type TestFunction = (() => void | Promise<void>) | ((...args) => void | Promise<void>);
    type XlsxDataSourceInfo = {
        type: TestDataSourceType.XLSX;
        xlsxFilePath?: string;
        sheetIndex?: number;
        sheetName?: string;
    };
    type CsvDataSourceInfo = {
        type: TestDataSourceType.CSV;
        csvFilePath?: string;
    };
    type ArrayDataSourceInfo = {
        type: TestDataSourceType.DATA_ARRAY;
        source: any[];
    };
    type DataSourceInfo = XlsxDataSourceInfo | CsvDataSourceInfo | ArrayDataSourceInfo;
    type TestDataFilter = {
        field: string;
        exactValue?: string | number | boolean;
        partialValue?: string | number | boolean;
    };
    enum TestDataSourceType {
        XLSX = 0,
        CSV = 1,
        DATA_ARRAY = 2,
    }
    type PTestOptions = {
        data: DataSourceInfo;
        filterBy?: TestDataFilter;
    };
    type TestOptions = {
        case: string;
        filterExpression?: string;
    };
    type SuiteOptions = {
        suite: string;
        beforeEach?: TestFunction;
        afterEach?: TestFunction;
        beforeAll?: TestFunction;
        afterAll?: TestFunction;
    };
}
