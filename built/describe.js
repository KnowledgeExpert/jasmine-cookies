"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("./hooks");
const configuration_1 = require("./configuration");
var Describe;
(function (Describe) {
    function build(suiteNameOrOptions, func) {
        if (typeof suiteNameOrOptions === 'string') {
            Describe.currentSuiteName = suiteNameOrOptions;
        }
        else {
            Describe.currentSuiteName = suiteNameOrOptions.suite;
        }
        buildHooks(suiteNameOrOptions);
        describe(Describe.currentSuiteName, func);
    }
    Describe.build = build;
    function buildHooks(suiteOptions) {
        if (!configuration_1.Configuration.dummyTests) {
            const currentBeforeEach = suiteOptions.beforeEach ? suiteOptions.beforeEach : hooks_1.Hooks.beforeEach() ? hooks_1.Hooks.beforeEach() : null;
            const currentBeforeAll = suiteOptions.beforeAll ? suiteOptions.beforeAll : hooks_1.Hooks.beforeAll() ? hooks_1.Hooks.beforeAll() : null;
            const currentAfterEach = suiteOptions.afterEach ? suiteOptions.afterEach : hooks_1.Hooks.afterEach() ? hooks_1.Hooks.afterEach() : null;
            const currentAfterAll = suiteOptions.afterAll ? suiteOptions.afterAll : hooks_1.Hooks.afterAll() ? hooks_1.Hooks.afterAll() : null;
            if (currentBeforeEach)
                beforeEach(currentBeforeEach);
            if (currentBeforeAll)
                beforeAll(currentBeforeAll);
            if (currentAfterEach)
                afterEach(currentAfterEach);
            if (currentAfterAll)
                afterAll(currentAfterAll);
        }
    }
})(Describe = exports.Describe || (exports.Describe = {}));
//# sourceMappingURL=describe.js.map