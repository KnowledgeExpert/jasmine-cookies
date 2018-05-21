import {Types} from './types';
import {Hooks} from './hooks';
import SuiteOptions = Types.SuiteOptions;


export namespace Describe {

    export let currentSuiteName: string | null;

    export function build(suiteNameOrOptions: string | SuiteOptions, func: () => void) {
        if (typeof suiteNameOrOptions === 'string') {
            currentSuiteName = suiteNameOrOptions;
        } else {
            currentSuiteName = suiteNameOrOptions.suite;
        }

        const currentBeforeEach = (suiteNameOrOptions as any).beforeEach ? (suiteNameOrOptions as any).beforeEach : Hooks.beforeEach() ? Hooks.beforeEach() : null;
        const currentBeforeAll = (suiteNameOrOptions as any).beforeAll ? (suiteNameOrOptions as any).beforeAll : Hooks.beforeAll() ? Hooks.beforeAll() : null;
        const currentAfterEach = (suiteNameOrOptions as any).afterEach ? (suiteNameOrOptions as any).afterEach : Hooks.afterEach() ? Hooks.afterEach() : null;
        const currentAfterAll = (suiteNameOrOptions as any).afterAll ? (suiteNameOrOptions as any).afterAll : Hooks.afterAll() ? Hooks.afterAll() : null;

        if (currentBeforeEach) beforeEach(currentBeforeEach);
        if (currentBeforeAll) beforeAll(currentBeforeAll);
        if (currentAfterEach) afterEach(currentAfterEach);
        if (currentAfterAll) afterAll(currentAfterAll);

        describe(currentSuiteName, func);
    }
}
