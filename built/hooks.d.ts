import { Types } from './types';
import TestFunction = Types.TestFunction;
export declare namespace Hooks {
    let defaultBeforeEach: TestFunction | null;
    let defaultBeforeAll: TestFunction | null;
    let defaultAfterEach: TestFunction | null;
    let defaultAfterAll: TestFunction | null;
    function beforeEach(): Types.TestFunction;
    function beforeAll(): Types.TestFunction;
    function afterEach(): Types.TestFunction;
    function afterAll(): Types.TestFunction;
    function setDefault(hooks: {
        beforeEach?: TestFunction;
        afterEach?: TestFunction;
        beforeAll?: TestFunction;
        afterAll?: TestFunction;
    }): void;
    function addDefault(hooks: {
        beforeEach?: TestFunction;
        afterEach?: TestFunction;
        beforeAll?: TestFunction;
        afterAll?: TestFunction;
    }): void;
}
