"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("./filter");
const describe_1 = require("./describe");
const configuration_1 = require("./configuration");
var It;
(function (It) {
    function build(testNameOrOptions, func) {
        const testname = typeof testNameOrOptions === 'string' ? testNameOrOptions : testNameOrOptions.case;
        const suite = describe_1.Describe.currentSuiteName ? `${describe_1.Describe.currentSuiteName} ` : '';
        const fullTestName = `${suite}${testname}`;
        // add error if filter is falsy to matchers
        if (configuration_1.Configuration.includesFilter && filter_1.Filter.includesFilterMatch(fullTestName)) {
            buildJasmineIt(fullTestName, func);
        }
        else if (configuration_1.Configuration.conditionalFilter && !configuration_1.Configuration.includesFilter && filter_1.Filter.conditionalFilterMatch(fullTestName)) {
            buildJasmineIt(fullTestName, func);
        }
        else if (!configuration_1.Configuration.includesFilter && !configuration_1.Configuration.conditionalFilter) {
            buildJasmineIt(fullTestName, func);
        }
    }
    It.build = build;
    function buildJasmineIt(description, func) {
        console.log('is it should contain test body itself?', !configuration_1.Configuration.dummyTests);
        it(description, configuration_1.Configuration.dummyTests ? () => true : func);
    }
    // function verboseIt(testname, testfunc) {
    //     it(testname, Utils.isAsync(testfunc) ? async () => {
    //         const starttime = Date.now();
    //         try {
    //             await testfunc();
    //         } finally {
    //             // "196783".substr(0, "196783".length - 3) + '.' + "196783".substr("196783".length - 3)
    //             // "196.783"
    //             const endtime = `${Date.now() - starttime}`;
    //             const endtimems = endtime.length > 3 ? endtime.substr(endtime.length - 3) : endtime;
    //             const endtimes = endtime.length > 3 ? endtime.substr(0, endtime.length - 3) : 0;
    //             console.log(`${testname} - ${endtimes}.${endtimems}s `);
    //         }
    //     } : () => {
    //         const starttime = Date.now();
    //         try {
    //             testfunc();
    //         } finally {
    //             // "196783".substr(0, "196783".length - 3) + '.' + "196783".substr("196783".length - 3)
    //             // "196.783"
    //             const endtime = `${Date.now() - starttime}`;
    //             const endtimems = endtime.length > 3 ? endtime.substr(endtime.length - 3) : endtime;
    //             const endtimes = endtime.length > 3 ? endtime.substr(0, endtime.length - 3) : 0;
    //             console.log(`${testname} - ${endtimes}.${endtimems}s `);
    //         }
    //     });
    // }
})(It = exports.It || (exports.It = {}));
//# sourceMappingURL=it.js.map