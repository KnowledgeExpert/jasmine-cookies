import {Describe as describe} from './describe';
import {It as it} from './it';
import {pIt as pit} from './pIt';
import {Hooks as hooks} from './hooks';
import {Types} from './types';
import {Configuration} from "./configuration";


export const Describe = describe.build;
export const It = it.build;
export const test = It;
export const pIt = pit.build;
export const pTest = pIt;

//deprecated, use Configuration.includesFilter etc.
export const setFilter = (filter) => Configuration.includesFilter = filter;
export const setConditionalFilter = (filter) => Configuration.conditionalFilter = filter;

export const setDefaultHooks = hooks.setDefault;
export const addDefaultHooks = hooks.addDefault;
export const TestDataSourceType = Types.TestDataSourceType;
export {Configuration} from './configuration';