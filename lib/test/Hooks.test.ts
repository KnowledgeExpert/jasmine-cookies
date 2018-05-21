import {Describe as descr} from '../describe';
import {It as it} from '../it';
import {Hooks} from '../hooks';

const Describe = descr.build;
const It = it.build;

Describe('Hooks', () => {

    beforeEach(() => {
        Hooks.defaultAfterAll = null;
        Hooks.defaultAfterEach = null;
        Hooks.defaultBeforeAll = null;
        Hooks.defaultBeforeEach = null;
    });

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

    Describe('addDefault', () => {
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