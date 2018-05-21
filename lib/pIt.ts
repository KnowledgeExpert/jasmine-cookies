import {Utils} from './utils';
import {Types} from './types';
import {It} from './it';
import PTestOptions = Types.PTestOptions;
import TestFunction = Types.TestFunction;


export namespace pIt {

    /**
     * Method is the wrapper for jasmine 'it' and designed to work with the test data from *.xlsx files, csv files or arrays.
     * Data is prepared(if needed), tests are filtered (if needed) and then these selected tests run as usual
     * @param {PTestOptions} ptestOptions
     * @param {Utils.TestFunction} func
     */
    export function build(ptestOptions: PTestOptions, func: TestFunction) {
        for (const testData of Utils.prepareTestDataFrom(ptestOptions.data)) {
            if (Utils.filterByPropertyValue(testData, ptestOptions.filterBy)) {
                It.build({
                    case: testData.description,
                    // jira: ptestOptions.jira
                }, func.bind(this, testData));
            }
        }
    }

}