import {TestUtils} from "./testUtils";
import {Types} from "./types";
import TestFunction = Types.TestFunction;
import PTestOptions = Types.PTestOptions;
import TestOptions = Types.TestOptions;
import SuiteOptions = Types.SuiteOptions;

export namespace Test {

    let includesFilter = process.env.JASMINE_COOKIES_FILTER;
    let conditionalFilter = process.env.JASMINE_COOKIES_CONDITIONAL_FILTER;

    let suiteName: string | null;
    let defaultBeforeEach: TestFunction | null;
    let defaultBeforeAll: TestFunction | null;
    let defaultAfterEach: TestFunction | null;
    let defaultAfterAll: TestFunction | null;

    export function setIncludesFilter(filterExpr: string): void {
        includesFilter = filterExpr || includesFilter;
    }

    export function setConditionalFilter(filterExpr: string): void {
        conditionalFilter = filterExpr || conditionalFilter;
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

    export function Describe(suiteNameOrOptions: string | SuiteOptions, func: () => void) {
        if (typeof suiteNameOrOptions === 'string') {
            suiteName = suiteNameOrOptions;
        } else {
            suiteName = suiteNameOrOptions.suite;
        }

        const currentBeforeEach = (suiteNameOrOptions as any).beforeEach ? (suiteNameOrOptions as any).beforeEach : defaultBeforeEach ? defaultBeforeEach : null;
        const currentBeforeAll = (suiteNameOrOptions as any).beforeAll ? (suiteNameOrOptions as any).beforeAll : defaultBeforeAll ? defaultBeforeAll : null;
        const currentAfterEach = (suiteNameOrOptions as any).afterEach ? (suiteNameOrOptions as any).afterEach : defaultAfterEach ? defaultAfterEach : null;
        const currentAfterAll = (suiteNameOrOptions as any).afterAll ? (suiteNameOrOptions as any).afterAll : defaultAfterAll ? defaultAfterAll : null;

        if (currentBeforeEach) beforeEach(currentBeforeEach);
        if (currentBeforeAll) beforeAll(currentBeforeAll);
        if (currentAfterEach) afterEach(currentAfterEach);
        if (currentAfterAll) afterAll(currentAfterAll);

        describe(suiteName, func);
    }

    export function It(testNameOrOptions: string | TestOptions, func: TestFunction) {
        const test = typeof testNameOrOptions === 'string' ? testNameOrOptions : testNameOrOptions.case;
        const suite = suiteName ? `${suiteName} ` : '';
        const fullTestName = `${suite}${test}`;

        if (includesFilter && fullTestName.includes(includesFilter)) {
            it(test, func);
        } else if (conditionalFilter && TestUtils.match(conditionalFilter, fullTestName)) {
            it(test, func);
        } else if (!includesFilter && !conditionalFilter) {
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
                    case: testData.description,
                    // jira: ptestOptions.jira
                }, func.bind(this, testData));
            }
        }
    }


}
