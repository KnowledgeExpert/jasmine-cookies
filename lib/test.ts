import {TestUtils} from "./testUtils";
import {Types} from "./types";
import TestFunction = Types.TestFunction;
import PTestOptions = Types.PTestOptions;
import TestOptions = Types.TestOptions;
import SuiteOptions = Types.SuiteOptions;

export namespace Test {

    let filter = process.env.JASMINE_COOKIES_FILTER;
    let suiteName: string | null = null;
    let defaultBeforeEach: TestFunction | null;
    let defaultBeforeAll: TestFunction | null;
    let defaultAfterEach: TestFunction | null;
    let defaultAfterAll: TestFunction | null;

    export function setFilter(filterExpr: string): void {
        filter = filterExpr || filter;
    }

    export function setDefaultHooks(hooks: {
        beforeEach?: TestFunction,
        afterEach?: TestFunction,
        beforeAll?: TestFunction,
        afterAll?: TestFunction
    }) {
        defaultBeforeEach = hooks.beforeEach;
        defaultBeforeAll = hooks.beforeAll;
        defaultAfterEach = hooks.afterEach;
        defaultAfterAll = hooks.afterAll;
    }

    export function Describe(descriptionOrSuiteOptions: SuiteOptions | string, func: () => void) {
        let beforeEachHook;
        let beforeAllHook;
        let afterEachHook;
        let afterAllHook;
        if (typeof descriptionOrSuiteOptions === 'string') {
            suiteName = descriptionOrSuiteOptions;
        } else {
            suiteName = descriptionOrSuiteOptions.name;
            beforeEachHook = descriptionOrSuiteOptions.beforeEach ? descriptionOrSuiteOptions.beforeEach : defaultBeforeEach;
            beforeAllHook = descriptionOrSuiteOptions.beforeAll ? descriptionOrSuiteOptions.beforeAll : defaultBeforeAll;
            afterEachHook = descriptionOrSuiteOptions.afterEach ? descriptionOrSuiteOptions.afterEach : defaultAfterEach;
            afterAllHook = descriptionOrSuiteOptions.afterAll ? descriptionOrSuiteOptions.afterAll : defaultAfterAll;
        }
        if (beforeEachHook) beforeEach(beforeEachHook);
        if (beforeAllHook) beforeAll(beforeAllHook);
        if (afterEachHook) afterEach(afterEachHook);
        if (afterAllHook) afterAll(afterAllHook);
        describe(suiteName, func);
    }

    export function It(testOptionsOrName: TestOptions | string, func: TestFunction) {
        const test = typeof testOptionsOrName === 'string' ? testOptionsOrName : testOptionsOrName.name;
        const suite = suiteName ? `${suiteName} ` : '';
        const fullTestName = `${suite}${test}`;

        if (!filter || (filter && TestUtils.match(filter, fullTestName))) {
            it(test, func);
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
