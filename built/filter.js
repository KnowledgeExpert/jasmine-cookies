"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_1 = require("./configuration");
var Filter;
(function (Filter) {
    // export function setIncludesFilter(filterExpr: string): void {
    //     Configuration.includesFilter = filterExpr;
    // }
    //
    // export function setConditionalFilter(filterExpr: string): void {
    //     Configuration.conditionalFilter = filterExpr;
    // }
    function includesFilterMatch(text) {
        if (!configuration_1.Configuration.includesFilter || configuration_1.Configuration.includesFilter.length === 0)
            return true;
        if (text === null || text === undefined)
            return false;
        return text.includes(configuration_1.Configuration.includesFilter);
    }
    Filter.includesFilterMatch = includesFilterMatch;
    function conditionalFilterMatch(text) {
        if (!configuration_1.Configuration.conditionalFilter || configuration_1.Configuration.conditionalFilter.length === 0)
            return true;
        if (text === null || text === undefined)
            return false;
        // replace operands with
        const operandsPairs = {
            'AND': '&',
            'OR': '|',
            'NOT': '!'
        };
        let filterWithTransformedOperators = (' ' + configuration_1.Configuration.conditionalFilter).slice(1); // hack for copy filter expression itself
        Object.keys(operandsPairs)
            .forEach(operatorDescription => filterWithTransformedOperators = filterWithTransformedOperators.replace(operatorDescription, operandsPairs[operatorDescription]));
        // replace text chunks with bool values
        filterWithTransformedOperators.match(/("[^"]+")|([^ \)\(&|!]+)/g)
            .map(part => {
            const inQuotes = part.includes('"');
            return {
                rawPart: part,
                transformedPart: text.includes(inQuotes ? part.replace(/"/g, '') : part)
            };
        }).forEach(pair => {
            const textToReplace = pair.rawPart;
            const valToReplace = pair.transformedPart;
            filterWithTransformedOperators = filterWithTransformedOperators.replace(textToReplace, String(valToReplace));
        });
        return !!eval(filterWithTransformedOperators);
    }
    Filter.conditionalFilterMatch = conditionalFilterMatch;
})(Filter = exports.Filter || (exports.Filter = {}));
//# sourceMappingURL=filter.js.map