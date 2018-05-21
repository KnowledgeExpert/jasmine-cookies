import {Types} from './types';
import {Filter} from './filter';
import {Describe} from './describe';
import TestOptions = Types.TestOptions;
import TestFunction = Types.TestFunction;
import includesFilter = Filter.includesFilter;
import conditionalFilter = Filter.conditionalFilter;
import currentSuiteName = Describe.currentSuiteName;


export namespace It {

    export function build(testNameOrOptions: string | TestOptions, func: TestFunction) {
        const test = typeof testNameOrOptions === 'string' ? testNameOrOptions : testNameOrOptions.case;
        const suite = currentSuiteName ? `${currentSuiteName} ` : '';
        const fullTestName = `${suite}${test}`;

        if (Filter.includesFiletrMatch(fullTestName)) {
            it(test, func);
        } else if (Filter.conditionalFilterMatch(fullTestName)) {
            it(test, func);
        } else if (!includesFilter && !conditionalFilter) {
            it(test, func);
        }
    }

}
