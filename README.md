## Jasmine Cookies

Jasmine extensions is a module with several helper functions.

### [It](./lib/test.ts)

This helper is a wrapper around jasmine `it` which adds user-friendly filtering. Test will be launched only in case if test name passes filtering expression (if no expression provided all tests will run by default).

Code sample:
```
const Test = require("jasmine-cookies");

Test.Describe("...", () => {
    Test.It('test id 101', async () => {
        ...
    });
});
```

Filter expression samples:
```
`Test.filter("foo OR bar")` // choose only tests which name contains 'foo' and 'bar'
`Test.filter("foo OR ( bar AND id )")` // choose only tests which name contains 'foo' or (contains 'bar' and contains 'id')
`Test.filter("foo | ( bar & !id )")` // choose only tests which name contains 'foo' or (contains 'bar' and don't contains 'id')
`Test.filter("foo OR bar")` // choose only tests which name contains 'foo' or 'bar'
`Test.filter("NOT foo OR bar")` // choose only tests which name don't contains 'foo' or contains 'bar'
```
Note:
 - `Test.filter(...)` should be called before any `It` or `pIt`, or it can be set in environment variable `JASMINE_COOKIES_FILTER`
 - filter expression will be applied to concatenated `Describe` and `It`/`pIt` descriptions, DO NOT USE 'raw' jasmine `describe` with `It`'s!

## [pIt](./lib/test.ts)

This helper is a wrapper around jasmine `it` which adds parametrized testing (when same test performs on multiple data sets). Basically `pIt` performs data processing and run `It` on each data set using `description` property as test name.

Possible data sources:
  * `any[]` - javascript objects array
    * code sample:
      ```
      const Test = require("jasmine-cookies");
      const pIt = Test.pIt;

      const dataSource = [
          { description: 'test 1', a: 1, b: 2},
          { description: 'test 2', a: 3, b: 4},
          { description: 'test 3', a: 5, b: 6}
      ];
      pIt({data: {type: TestDataSourceType.DATA_ARRAY, source: dataSource}}, async (params) => {
          console.log(`params.a is ${params.a}`);
          console.log(`params.b is ${params.b}`);
      });
      ```
    * output:
      ```
      "test 1"
        params.a is 1
        params.b is 2

      "test 2"
        params.a is 3
        params.b is 4

      "test 3"
        params.a is 5
        params.b is 6
      ```
  * `json` from json file
    * code sample:
      ```
      const path = require("path");
      const Test = require("jasmine-cookies");
      const pIt = Test.pIt;

      const jsonPath = path.resolve('./path_to_json_file.json'); //convert relative path to absolute

      pIt({data: {type: TestDataSourceType.DATA_ARRAY, source: require(jsonpath)}}, async (params) => {
          ...
      });
      ```
  * `xlsx/xlsm` - using Excel tables as a source. Excel table transforms json using `xlsx` and `csv-to-deep-json` libs:
    * code sample:
      ```
      const path = require("path");
      const Test = require("jasmine-cookies");

      const filePath = path.resolve('./file/path/to/sheet.xlsx'); //convert relative path to absolute

      Test.pIt({data: {type: TestDataSourceType.XLSX, xlsxFilePath: filePath}}, async (params) => {
        ...
      });
      ```