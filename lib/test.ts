import {TestUtils} from "./testUtils";
import {Types} from "./types";
import TestFunction = Types.TestFunction;
import PTestOptions = Types.PTestOptions;
import TestOptions = Types.TestOptions;


export namespace Test {

    let filter = process.env.JASMINE_COOKIES_FILTER;

    export function setFilter(filterExpr: string): void {
        filter = filterExpr || filter;
    }

    export function Describe(description: string, func: () => void) {
        if (!filter || (filter && TestUtils.match(filter, description))) {
            describe(description, func);
        }
    }

    export function It(testOptionsOrName: TestOptions | string, func: TestFunction) {
        if (typeof testOptionsOrName === 'string') {
            if (!filter || (filter && TestUtils.match(filter, testOptionsOrName))) {
                it(testOptionsOrName, func);
            }
        } else {
            if (!filter || (filter && TestUtils.match(filter, testOptionsOrName.name))) {
                it(testOptionsOrName.name, func);
            }
        }
    }

    /**
     * Method is the wrapper for jasmine 'it' and designed to work with the test data from *.xlsx files, csv files or arrays.
     * Data is prepared(if needed), tests are filtered (if needed) and then these selected tests run as usual
     * @param {PTestOptions} ptestOptions
     * @param {TestUtils.TestFunction} func
     */
    export function pIt(ptestOptions: PTestOptions, func: TestFunction) {
        for (const testData of TestUtils.prepareTestDataFrom(ptestOptions.data)) {
            if (TestUtils.filterByPropertyValue(testData, ptestOptions.filterBy)) {
                It({
                    name: testData.description,
                    // jira: ptestOptions.jira
                }, func.bind(this, testData));
            }
        }
    }


}
