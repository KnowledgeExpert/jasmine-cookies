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
const utils_1 = require("./utils");
const configuration_1 = require("./configuration");
var Hooks;
(function (Hooks) {
    function beforeEach() {
        return configuration_1.Configuration.defaultBeforeEach;
    }
    Hooks.beforeEach = beforeEach;
    function beforeAll() {
        return configuration_1.Configuration.defaultBeforeAll;
    }
    Hooks.beforeAll = beforeAll;
    function afterEach() {
        return configuration_1.Configuration.defaultAfterEach;
    }
    Hooks.afterEach = afterEach;
    function afterAll() {
        return configuration_1.Configuration.defaultAfterAll;
    }
    Hooks.afterAll = afterAll;
    function setDefault(hooks) {
        if (hooks) {
            configuration_1.Configuration.defaultBeforeEach = hooks.beforeEach ? hooks.beforeEach : configuration_1.Configuration.defaultBeforeEach;
            configuration_1.Configuration.defaultBeforeAll = hooks.beforeAll ? hooks.beforeAll : configuration_1.Configuration.defaultBeforeAll;
            configuration_1.Configuration.defaultAfterEach = hooks.afterEach ? hooks.afterEach : configuration_1.Configuration.defaultAfterEach;
            configuration_1.Configuration.defaultAfterAll = hooks.afterAll ? hooks.afterAll : configuration_1.Configuration.defaultAfterAll;
        }
    }
    Hooks.setDefault = setDefault;
    function addDefault(hooks) {
        if (hooks) {
            configuration_1.Configuration.defaultBeforeEach = hooks.beforeEach
                ? configuration_1.Configuration.defaultBeforeEach
                    ? utils_1.Utils.mergeFunctions(configuration_1.Configuration.defaultBeforeEach, hooks.beforeEach)
                    : hooks.beforeEach
                : configuration_1.Configuration.defaultBeforeEach;
            configuration_1.Configuration.defaultBeforeAll = hooks.beforeAll
                ? configuration_1.Configuration.defaultBeforeAll
                    ? utils_1.Utils.mergeFunctions(configuration_1.Configuration.defaultBeforeAll, hooks.beforeAll)
                    : hooks.beforeAll
                : configuration_1.Configuration.defaultBeforeAll;
            configuration_1.Configuration.defaultAfterEach = hooks.afterEach
                ? configuration_1.Configuration.defaultAfterEach
                    ? utils_1.Utils.mergeFunctions(configuration_1.Configuration.defaultAfterEach, hooks.afterEach)
                    : hooks.afterEach
                : configuration_1.Configuration.defaultAfterEach;
            configuration_1.Configuration.defaultAfterAll = hooks.afterAll
                ? configuration_1.Configuration.defaultAfterAll
                    ? utils_1.Utils.mergeFunctions(configuration_1.Configuration.defaultAfterAll, hooks.afterAll)
                    : hooks.afterAll
                : configuration_1.Configuration.defaultAfterAll;
        }
    }
    Hooks.addDefault = addDefault;
})(Hooks = exports.Hooks || (exports.Hooks = {}));
//# sourceMappingURL=hooks.js.map