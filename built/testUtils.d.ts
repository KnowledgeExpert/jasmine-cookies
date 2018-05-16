import { Types } from './types';
import TestDataFilter = Types.TestDataFilter;
import DataSourceInfo = Types.DataSourceInfo;
export declare namespace TestUtils {
    function match(filterExpression: string, text: string): boolean;
    function filterByPropertyValue(testData: any, filterBy: TestDataFilter): boolean;
    function prepareTestDataFrom(dataSource: DataSourceInfo): any[];
}
