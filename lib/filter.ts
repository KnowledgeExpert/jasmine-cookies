import {Configuration} from "./configuration";

export namespace Filter {

    // export function setIncludesFilter(filterExpr: string): void {
    //     Configuration.includesFilter = filterExpr;
    // }
    //
    // export function setConditionalFilter(filterExpr: string): void {
    //     Configuration.conditionalFilter = filterExpr;
    // }

    export function includesFilterMatch(text: string) {
        if (!Configuration.includesFilter || Configuration.includesFilter.length === 0) return true;
        if (text === null || text === undefined) return false;
        return text.includes(Configuration.includesFilter);
    }

    export function conditionalFilterMatch(text: string): boolean {
        if (!Configuration.conditionalFilter || Configuration.conditionalFilter.length === 0) return true;
        if (text === null || text === undefined) return false;

        // replace operands with
        const operandsPairs = {
            'AND': '&',
            'OR': '|',
            'NOT': '!'
        };

        let filterWithTransformedOperators = (' ' + Configuration.conditionalFilter).slice(1); // hack for copy filter expression itself
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