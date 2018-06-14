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

import {Describe as descr} from '../describe';
import {It as it} from '../it';
import {Hooks} from '../hooks';

const Describe = descr.build;
const It = it.build;
const setDefault = Hooks.setDefault;
const addDefault = Hooks.addDefault;

setDefault(null);

setDefault({
    beforeAll: null,
    beforeEach: null,
    afterAll: null,
    afterEach: null
});

setDefault({
    beforeAll: async () => console.log('before all'),
    beforeEach: async () => console.log('before each'),
    afterEach: async () => console.log('after each'),
    afterAll: async () => console.log('after all')
});

addDefault({
    beforeAll: () => console.log('before all'),
    beforeEach: () => console.log('before each'),
    afterEach: () => console.log('after each'),
    afterAll: () => console.log('after all')
});

Describe('Hooks', () => {
    It('test1', () => {});
    It('test2', () => {});
});

Describe('Hooks', () => {

    Describe('setDefault', () => {
        const setDefault = Hooks.setDefault;

        It('setDefault should handle falsy value', () => {
            setDefault(null);
        });

        It('setDefault should handle falsy hooks', () => {
            setDefault({
                beforeAll: null,
                beforeEach: null,
                afterAll: null,
                afterEach: null
            });
        });

        It('setDefault should handle before each hook', () => {
            setDefault({beforeEach: () => console.log('before each')});
        });

        It('setDefault should handle before all hook', () => {
            setDefault({beforeAll: () => console.log('before all')});
        });

        It('setDefault should handle after each hook', () => {
            setDefault({afterEach: () => console.log('after each')});
        });

        It('setDefault should handle after all hook', () => {
            setDefault({afterAll: () => console.log('after all')});
        });

        It('setDefault should handle all hooks at the same time', () => {
            setDefault({
                beforeEach: () => console.log('before each'),
                beforeAll: () => console.log('before all'),
                afterEach: () => console.log('after each'),
                afterAll: () => console.log('after all')
            });
        });

    });

Describe({suite: 'addDefault'}, () => {
    const addDefault = Hooks.addDefault;

    It('addDefault should handle falsy value', () => {
        addDefault(null);
    });

    It('addDefault should handle falsy hooks', () => {
        addDefault({
            beforeAll: null,
            beforeEach: null,
            afterAll: null,
            afterEach: null
        });
    });

    It('addDefault should handle before each hook', () => {
        addDefault({beforeEach: () => console.log('before each')});
    });

    It('addDefault should handle before all hook', () => {
        addDefault({beforeAll: () => console.log('before all')});
    });

    It('addDefault should handle after each hook', () => {
        addDefault({afterEach: () => console.log('after each')});
    });

    It('addDefault should handle after all hook', () => {
        addDefault({afterAll: () => console.log('after all')});
    });

    It('addDefault should handle all hooks at the same time', () => {
        addDefault({
            beforeEach: () => console.log('before each'),
            beforeAll: () => console.log('before all'),
            afterEach: () => console.log('after each'),
            afterAll: () => console.log('after all')
        });
    });

});
});