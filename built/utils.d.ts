import { Types } from './types';
import TestDataFilter = Types.TestDataFilter;
import DataSourceInfo = Types.DataSourceInfo;
export declare namespace Utils {
    function filterByPropertyValue(testData: any, filterBy: TestDataFilter): boolean;
    function prepareTestDataFrom(dataSource: DataSourceInfo): any[];
    type func = syncFunc | asyncFunc;
    type syncFunc = (...args) => any | void;
    type asyncFunc = (...args) => Promise<any> | Promise<void>;
    function mergeFunctions(...functions: func[]): (...args) => Promise<void> | void;
    function isAsync(func: any): boolean;
}
