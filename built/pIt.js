"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const it_1 = require("./it");
var pIt;
(function (pIt) {
    /**
     * Method is the wrapper for jasmine 'it' and designed to work with the test data from *.xlsx files, csv files or arrays.
     * Data is prepared(if needed), tests are filtered (if needed) and then these selected tests run as usual
     * @param {PTestOptions} ptestOptions
     * @param {Utils.TestFunction} func
     */
    function build(ptestOptions, func) {
        for (const testData of utils_1.Utils.prepareTestDataFrom(ptestOptions.data)) {
            if (utils_1.Utils.filterByPropertyValue(testData, ptestOptions.filterBy)) {
                it_1.It.build({
                    case: testData.description,
                }, func.bind(this, testData));
            }
        }
    }
    pIt.build = build;
})(pIt = exports.pIt || (exports.pIt = {}));
//# sourceMappingURL=pIt.js.map