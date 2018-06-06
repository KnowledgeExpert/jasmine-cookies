"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("./filter");
const describe_1 = require("./describe");
var currentSuiteName = describe_1.Describe.currentSuiteName;
var It;
(function (It) {
    function build(testNameOrOptions, func) {
        const test = typeof testNameOrOptions === 'string' ? testNameOrOptions : testNameOrOptions.case;
        const suite = currentSuiteName ? `${currentSuiteName} ` : '';
        const fullTestName = `${suite}${test}`;
        if (!(filter_1.Filter.conditionalFilter === '') && filter_1.Filter.includesFilter === '') {
            if (filter_1.Filter.conditionalFilterMatch(fullTestName)) {
                it(test, func);
            }
        }
        else if (!(filter_1.Filter.includesFilter === '') && filter_1.Filter.conditionalFilter === '') {
            if (filter_1.Filter.includesFilterMatch(fullTestName)) {
                it(test, func);
            }
        }
        else if (!(filter_1.Filter.includesFilter === '') && !(filter_1.Filter.conditionalFilter === '')) {
            if (filter_1.Filter.includesFilterMatch(fullTestName)) {
                it(test, func);
            }
        }
        else if (filter_1.Filter.includesFilter === '' && filter_1.Filter.conditionalFilter === '') {
            it(test, func);
        }
    }
    It.build = build;
})(It = exports.It || (exports.It = {}));
//# sourceMappingURL=it.js.map