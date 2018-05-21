"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Filter;
(function (Filter) {
    Filter.includesFilter = process.env.JASMINE_COOKIES_FILTER;
    Filter.conditionalFilter = process.env.JASMINE_COOKIES_CONDITIONAL_FILTER;
    function setIncludesFilter(filterExpr) {
        Filter.includesFilter = filterExpr;
    }
    Filter.setIncludesFilter = setIncludesFilter;
    function setConditionalFilter(filterExpr) {
        Filter.conditionalFilter = filterExpr;
    }
    Filter.setConditionalFilter = setConditionalFilter;
    function includesFiletrMatch(text) {
        if (!Filter.includesFilter || Filter.includesFilter.length === 0)
            return true;
        if (text === null || text === undefined)
            return false;
        return text.includes(Filter.includesFilter);
    }
    Filter.includesFiletrMatch = includesFiletrMatch;
    function conditionalFilterMatch(text) {
        if (!Filter.conditionalFilter || Filter.conditionalFilter.length === 0)
            return true;
        if (text === null || text === undefined)
            return false;
        // replace operands with
        const operandsPairs = {
            'AND': '&',
            'OR': '|',
            'NOT': '!'
        };
        let filterWithTransformedOperators = (' ' + Filter.conditionalFilter).slice(1); // hack for copy filter expression itself
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