## Jasmine-Extensions

Jasmine extensions is a module with several helper functions.

### [It](./lib/test.ts)

This helper is a wrapper around jasmine `it` which adds user-friendly filtering. Test will be launched only in case if test name passes filtering expression (if no expression provided all tests will run by default).

Code sample:
```
Test.It('test id 101', async () => {
    ...
});
```

Filter expression samples:
  * `Test.addFilter("firstPart OR secondPart")` - choose only tests which name contains 'firstPart' and 'secondPart'
  * `Test.addFilter("firstPart OR (secondPart AND thirdPart)")` - choose only tests which name contains 'firstPart' or (contains 'secondPart' and contains 'thirdPart')
  * `Test.addFilter("firstPart | (secondPart & !thirdPart)")` - choose only tests which name contains 'firstPart' or (contains 'secondPart' and don't contains 'thirdPart')
  * `Test.addFilter("firstPart OR secondPart")` - choose only tests which name contains 'firstPart' or 'secondPart'
  * `Test.addFilter("NOT firstPart OR secondPart")` - choose only tests which name don't contains 'firstPart' or contains 'secondPart'


## [pIt](./lib/test.ts)

This helper is a wrapper around jasmine `it` which adds parametrized testing (when same test performs on multiple data sets). Basically `pIt` performs data processing and run `It` on each data set using `description` property as test name.

Possible data sources:
  * `any[]` - javascript objects array
    * code sample:
      ```
      const data = [
          { description: 'test 1', a: 1, b: 2},
          { description: 'test 2', a: 3, b: 4},
          { description: 'test 3', a: 5, b: 6}
      ];
      pIt({data: {type: TestDataSourceType.DATA_ARRAY, source: data}}, async (data) => {
          console.log(`data.a is ${data.a}`);
          console.log(`data.b is ${data.b}`);
      });
      ```
    * output:
      ```
      "test 1"
        data.a is 1
        data.b is 2

      "test 2"
        data.a is 3
        data.b is 4

      "test 3"
        data.a is 5
        data.b is 6
      ```
  * `xlsx/xlsm` - using Excel tables as a source. Excel table transforms json using `xlsx` and `csv-to-deep-json` libs:
    * code sample:
      ```
      pIt({data: {type: TestDataSourceType.XLSX, xlsxFilePath: './file/path/to/sheet.xlsx'}}, async (data) => {
        ...
      });
      ```