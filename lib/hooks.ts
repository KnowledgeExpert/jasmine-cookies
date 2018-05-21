import {Types} from './types';
import {Utils} from './utils';
import TestFunction = Types.TestFunction;


export namespace Hooks {
    export let defaultBeforeEach: TestFunction | null;
    export let defaultBeforeAll: TestFunction | null;
    export let defaultAfterEach: TestFunction | null;
    export let defaultAfterAll: TestFunction | null;


    export function setDefault(hooks: {
        beforeEach?: TestFunction,
        afterEach?: TestFunction,
        beforeAll?: TestFunction,
        afterAll?: TestFunction
    }) {
        if (hooks) {
            defaultBeforeEach = hooks.beforeEach ? hooks.beforeEach : defaultBeforeEach;
            defaultBeforeAll = hooks.beforeAll ? hooks.beforeAll : defaultBeforeAll;
            defaultAfterEach = hooks.afterEach ? hooks.afterEach : defaultAfterEach;
            defaultAfterAll = hooks.afterAll ? hooks.afterAll : defaultAfterAll;
        }
    }

    export function addDefault(hooks: {
        beforeEach?: TestFunction,
        afterEach?: TestFunction,
        beforeAll?: TestFunction,
        afterAll?: TestFunction
    }) {
        if (hooks) {
            defaultBeforeEach = hooks.beforeEach
                ? defaultBeforeEach
                    ? Utils.mergeFunctions(defaultBeforeEach, hooks.beforeEach)
                    : hooks.beforeEach
                : defaultBeforeEach;

            defaultBeforeAll = hooks.beforeAll
                ? defaultBeforeAll
                    ? Utils.mergeFunctions(defaultBeforeAll, hooks.beforeAll)
                    : hooks.beforeAll
                : defaultBeforeAll;

            defaultAfterEach = hooks.afterEach
                ? defaultAfterEach
                    ? Utils.mergeFunctions(defaultAfterEach, hooks.afterEach)
                    : hooks.afterEach
                : defaultAfterEach;

            defaultAfterAll = hooks.afterAll
                ? defaultAfterAll
                    ? Utils.mergeFunctions(defaultAfterAll, hooks.afterAll)
                    : hooks.afterAll
                : defaultAfterAll;
        }
    }
}

