import {TestUtils} from "./testUtils";
import {Types} from "./types";
import TestFunction = Types.TestFunction;
import PTestOptions = Types.PTestOptions;
import TestOptions = Types.TestOptions;
import SuiteOptions = Types.SuiteOptions;

export namespace Test {

    let filter = process.env.JASMINE_COOKIES_FILTER;

    let suiteName: string | null;
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

    export function Describe(suiteNameOrSuiteOptions: SuiteOptions | string, func: () => void) {
        if (typeof suiteNameOrSuiteOptions === 'string') {
            suiteName = suiteNameOrSuiteOptions;
        } else {
            suiteName = suiteNameOrSuiteOptions.name;
        }

        const currentBeforeEach = (suiteNameOrSuiteOptions as any).beforeEach ? (suiteNameOrSuiteOptions as any).beforeEach : defaultBeforeEach ? defaultBeforeEach : null;
        const currentBeforeAll = (suiteNameOrSuiteOptions as any).beforeAll ? (suiteNameOrSuiteOptions as any).beforeAll : defaultBeforeAll ? defaultBeforeAll : null;
        const currentAfterEach = (suiteNameOrSuiteOptions as any).afterEach ? (suiteNameOrSuiteOptions as any).afterEach : defaultAfterEach ? defaultAfterEach : null;
        const currentAfterAll = (suiteNameOrSuiteOptions as any).afterAll ? (suiteNameOrSuiteOptions as any).afterAll : defaultAfterAll ? defaultAfterAll : null;

        if (currentBeforeEach) beforeEach(currentBeforeEach);
        if (currentBeforeAll) beforeAll(currentBeforeAll);
        if (currentAfterEach) afterEach(currentAfterEach);
        if (currentAfterAll) afterAll(currentAfterAll);

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
