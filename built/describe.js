"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("./hooks");
var Describe;
(function (Describe) {
    function build(suiteNameOrOptions, func) {
        if (typeof suiteNameOrOptions === 'string') {
            Describe.currentSuiteName = suiteNameOrOptions;
        }
        else {
            Describe.currentSuiteName = suiteNameOrOptions.suite;
        }
        const currentBeforeEach = suiteNameOrOptions.beforeEach ? suiteNameOrOptions.beforeEach : hooks_1.Hooks.beforeEach() ? hooks_1.Hooks.beforeEach() : null;
        const currentBeforeAll = suiteNameOrOptions.beforeAll ? suiteNameOrOptions.beforeAll : hooks_1.Hooks.beforeAll() ? hooks_1.Hooks.beforeAll() : null;
        const currentAfterEach = suiteNameOrOptions.afterEach ? suiteNameOrOptions.afterEach : hooks_1.Hooks.afterEach() ? hooks_1.Hooks.afterEach() : null;
        const currentAfterAll = suiteNameOrOptions.afterAll ? suiteNameOrOptions.afterAll : hooks_1.Hooks.afterAll() ? hooks_1.Hooks.afterAll() : null;
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