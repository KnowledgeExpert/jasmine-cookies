"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
var Hooks;
(function (Hooks) {
    function setDefault(hooks) {
        if (hooks) {
            Hooks.defaultBeforeEach = hooks.beforeEach ? hooks.beforeEach : Hooks.defaultBeforeEach;
            Hooks.defaultBeforeAll = hooks.beforeAll ? hooks.beforeAll : Hooks.defaultBeforeAll;
            Hooks.defaultAfterEach = hooks.afterEach ? hooks.afterEach : Hooks.defaultAfterEach;
            Hooks.defaultAfterAll = hooks.afterAll ? hooks.afterAll : Hooks.defaultAfterAll;
        }
    }
    Hooks.setDefault = setDefault;
    function addDefault(hooks) {
        if (hooks) {
            Hooks.defaultBeforeEach = hooks.beforeEach
                ? Hooks.defaultBeforeEach
                    ? utils_1.Utils.mergeFunctions(Hooks.defaultBeforeEach, hooks.beforeEach)
                    : hooks.beforeEach
                : Hooks.defaultBeforeEach;
            Hooks.defaultBeforeAll = hooks.beforeAll
                ? Hooks.defaultBeforeAll
                    ? utils_1.Utils.mergeFunctions(Hooks.defaultBeforeAll, hooks.beforeAll)
                    : hooks.beforeAll
                : Hooks.defaultBeforeAll;
            Hooks.defaultAfterEach = hooks.afterEach
                ? Hooks.defaultAfterEach
                    ? utils_1.Utils.mergeFunctions(Hooks.defaultAfterEach, hooks.afterEach)
                    : hooks.afterEach
                : Hooks.defaultAfterEach;
            Hooks.defaultAfterAll = hooks.afterAll
                ? Hooks.defaultAfterAll
                    ? utils_1.Utils.mergeFunctions(Hooks.defaultAfterAll, hooks.afterAll)
                    : hooks.afterAll
                : Hooks.defaultAfterAll;
        }
    }
    Hooks.addDefault = addDefault;
})(Hooks = exports.Hooks || (exports.Hooks = {}));
//# sourceMappingURL=hooks.js.map