import {Describe as describe} from './describe';
import {It as it} from './it';
import {pIt as pit} from './pIt';
import {Hooks as hooks} from './hooks';
import {Filter as filter} from './filter';
import {Types} from './types';


export const Describe = describe.build;
export const It = it.build;
export const test = It;
export const pIt = pit.build;
export const pTest = pIt;
export const setFilter = filter.setIncludesFilter;
export const setConditionalFilter = filter.setConditionalFilter;
export const setDefaultHooks = hooks.setDefault;
export const addDefaultHooks = hooks.addDefault;
export const TestDataSourceType = Types.TestDataSourceType;
