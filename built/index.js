"use strict";
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