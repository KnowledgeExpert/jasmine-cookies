"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("./hooks");
var defaultBeforeEach = hooks_1.Hooks.defaultBeforeEach;
var defaultBeforeAll = hooks_1.Hooks.defaultBeforeAll;
var defaultAfterEach = hooks_1.Hooks.defaultAfterEach;
var defaultAfterAll = hooks_1.Hooks.defaultAfterAll;
var Describe;
(function (Describe) {
    function build(suiteNameOrOptions, func) {
        if (typeof suiteNameOrOptions === 'string') {
            Describe.currentSuiteName = suiteNameOrOptions;
        }
        else {
            Describe.currentSuiteName = suiteNameOrOptions.suite;
        }
        const currentBeforeEach = suiteNameOrOptions.beforeEach ? suiteNameOrOptions.beforeEach : defaultBeforeEach ? defaultBeforeEach : null;
        const currentBeforeAll = suiteNameOrOptions.beforeAll ? suiteNameOrOptions.beforeAll : defaultBeforeAll ? defaultBeforeAll : null;
        const currentAfterEach = suiteNameOrOptions.afterEach ? suiteNameOrOptions.afterEach : defaultAfterEach ? defaultAfterEach : null;
        const currentAfterAll = suiteNameOrOptions.afterAll ? suiteNameOrOptions.afterAll : defaultAfterAll ? defaultAfterAll : null;
        if (currentBeforeEach)
            beforeEach(currentBeforeEach);
        if (currentBeforeAll)
            beforeAll(currentBeforeAll);
        if (currentAfterEach)
            afterEach(currentAfterEach);
        if (currentAfterAll)
            afterAll(currentAfterAll);
        describe(Describe.currentSuiteName, func);
    }
    Describe.build = build;
})(Describe = exports.Describe || (exports.Describe = {}));
//# sourceMappingURL=describe.js.map