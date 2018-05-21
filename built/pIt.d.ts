import { Types } from './types';
import PTestOptions = Types.PTestOptions;
import TestFunction = Types.TestFunction;
export declare namespace pIt {
    /**
     * Method is the wrapper for jasmine 'it' and designed to work with the test data from *.xlsx files, csv files or arrays.
     * Data is prepared(if needed), tests are filtered (if needed) and then these selected tests run as usual
     * @param {PTestOptions} ptestOptions
     * @param {Utils.TestFunction} func
     */
    function build(ptestOptions: PTestOptions, func: TestFunction): void;
}
