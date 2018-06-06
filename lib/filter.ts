export namespace Filter {

    export let includesFilter = process.env.JASMINE_COOKIES_FILTER;
    export let conditionalFilter = process.env.JASMINE_COOKIES_CONDITIONAL_FILTER;

    export function setIncludesFilter(filterExpr: string): void {
        includesFilter = filterExpr;
    }

    export function setConditionalFilter(filterExpr: string): void {
        conditionalFilter = filterExpr;
    }

    export function includesFilterMatch(text: string) {
        if (!includesFilter || includesFilter.length === 0) return true;
        if (text === null || text === undefined) return false;
        return text.includes(includesFilter);
    }

    export function conditionalFilterMatch(text: string): boolean {
        if (!conditionalFilter || conditionalFilter.length === 0) return true;
        if (text === null || text === undefined) return false;

        // replace operands with
        const operandsPairs = {
            'AND': '&',
            'OR': '|',
            'NOT': '!'
        };

        let filterWithTransformedOperators = (' ' + conditionalFilter).slice(1); // hack for copy filter expression itself
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

}