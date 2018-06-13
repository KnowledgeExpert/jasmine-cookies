// Copyright 2018 Knowledge Expert SA
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
