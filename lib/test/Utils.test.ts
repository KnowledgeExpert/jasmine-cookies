import {Describe as descr} from '../describe';
import {It as it} from '../it';
import {Utils} from '../utils';

const Describe = descr.build;
const It = it.build;

Describe('Utils', () => {

    Describe('isAsync', () => {
        const isAsync = Utils.isAsync;

        It('should return false when pass falsy value', () => {
            expect(isAsync(null)).toBe(false);
            expect(isAsync(undefined)).toBe(false);
        });

        It('should return false when pass sync function', () => {
            expect(isAsync(() => null)).toBe(false);
        });

        It('should return true when pass async function', () => {
            expect(isAsync(async () => null)).toBe(true);
        });
    });

    Describe('mergeFunctions', () => {
        const mergeFunctions = Utils.mergeFunctions;

        It('should merge two sync functions', () => {
            let a, b;
            const func1 = () => a = 1;
            const func2 = () => b = 1;
            mergeFunctions(func1, func2)();
            expect(a).toBe(1);
            expect(b).toBe(1);
        });

        It('should merge two async functions', async () => {
            let a, b;
            const func1 = async () => a = 1;
            const func2 = async () => b = 1;
            await mergeFunctions(func1, func2)();
            expect(a).toBe(1);
            expect(b).toBe(1);
        });

        It('should merge async and sync function', async () => {
            let a, b;
            const func1 = () => a = 1;
            const func2 = async () => b = 1;
            await mergeFunctions(func1, func2)();
            expect(a).toBe(1);
            expect(b).toBe(1);
        });
    });

});