import { Types } from './types';
import TestOptions = Types.TestOptions;
import TestFunction = Types.TestFunction;
export declare namespace It {
    function build(testNameOrOptions: string | TestOptions, func: TestFunction): void;
}
