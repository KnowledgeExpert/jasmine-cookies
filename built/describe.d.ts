import { Types } from './types';
import SuiteOptions = Types.SuiteOptions;
export declare namespace Describe {
    let currentSuiteName: string | null;
    function build(suiteNameOrOptions: string | SuiteOptions, func: () => void): void;
}
