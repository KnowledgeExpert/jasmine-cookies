"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testUtils_1 = require("./testUtils");
var Test;
(function (Test) {
    let includesFilter = process.env.JASMINE_COOKIES_FILTER;
    let conditionalFilter = process.env.JASMINE_COOKIES_CONDITIONAL_FILTER;
    let suiteName;
    let defaultBeforeEach;
    let defaultBeforeAll;
    let defaultAfterEach;
    let defaultAfterAll;
    function setIncludesFilter(filterExpr) {
        includesFilter = filterExpr || includesFilter;
    }
    Test.setIncludesFilter = setIncludesFilter;
    function setConditionalFilter(filterExpr) {
        conditionalFilter = filterExpr || conditionalFilter;
    }
    Test.setConditionalFilter = setConditionalFilter;
    function setDefaultHooks(hooks) {
        defaultBeforeEach = hooks.beforeEach;
        defaultBeforeAll = hooks.beforeAll;
        defaultAfterEach = hooks.afterEach;
        defaultAfterAll = hooks.afterAll;
    }
    Test.setDefaultHooks = setDefaultHooks;
    function Describe(suiteNameOrOptions, func) {
        if (typeof suiteNameOrOptions === 'string') {
            suiteName = suiteNameOrOptions;
        }
        else {
            suiteName = suiteNameOrOptions.suite;
        }
        const currentBeforeEach = suiteNameOrOptions.beforeEach ? suiteNameOrOptions.beforeEach : defaultBeforeEach ? defaultBeforeEach : null;
        const currentBeforeAll = suiteNameOrOptions.beforeAll ? suiteNameOrOptions.beforeAll : defaultBeforeAll ? defaultBeforeAll : null;
        const currentAfterEach = suiteNameOrOptions.afterEach ? suiteNameOrOptions.afterEach : defaultAfterEach ? defaultAfterEach : null;
        const currentAfterAll = suiteNameOrOptions.afterAll ? suiteNameOrOptions.afterAll : defaultAfterAll ? defaultAfterAll : null;
        if (currentBeforeEach)
            beforeEach(currentBeforeEach);
        if (currentBeforeAll)
            beforeAll(currentBeforeAll);
        if (currentAfterEach)
            afterEach(currentAfterEach);
        if (currentAfterAll)
            afterAll(currentAfterAll);
        describe(suiteName, func);
    }
    Test.Describe = Describe;
    function It(testNameOrOptions, func) {
        const test = typeof testNameOrOptions === 'string' ? testNameOrOptions : testNameOrOptions.case;
        const suite = suiteName ? `${suiteName} ` : '';
        const fullTestName = `${suite}${test}`;
        if (includesFilter && fullTestName.includes(includesFilter)) {
            it(test, func);
        }
        else if (conditionalFilter && testUtils_1.TestUtils.match(conditionalFilter, fullTestName)) {
            it(test, func);
        }
        else if (!includesFilter && !conditionalFilter) {
            it(test, func);
        }
    }
    Test.It = It;
    /**
     * Method is the wrapper for jasmine 'it' and designed to work with the test data from *.xlsx files, csv files or arrays.
     * Data is prepared(if needed), tests are filtered (if needed) and then these selected tests run as usual
     * @param {PTestOptions} ptestOptions
     * @param {TestUtils.TestFunction} func
     */
    function pIt(ptestOptions, func) {
        for (const testData of testUtils_1.TestUtils.prepareTestDataFrom(ptestOptions.data)) {
            if (testUtils_1.TestUtils.filterByPropertyValue(testData, ptestOptions.filterBy)) {
                It({
                    case: testData.description,
                }, func.bind(this, testData));
            }
        }
    }
    Test.pIt = pIt;
})(Test = exports.Test || (exports.Test = {}));
//# sourceMappingURL=test.js.map