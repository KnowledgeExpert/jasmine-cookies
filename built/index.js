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
const describe_1 = require("./describe");
const it_1 = require("./it");
const pIt_1 = require("./pIt");
const hooks_1 = require("./hooks");
const types_1 = require("./types");
const configuration_1 = require("./configuration");
exports.Describe = describe_1.Describe.build;
exports.It = it_1.It.build;
exports.test = exports.It;
exports.pIt = pIt_1.pIt.build;
exports.pTest = exports.pIt;
//deprecated, use Configuration.includesFilter etc.
exports.setFilter = (filter) => configuration_1.Configuration.includesFilter = filter;
exports.setConditionalFilter = (filter) => configuration_1.Configuration.conditionalFilter = filter;
exports.setDefaultHooks = hooks_1.Hooks.setDefault;
exports.addDefaultHooks = hooks_1.Hooks.addDefault;
exports.TestDataSourceType = types_1.Types.TestDataSourceType;
var configuration_2 = require("./configuration");
exports.Configuration = configuration_2.Configuration;
//# sourceMappingURL=index.js.map