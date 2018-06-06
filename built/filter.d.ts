export declare namespace Filter {
    let includesFilter: string;
    let conditionalFilter: string;
    function setIncludesFilter(filterExpr: string): void;
    function setConditionalFilter(filterExpr: string): void;
    function includesFilterMatch(text: string): boolean;
    function conditionalFilterMatch(text: string): boolean;
}
