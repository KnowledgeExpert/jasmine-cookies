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
import {Hooks} from './hooks';
import {Configuration} from "./configuration";
import SuiteOptions = Types.SuiteOptions;


export namespace Describe {

    export let currentSuiteName: string | null;

    export function build(suiteNameOrOptions: string | SuiteOptions, func: () => void) {
        if (typeof suiteNameOrOptions === 'string') {
            currentSuiteName = suiteNameOrOptions;
        } else {
            currentSuiteName = suiteNameOrOptions.suite;
        }

        buildHooks(suiteNameOrOptions as SuiteOptions);

        describe(currentSuiteName, func);
    }

    function buildHooks(suiteOptions: SuiteOptions) {
        if (!Configuration.dummyTests) {
            const currentBeforeEach = suiteOptions.beforeEach ? suiteOptions.beforeEach : Hooks.beforeEach() ? Hooks.beforeEach() : null;
            const currentBeforeAll = suiteOptions.beforeAll ? suiteOptions.beforeAll : Hooks.beforeAll() ? Hooks.beforeAll() : null;
            const currentAfterEach = suiteOptions.afterEach ? suiteOptions.afterEach : Hooks.afterEach() ? Hooks.afterEach() : null;
            const currentAfterAll = suiteOptions.afterAll ? suiteOptions.afterAll : Hooks.afterAll() ? Hooks.afterAll() : null;

            if (currentBeforeEach) beforeEach(currentBeforeEach);
            if (currentBeforeAll) beforeAll(currentBeforeAll);
            if (currentAfterEach) afterEach(currentAfterEach);
            if (currentAfterAll) afterAll(currentAfterAll);
        }
    }
}
