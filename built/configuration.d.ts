import { Types } from "./types";
export declare namespace Configuration {
    import TestFunction = Types.TestFunction;
    let includesFilter: string;
    let conditionalFilter: string;
    let verboseMode: string;
    let defaultBeforeEach: TestFunction | null;
    let defaultBeforeAll: TestFunction | null;
    let defaultAfterEach: TestFunction | null;
    let defaultAfterAll: TestFunction | null;
}
