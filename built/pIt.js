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
const it_1 = require("./it");
var pIt;
(function (pIt) {
    /**
     * Method is the wrapper for jasmine 'it' and designed to work with the test data from *.xlsx files, csv files or arrays.
     * Data is prepared(if needed), tests are filtered (if needed) and then these selected tests run as usual
     * @param {PTestOptions} ptestOptions
     * @param {Utils.TestFunction} func
     */
    function build(ptestOptions, func) {
        for (const testData of utils_1.Utils.prepareTestDataFrom(ptestOptions.data)) {
            if (utils_1.Utils.filterByPropertyValue(testData, ptestOptions.filterBy)) {
                it_1.It.build({
                    case: testData.description,
                }, func.bind(this, testData));
            }
        }
    }
    pIt.build = build;
})(pIt = exports.pIt || (exports.pIt = {}));
//# sourceMappingURL=pIt.js.map