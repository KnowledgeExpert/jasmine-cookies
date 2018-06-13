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
        it(description, configuration_1.Configuration.dummyTests ? () => true : func);
    }
})(It = exports.It || (exports.It = {}));
//# sourceMappingURL=it.js.map