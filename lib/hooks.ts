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
import {Utils} from './utils';
import TestFunction = Types.TestFunction;
import {Configuration} from "./configuration";


export namespace Hooks {
    
    export function beforeEach() {
        return Configuration.defaultBeforeEach;
    }

    export function beforeAll() {
        return Configuration.defaultBeforeAll;
    }

    export function afterEach() {
        return Configuration.defaultAfterEach;
    }

    export function afterAll() {
        return Configuration.defaultAfterAll;
    }

    export function setDefault(hooks: {
        beforeEach?: TestFunction,
        afterEach?: TestFunction,
        beforeAll?: TestFunction,
        afterAll?: TestFunction
    }) {
        if (hooks) {
            Configuration.defaultBeforeEach = hooks.beforeEach ? hooks.beforeEach : Configuration.defaultBeforeEach;
            Configuration.defaultBeforeAll = hooks.beforeAll ? hooks.beforeAll : Configuration.defaultBeforeAll;
            Configuration.defaultAfterEach = hooks.afterEach ? hooks.afterEach : Configuration.defaultAfterEach;
            Configuration.defaultAfterAll = hooks.afterAll ? hooks.afterAll : Configuration.defaultAfterAll;
        }
    }

    export function addDefault(hooks: {
        beforeEach?: TestFunction,
        afterEach?: TestFunction,
        beforeAll?: TestFunction,
        afterAll?: TestFunction
    }) {
        if (hooks) {
            Configuration.defaultBeforeEach = hooks.beforeEach
                ? Configuration.defaultBeforeEach
                    ? Utils.mergeFunctions(Configuration.defaultBeforeEach, hooks.beforeEach)
                    : hooks.beforeEach
                : Configuration.defaultBeforeEach;

            Configuration.defaultBeforeAll = hooks.beforeAll
                ? Configuration.defaultBeforeAll
                    ? Utils.mergeFunctions(Configuration.defaultBeforeAll, hooks.beforeAll)
                    : hooks.beforeAll
                : Configuration.defaultBeforeAll;

            Configuration.defaultAfterEach = hooks.afterEach
                ? Configuration.defaultAfterEach
                    ? Utils.mergeFunctions(Configuration.defaultAfterEach, hooks.afterEach)
                    : hooks.afterEach
                : Configuration.defaultAfterEach;

            Configuration.defaultAfterAll = hooks.afterAll
                ? Configuration.defaultAfterAll
                    ? Utils.mergeFunctions(Configuration.defaultAfterAll, hooks.afterAll)
                    : hooks.afterAll
                : Configuration.defaultAfterAll;
        }
    }
}

