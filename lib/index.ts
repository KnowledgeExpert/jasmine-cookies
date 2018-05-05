import {Test} from "./test";

export const Describe = Test.Describe;
export const pIt = Test.pIt;
export const It = Test.It;
export const filter = Test.setIncludesFilter;
export const conditionalFilter = Test.setConditionalFilter;
export const setDefaultHooks = Test.setDefaultHooks;

import {Types} from "./types";
export const TestDataSourceType = Types.TestDataSourceType;