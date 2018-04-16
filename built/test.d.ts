import { Types } from "./types";
import TestFunction = Types.TestFunction;
import PTestOptions = Types.PTestOptions;
import TestOptions = Types.TestOptions;
export declare namespace Test {
    function setFilter(filterExpr: string): void;
    function Describe(description: string, func: () => void): void;
    function It(testOptionsOrName: TestOptions | string, func: TestFunction): void;
    /**
     * Method is the wrapper for jasmine 'it' and designed to work with the test data from *.xlsx files, csv files or arrays.
     * Data is prepared(if needed), tests are filtered (if needed) and then these selected tests run as usual
     * @param {PTestOptions} ptestOptions
     * @param {TestUtils.TestFunction} func
     */
    function pIt(ptestOptions: PTestOptions, func: TestFunction): void;
}
