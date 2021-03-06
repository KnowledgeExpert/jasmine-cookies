import { Describe as describe } from './describe';
import { It as it } from './it';
import { pIt as pit } from './pIt';
import { Hooks as hooks } from './hooks';
import { Types } from './types';
export declare const Describe: typeof describe.build;
export declare const It: typeof it.build;
export declare const test: typeof it.build;
export declare const pIt: typeof pit.build;
export declare const pTest: typeof pit.build;
export declare const setFilter: (filter: any) => any;
export declare const setConditionalFilter: (filter: any) => any;
export declare const setDefaultHooks: typeof hooks.setDefault;
export declare const addDefaultHooks: typeof hooks.addDefault;
export declare const TestDataSourceType: typeof Types.TestDataSourceType;
export { Configuration } from './configuration';
