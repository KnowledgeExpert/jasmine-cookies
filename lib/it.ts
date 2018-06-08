import {Types} from './types';
import {Filter} from './filter';
import {Describe} from './describe';
import {Configuration} from "./configuration";
import {Utils} from "./utils";
import TestOptions = Types.TestOptions;
import TestFunction = Types.TestFunction;


export namespace It {

    export function build(testNameOrOptions: string | TestOptions, func: TestFunction) {
        const testname = typeof testNameOrOptions === 'string' ? testNameOrOptions : testNameOrOptions.case;
        const suite = Describe.currentSuiteName ? `${Describe.currentSuiteName} ` : '';
        const fullTestName = `${suite}${testname}`;

        // add error if filter is falsy to matchers
        if (Configuration.includesFilter && Filter.includesFilterMatch(fullTestName)) {
            if (Configuration.verboseMode) {
                verboseIt(fullTestName, func);
            } else {
                it(fullTestName, func);
            }
        }

        // todo is second parameter reduntant?
        else if (Configuration.conditionalFilter && !Configuration.includesFilter && Filter.conditionalFilterMatch(fullTestName)) {
            if (Configuration.verboseMode) {
                verboseIt(fullTestName, func);
            } else {
                it(fullTestName, func);
            }
        }

        else if (!Configuration.includesFilter && !Configuration.conditionalFilter) {
            if (Configuration.verboseMode) {
                verboseIt(fullTestName, func);
            } else {
                it(fullTestName, func);
            }
        }
    }

    function verboseIt(testname, testfunc) {
        it(testname, Utils.isAsync(testfunc) ? async () => {
            const starttime = Date.now();
            try {
                await testfunc();
            } finally {
                // "196783".substr(0, "196783".length - 3) + '.' + "196783".substr("196783".length - 3)
                // "196.783"
                const endtime = `${Date.now() - starttime}`;
                const endtimems = endtime.length > 3 ? endtime.substr(endtime.length - 3) : endtime;
                const endtimes = endtime.length > 3 ? endtime.substr(0, endtime.length - 3) : 0;
                console.log(`${testname} - ${endtimes}.${endtimems}s `);
            }
        } : () => {
            const starttime = Date.now();
            try {
                testfunc();
            } finally {
                // "196783".substr(0, "196783".length - 3) + '.' + "196783".substr("196783".length - 3)
                // "196.783"
                const endtime = `${Date.now() - starttime}`;
                const endtimems = endtime.length > 3 ? endtime.substr(endtime.length - 3) : endtime;
                const endtimes = endtime.length > 3 ? endtime.substr(0, endtime.length - 3) : 0;
                console.log(`${testname} - ${endtimes}.${endtimems}s `);
            }
        });
    }
}
