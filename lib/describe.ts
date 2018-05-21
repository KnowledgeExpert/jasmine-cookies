import {Types} from './types';
import SuiteOptions = Types.SuiteOptions;
import {Hooks} from './hooks';
import defaultBeforeEach = Hooks.defaultBeforeEach;
import defaultBeforeAll = Hooks.defaultBeforeAll;
import defaultAfterEach = Hooks.defaultAfterEach;
import defaultAfterAll = Hooks.defaultAfterAll;


export namespace Describe {
    export let currentSuiteName: string | null;

    export function build(suiteNameOrOptions: string | SuiteOptions, func: () => void) {
        if (typeof suiteNameOrOptions === 'string') {
            currentSuiteName = suiteNameOrOptions;
        } else {
            currentSuiteName = suiteNameOrOptions.suite;
        }

        const currentBeforeEach = (suiteNameOrOptions as any).beforeEach ? (suiteNameOrOptions as any).beforeEach : defaultBeforeEach ? defaultBeforeEach : null;
        const currentBeforeAll = (suiteNameOrOptions as any).beforeAll ? (suiteNameOrOptions as any).beforeAll : defaultBeforeAll ? defaultBeforeAll : null;
        const currentAfterEach = (suiteNameOrOptions as any).afterEach ? (suiteNameOrOptions as any).afterEach : defaultAfterEach ? defaultAfterEach : null;
        const currentAfterAll = (suiteNameOrOptions as any).afterAll ? (suiteNameOrOptions as any).afterAll : defaultAfterAll ? defaultAfterAll : null;

        if (currentBeforeEach) beforeEach(currentBeforeEach);
        if (currentBeforeAll) beforeAll(currentBeforeAll);
        if (currentAfterEach) afterEach(currentAfterEach);
        if (currentAfterAll) afterAll(currentAfterAll);

        describe(currentSuiteName, func);
    }
}
