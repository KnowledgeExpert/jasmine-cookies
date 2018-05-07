import {Test} from "./test";

export {Test};
export const Describe = Test.Describe;
export const It = Test.It;
export const test = Test.It;
export const pIt = Test.pIt;
export const pTest = Test.pIt;
export const filter = Test.setIncludesFilter;
export const conditionalFilter = Test.setConditionalFilter;
export const setDefaultHooks = Test.setDefaultHooks;

import {Types} from "./types";
export const TestDataSourceType = Types.TestDataSourceType;