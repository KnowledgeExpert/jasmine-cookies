import {Types} from './types';
import {Utils} from './utils';
import TestFunction = Types.TestFunction;
import {Configuration} from "./configuration";


export namespace Hooks {
    
    export function beforeEach() {
        return Configuration.defaultBeforeEach;
    }

    export function beforeAll() {
        return Configuration.defaultBeforeAll;
    }

    export function afterEach() {
        return Configuration.defaultAfterEach;
    }

    export function afterAll() {
        return Configuration.defaultAfterAll;
    }

    export function setDefault(hooks: {
        beforeEach?: TestFunction,
        afterEach?: TestFunction,
        beforeAll?: TestFunction,
        afterAll?: TestFunction
    }) {
        if (hooks) {
            Configuration.defaultBeforeEach = hooks.beforeEach ? hooks.beforeEach : Configuration.defaultBeforeEach;
            Configuration.defaultBeforeAll = hooks.beforeAll ? hooks.beforeAll : Configuration.defaultBeforeAll;
            Configuration.defaultAfterEach = hooks.afterEach ? hooks.afterEach : Configuration.defaultAfterEach;
            Configuration.defaultAfterAll = hooks.afterAll ? hooks.afterAll : Configuration.defaultAfterAll;
        }
    }

    export function addDefault(hooks: {
        beforeEach?: TestFunction,
        afterEach?: TestFunction,
        beforeAll?: TestFunction,
        afterAll?: TestFunction
    }) {
        if (hooks) {
            Configuration.defaultBeforeEach = hooks.beforeEach
                ? Configuration.defaultBeforeEach
                    ? Utils.mergeFunctions(Configuration.defaultBeforeEach, hooks.beforeEach)
                    : hooks.beforeEach
                : Configuration.defaultBeforeEach;

            Configuration.defaultBeforeAll = hooks.beforeAll
                ? Configuration.defaultBeforeAll
                    ? Utils.mergeFunctions(Configuration.defaultBeforeAll, hooks.beforeAll)
                    : hooks.beforeAll
                : Configuration.defaultBeforeAll;

            Configuration.defaultAfterEach = hooks.afterEach
                ? Configuration.defaultAfterEach
                    ? Utils.mergeFunctions(Configuration.defaultAfterEach, hooks.afterEach)
                    : hooks.afterEach
                : Configuration.defaultAfterEach;

            Configuration.defaultAfterAll = hooks.afterAll
                ? Configuration.defaultAfterAll
                    ? Utils.mergeFunctions(Configuration.defaultAfterAll, hooks.afterAll)
                    : hooks.afterAll
                : Configuration.defaultAfterAll;
        }
    }
}

