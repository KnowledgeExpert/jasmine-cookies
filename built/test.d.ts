import { Types } from "./types";
import TestFunction = Types.TestFunction;
import PTestOptions = Types.PTestOptions;
import TestOptions = Types.TestOptions;
import SuiteOptions = Types.SuiteOptions;
export declare namespace Test {
    function setIncludesFilter(filterExpr: string): void;
    function setConditionalFilter(filterExpr: string): void;
    function setDefaultHooks(hooks: {
        beforeEach?: TestFunction;
        afterEach?: TestFunction;
        beforeAll?: TestFunction;
        afterAll?: TestFunction;
    }): void;
    function Describe(suiteNameOrSuiteOptions: string | SuiteOptions, func: () => void): void;
    function It(testNameOrTestOptions: string | TestOptions, func: TestFunction): void;
    /**
     * Method is the wrapper for jasmine 'it' and designed to work with the test data from *.xlsx files, csv files or arrays.
     * Data is prepared(if needed), tests are filtered (if needed) and then these selected tests run as usual
     * @param {PTestOptions} ptestOptions
     * @param {TestUtils.TestFunction} func
     */
    function pIt(ptestOptions: PTestOptions, func: TestFunction): void;
}
