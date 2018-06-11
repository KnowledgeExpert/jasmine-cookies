"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Configuration;
(function (Configuration) {
    Configuration.includesFilter = process.env.JASMINE_COOKIES_FILTER;
    Configuration.conditionalFilter = process.env.JASMINE_COOKIES_CONDITIONAL_FILTER;
    //debug purposes only
    Configuration.dummyTests = false;
})(Configuration = exports.Configuration || (exports.Configuration = {}));
//# sourceMappingURL=configuration.js.map