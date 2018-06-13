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

import {Types} from "./types";

export namespace Configuration {
    import TestFunction = Types.TestFunction;
    export let includesFilter = process.env.JASMINE_COOKIES_FILTER;
    export let conditionalFilter = process.env.JASMINE_COOKIES_CONDITIONAL_FILTER;

    //debug purposes only
    export let dummyTests = false;

    export let defaultBeforeEach: TestFunction | null;
    export let defaultBeforeAll: TestFunction | null;
    export let defaultAfterEach: TestFunction | null;
    export let defaultAfterAll: TestFunction | null;
}