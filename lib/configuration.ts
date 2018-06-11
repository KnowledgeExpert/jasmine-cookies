import {Types} from "./types";

export namespace Configuration {
    import TestFunction = Types.TestFunction;
    export let includesFilter = process.env.JASMINE_COOKIES_FILTER;
    export let conditionalFilter = process.env.JASMINE_COOKIES_CONDITIONAL_FILTER;

    //debug purposes only
    export let dummyTests = false;

    export let defaultBeforeEach: TestFunction | null;
    export let defaultBeforeAll: TestFunction | null;
    export let defaultAfterEach: TestFunction | null;
    export let defaultAfterAll: TestFunction | null;
}