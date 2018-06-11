import {Types} from './types';
import {Hooks} from './hooks';
import {Configuration} from "./configuration";
import SuiteOptions = Types.SuiteOptions;


export namespace Describe {

    export let currentSuiteName: string | null;

    export function build(suiteNameOrOptions: string | SuiteOptions, func: () => void) {
        if (typeof suiteNameOrOptions === 'string') {
            currentSuiteName = suiteNameOrOptions;
        } else {
            currentSuiteName = suiteNameOrOptions.suite;
        }

        buildHooks(suiteNameOrOptions as SuiteOptions);

        describe(currentSuiteName, func);
    }

    function buildHooks(suiteOptions: SuiteOptions) {
        if (!Configuration.dummyTests) {
            const currentBeforeEach = suiteOptions.beforeEach ? suiteOptions.beforeEach : Hooks.beforeEach() ? Hooks.beforeEach() : null;
            const currentBeforeAll = suiteOptions.beforeAll ? suiteOptions.beforeAll : Hooks.beforeAll() ? Hooks.beforeAll() : null;
            const currentAfterEach = suiteOptions.afterEach ? suiteOptions.afterEach : Hooks.afterEach() ? Hooks.afterEach() : null;
            const currentAfterAll = suiteOptions.afterAll ? suiteOptions.afterAll : Hooks.afterAll() ? Hooks.afterAll() : null;

            if (currentBeforeEach) beforeEach(currentBeforeEach);
            if (currentBeforeAll) beforeAll(currentBeforeAll);
            if (currentAfterEach) afterEach(currentAfterEach);
            if (currentAfterAll) afterAll(currentAfterAll);
        }
    }
}
