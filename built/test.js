"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testUtils_1 = require("./testUtils");
var Test;
(function (Test) {
    let filter = process.env.JASMINE_COOKIES_FILTER;
    let suiteName;
    let defaultBeforeEach;
    let defaultBeforeAll;
    let defaultAfterEach;
    let defaultAfterAll;
    function setFilter(filterExpr) {
        filter = filterExpr || filter;
    }
    Test.setFilter = setFilter;
    function setDefaultHooks(hooks) {
        defaultBeforeEach = hooks.beforeEach;
        defaultBeforeAll = hooks.beforeAll;
        defaultAfterEach = hooks.afterEach;
        defaultAfterAll = hooks.afterAll;
    }
    Test.setDefaultHooks = setDefaultHooks;
    function Describe(suiteNameOrSuiteOptions, func) {
        if (typeof suiteNameOrSuiteOptions === 'string') {
            suiteName = suiteNameOrSuiteOptions;
        }
        else {
            suiteName = suiteNameOrSuiteOptions.name;
        }
        const currentBeforeEach = suiteNameOrSuiteOptions.beforeEach ? suiteNameOrSuiteOptions.beforeEach : defaultBeforeEach ? defaultBeforeEach : null;
        const currentBeforeAll = suiteNameOrSuiteOptions.beforeAll ? suiteNameOrSuiteOptions.beforeAll : defaultBeforeAll ? defaultBeforeAll : null;
        const currentAfterEach = suiteNameOrSuiteOptions.afterEach ? suiteNameOrSuiteOptions.afterEach : defaultAfterEach ? defaultAfterEach : null;
        const currentAfterAll = suiteNameOrSuiteOptions.afterAll ? suiteNameOrSuiteOptions.afterAll : defaultAfterAll ? defaultAfterAll : null;
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
    function It(testOptionsOrName, func) {
        const test = typeof testOptionsOrName === 'string' ? testOptionsOrName : testOptionsOrName.name;
        const suite = suiteName ? `${suiteName} ` : '';
        const fullTestName = `${suite}${test}`;
        if (!filter || (filter && testUtils_1.TestUtils.match(filter, fullTestName))) {
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
                    name: testData.description,
                }, func.bind(this, testData));
            }
        }
    }
    Test.pIt = pIt;
})(Test = exports.Test || (exports.Test = {}));
//# sourceMappingURL=test.js.map