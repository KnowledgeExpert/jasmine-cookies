import {Types} from './types';
import {Filter} from './filter';
import {Describe} from './describe';
import {Configuration} from "./configuration";
import TestOptions = Types.TestOptions;
import TestFunction = Types.TestFunction;


export namespace It {

    export function build(testNameOrOptions: string | TestOptions, func: TestFunction) {
        const testname = typeof testNameOrOptions === 'string' ? testNameOrOptions : testNameOrOptions.case;
        const suite = Describe.currentSuiteName ? `${Describe.currentSuiteName} ` : '';
        const fullTestName = `${suite}${testname}`;

        // add error if filter is falsy to matchers
        if (Configuration.includesFilter && Filter.includesFilterMatch(fullTestName)) {
            buildJasmineIt(fullTestName, func);
        }

        // todo is second parameter reduntant?
        else if (Configuration.conditionalFilter && !Configuration.includesFilter && Filter.conditionalFilterMatch(fullTestName)) {
            buildJasmineIt(fullTestName, func);
        }

        else if (!Configuration.includesFilter && !Configuration.conditionalFilter) {
            buildJasmineIt(fullTestName, func);
        }
    }

    function buildJasmineIt(description, func) {
        it(description, Configuration.dummyTests ? () => true : func);
    }

}
