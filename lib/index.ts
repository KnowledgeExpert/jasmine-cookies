// Copyright 2018 Knowledge Expert SA
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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