"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testUtils_1 = require("../testUtils");
const test_1 = require("../test");
var Describe = test_1.Test.Describe;
var It = test_1.Test.It;
Describe(`Filter matcher`, () => {
    const match = testUtils_1.TestUtils.match;
    [
        { filter: null, text: `foo` },
        { filter: null, text: `` },
        { filter: null, text: null }
    ].forEach(data => {
        It(`Should match anything if filter is null\n\tfilter - '${data.filter}' text - '${data.text}'`, () => {
            expect(match(data.filter, data.text)).toBe(true);
        });
    });
    It(`Should not match if text is null`, () => {
        expect(match('foo', null)).toBe(false);
    });
    It(`Should match exact text`, () => {
        expect(match(`foo`, `foo`)).toBe(true);
    });
    It(`Should match exact text with spaces`, () => {
        expect(match(`"foo bar"`, `foo bar`)).toBe(true);
    });
    [
        { filter: `foo`, text: `foobar` },
        { filter: `foo`, text: `foo bar` },
        { filter: `foo`, text: `barfoo` },
        { filter: `foo`, text: `bar foo` },
    ].forEach(data => {
        It(`Should match includes text\n\tfilter - '${data.filter}' text - '${data.text}'`, () => {
            expect(match(data.filter, data.text)).toBe(true);
        });
    });
    [
        { filter: `"foo bar"`, text: `foo bardice` },
        { filter: `"foo bar"`, text: `foo bar dice` },
        { filter: `"foo bar"`, text: `dicefoo bar` },
        { filter: `"foo bar"`, text: `dice foo bar` },
    ].forEach(data => {
        It(`Should match includes text with spaces\n\tfilter - '${data.filter}' text - '${data.text}'`, () => {
            expect(match(data.filter, data.text)).toBe(true);
        });
    });
    [
        { filter: `foo OR bar`, text: `foo dice` },
        { filter: `foo OR bar`, text: `foodice` },
        { filter: `foo OR bar`, text: `dice bar` },
        { filter: `foo OR bar`, text: `dicebar` },
        { filter: `foo | bar`, text: `foo dice` },
    ].forEach(data => {
        It(`Should match includes text with OR operator\n\tfilter - '${data.filter}' text - '${data.text}'`, () => {
            expect(match(data.filter, data.text)).toBe(true);
        });
    });
    [
        { filter: `foo AND bar`, text: `foo bar` },
        { filter: `foo AND bar`, text: `bar foo` },
        { filter: `foo AND bar`, text: `foobar` },
        { filter: `foo AND bar`, text: `barfoo` },
        { filter: `foo AND bar`, text: `foo bar dice` },
        { filter: `foo AND bar`, text: `foo bardice` },
        { filter: `foo AND bar`, text: `foobar dice` },
        { filter: `foo AND bar`, text: `foo dice bar` },
        { filter: `foo AND bar`, text: `foo dicebar` },
        { filter: `foo AND bar`, text: `foodice bar` },
        { filter: `foo AND bar`, text: `dice foo bar` },
        { filter: `foo AND bar`, text: `dice foobar` },
        { filter: `foo AND bar`, text: `dicefoo bar` },
        { filter: `foo AND bar`, text: `dice bar foo` },
        { filter: `foo AND bar`, text: `dice barfoo` },
        { filter: `foo AND bar`, text: `dicebar foo` },
        { filter: `foo & bar`, text: `foo bar` }
    ].forEach(data => {
        It(`Should match includes text with AND operator\n\tfilter - '${data.filter}' text - '${data.text}'`, () => {
            expect(match(data.filter, data.text)).toBe(true);
        });
    });
    [
        { filter: `NOT foo`, text: `bar` },
        { filter: `!foo`, text: `bar` },
        { filter: `!foo`, text: `` }
    ].forEach(data => {
        It(`Should match includes text with NOT operator\n\tfilter - '${data.filter}' text - '${data.text}'`, () => {
            expect(match(data.filter, data.text)).toBe(true);
        });
    });
    [
        { filter: `("hello world" | dicenice) & !dragon"`, text: `hello world dicenice foo` },
    ].forEach(data => {
        It(`Should match complex expressions\n\tfilter - '${data.filter}' text - '${data.text}'`, () => {
            expect(match(data.filter, data.text)).toBe(true);
        });
    });
});
//# sourceMappingURL=Filter.test.js.map