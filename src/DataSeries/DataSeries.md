## Members

<dl>
<dt><a href="#size">size</a> ⇒ <code>number</code></dt>
<dd><p>Returns the amount of rows in the current DataSeries.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#fromObjects">fromObjects(data)</a> ⇒ <code>DataSeries</code></dt>
<dd><p>Creates a new DataSeries from an array of objects; saves us the hassle of creating Maps
first, as some users and libraries (CSV, JSON) prefer objects.</p>
</dd>
<dt><a href="#fromCSV">fromCSV(filePath)</a></dt>
<dd><p>Load data from a CSV file. Pass in the file path; will use first row as keys for all columns.
Keys (first row) will automatically be converted to camelCase notation (&quot;Column Name&quot; becomes
&quot;columnName&quot;).</p>
</dd>
<dt><a href="#getData">getData()</a> ⇒ <code>Array.&lt;Map&gt;</code></dt>
<dd><p>Returns (raw) data of current DataSeries as an array consisting of Maps.</p>
</dd>
<dt><a href="#getColumn">getColumn(columnName)</a> ⇒ <code>array</code></dt>
<dd><p>Returns all values (rows) of a single column as an array.</p>
</dd>
<dt><a href="#addRows">addRows(...params)</a> ⇒ <code>DataSeries</code></dt>
<dd><p>Adds items to DataSeries; pass in any number of arrays consisting of Maps. Returns a new
(cloned) DataSeries.</p>
</dd>
<dt><a href="#filter">filter(fn)</a> ⇒ <code>DataSeries</code></dt>
<dd><p>Filters DataSeries by a filter function that is called for every row.
Returns a new (cloned) DataSeries.</p>
</dd>
<dt><a href="#addColumn">addColumn(name, Values)</a> ⇒ <code>DataSeries</code></dt>
<dd><p>Adds a new column to DataSeries. Returns a new (cloned) Data Series.</p>
</dd>
<dt><a href="#renameColumns">renameColumns(fn)</a> ⇒ <code>DataSeries</code></dt>
<dd><p>Changes all column keys through a renaming function.</p>
</dd>
<dt><a href="#updateValues">updateValues(fn)</a> ⇒ <code>DataSeries</code></dt>
<dd><p>Updates/changes all values with the return value of the update function provided.
                         return the updated value. Is very useful to e.g. convert strings</p>
</dd>
<dt><a href="#addColumnsFromSegments">addColumnsFromSegments(columnKeys, segmentLength, mapFunction)</a> ⇒ <code>DataSeries</code></dt>
<dd><p>Calls a callback function for segments (a certain amount of rows) for the given columnKeys
until the callback function was called with all possible segments. Helps adding a
derived column from the existing data, e.g. an moving average. Returns a new (cloned)
DataSeries.</p>
</dd>
<dt><a href="#mergeRows">mergeRows(dataToMerge)</a> ⇒ <code>DataSeries</code></dt>
<dd><p>Merges provided data into current DataSeries; resulting DataSeries will have the same
amount of rows as originalDataSeries, but more columns. Returns a new (cloned) DataSeries.</p>
</dd>
<dt><a href="#head">head(amount, [offset])</a> ⇒ <code>DataSeries</code></dt>
<dd><p>Returns the top-most rows as a new (cloned) DataSeries.</p>
</dd>
<dt><a href="#tail">tail(amount, [offset])</a> ⇒ <code>DataSeries</code></dt>
<dd><p>Returns the bottom-most rows as a new (cloned) DataSeries.</p>
</dd>
<dt><a href="#groupBy">groupBy(...groupingFunction)</a> ⇒ <code>DataSeries</code></dt>
<dd><p>Groups data of DataSeries by the configuration provided. Returns an array of arrays with
two values: groupKey and a (cloned) DataSeries for that groupKey.</p>
</dd>
<dt><a href="#sortBy">sortBy(...sortOrders)</a> ⇒ <code>DataSeries</code></dt>
<dd><p>Sorts data of DataSeries by the configuration provided. Returns a new (cloned) DataSeries.</p>
</dd>
<dt><a href="#merge">merge(...dataSeries)</a> ⇒ <code>DataSeries</code></dt>
<dd><p>Merges current DataSeries with one or multiple other DataSeries. Returns a new (cloned)
DataSeries.</p>
</dd>
</dl>

<a name="size"></a>

## size ⇒ <code>number</code>
Returns the amount of rows in the current DataSeries.

**Kind**: global variable  
<a name="fromObjects"></a>

## fromObjects(data) ⇒ <code>DataSeries</code>
Creates a new DataSeries from an array of objects; saves us the hassle of creating Maps
first, as some users and libraries (CSV, JSON) prefer objects.

**Kind**: global function  
**Returns**: <code>DataSeries</code> - DataSeries with data that was passed in as an argument.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;object&gt;</code> | Data as an array of objects, e.g. [                          { date: 1, open: 2.3, close 2.2 },                          { date: 2, open: 2.4, close: 2.3 },                          ] |

<a name="fromCSV"></a>

## fromCSV(filePath)
Load data from a CSV file. Pass in the file path; will use first row as keys for all columns.
Keys (first row) will automatically be converted to camelCase notation ("Column Name" becomes
"columnName").

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | Path to the CSV file |

<a name="getData"></a>

## getData() ⇒ <code>Array.&lt;Map&gt;</code>
Returns (raw) data of current DataSeries as an array consisting of Maps.

**Kind**: global function  
<a name="getColumn"></a>

## getColumn(columnName) ⇒ <code>array</code>
Returns all values (rows) of a single column as an array.

**Kind**: global function  
**Returns**: <code>array</code> - Array of all rows for columnName  

| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>\*</code> | Name of the column that should be returned |

<a name="addRows"></a>

## addRows(...params) ⇒ <code>DataSeries</code>
Adds items to DataSeries; pass in any number of arrays consisting of Maps. Returns a new
(cloned) DataSeries.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ...params | <code>Array.&lt;Map&gt;</code> | Rows to add to DataSeries |

<a name="filter"></a>

## filter(fn) ⇒ <code>DataSeries</code>
Filters DataSeries by a filter function that is called for every row.
Returns a new (cloned) DataSeries.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Filter function; works as the regular JavaScript array filter                          function. Return a value that coerces to true to keep the row,                          or to false otherwise. |

<a name="addColumn"></a>

## addColumn(name, Values) ⇒ <code>DataSeries</code>
Adds a new column to DataSeries. Returns a new (cloned) Data Series.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>\*</code> | Name of the new column; anything that a Map accepts as a key. |
| Values | <code>array</code> | for the new column. Make sure that the array's length is the                      same as the current DataSerie's size. |

<a name="renameColumns"></a>

## renameColumns(fn) ⇒ <code>DataSeries</code>
Changes all column keys through a renaming function.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>functin</code> | Function that takes a single argument columnKey (*) and returns the                        updated column key. Will return a new (cloned) instance of                        DataSeries. |

<a name="updateValues"></a>

## updateValues(fn) ⇒ <code>DataSeries</code>
Updates/changes all values with the return value of the update function provided.
                         return the updated value. Is very useful to e.g. convert strings

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Function that takes two arguments: columnKey (*) and value. Should                          (from a CSV file) to numbers or dates. Returns a new (cloned)                          DataSeries. |

<a name="addColumnsFromSegments"></a>

## addColumnsFromSegments(columnKeys, segmentLength, mapFunction) ⇒ <code>DataSeries</code>
Calls a callback function for segments (a certain amount of rows) for the given columnKeys
until the callback function was called with all possible segments. Helps adding a
derived column from the existing data, e.g. an moving average. Returns a new (cloned)
DataSeries.

**Kind**: global function  
**Returns**: <code>DataSeries</code> - A new DataSeries with the returned data.  

| Param | Type | Description |
| --- | --- | --- |
| columnKeys | <code>array</code> | Keys of the columns that mapFunction should be called with. |
| segmentLength | <code>int</code> | Length of the segments that the callback function should                                 be called with. |
| mapFunction | <code>function</code> | Function that will be called with every segment; arguments                                 are the columns (see columnKeys) and their segments. The                                 function is expected to return a Map every time it was                                 called with the new column data. |

**Example**  
```js
const data = [
    { colA: 2, colB: 3 },
    { colA: 4, colB: 5 },
    { colA: 3, colB: 6 },
];
const dataSeries = DataSeries.fromObjects(data);
// A simple function that returns the arithmetic mean of all parameters passed in
const createMean = numbers => numbers.reduce((prev, current) => prev + current, 0) /
    numbers.length;
const addMean = (valuesOfColA, valuesOfColB) => new Map([
    ['colAMean', createMean(valuesOfColA)],
    ['colBMean', createMean(valuesOfColB)],
]);
// Adds a new column "mean" that contains the mean of colA for two rows.
const dataSeriesWithAverage = dataSeries.addColumnsFromSegments(
    ['colA', 'colB'],
    2,
    addMean,
);

// dataSeriesWithAverage.getData() now equals:
// [
//     Map(2) { 'colA' => 2, 'colB' => 3 },
//     Map(4) { 'colA' => 4, 'colB' => 5, 'colAMean' => 3, 'colBMean' => 4 },
//     Map(4) { 'colA' => 3, 'colB' => 6, 'colAMean' => 3.5, 'colBMean' => 5.5 },
// ]
```
<a name="mergeRows"></a>

## mergeRows(dataToMerge) ⇒ <code>DataSeries</code>
Merges provided data into current DataSeries; resulting DataSeries will have the same
amount of rows as originalDataSeries, but more columns. Returns a new (cloned) DataSeries.

**Kind**: global function  
**Returns**: <code>DataSeries</code> - New merged DataSeries  

| Param | Type | Description |
| --- | --- | --- |
| dataToMerge | <code>Array.&lt;Map&gt;</code> | Array of Maps that must have the same length as current                                  DataSeries' data. First row of dataToMerge will be merged                                  with first row of current DataSeries etc. |

<a name="head"></a>

## head(amount, [offset]) ⇒ <code>DataSeries</code>
Returns the top-most rows as a new (cloned) DataSeries.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| amount | <code>number</code> |  | Amount of rows to return |
| [offset] | <code>number</code> | <code>0</code> | Offset to use; 0 starts at the very first row |

<a name="tail"></a>

## tail(amount, [offset]) ⇒ <code>DataSeries</code>
Returns the bottom-most rows as a new (cloned) DataSeries.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| amount | <code>number</code> |  | Amount of rows to return |
| [offset] | <code>number</code> | <code>0</code> | Offset to use; 0 starts at the very last row |

<a name="groupBy"></a>

## groupBy(...groupingFunction) ⇒ <code>DataSeries</code>
Groups data of DataSeries by the configuration provided. Returns an array of arrays with
two values: groupKey and a (cloned) DataSeries for that groupKey.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ...groupingFunction | <code>function</code> | Functions that is called for every row and expected to                                        return the value that the given row should be grouped                                        by. |

**Example**  
```js
const dataSeries = new DataSeries([
    new Map([['a', 1]]),
    new Map([['b', 2]]),
    new Map([['a', 3]]),
    new Map([['a', 1], ['d', 2]]),
]);
const grouped = ds.groupBy(row => row.get('a'));
// Grouped is now:
// [
//     [1, DataSeries.fromObject([{ a: 1 }, { a: 1, d: 2 }])],
//     [undefined, DataSeries.fromObject([{ b: 2 }])],
//     [3, DataSeries.fromObject([{ a: 3 }])],
// ]
```
<a name="sortBy"></a>

## sortBy(...sortOrders) ⇒ <code>DataSeries</code>
Sorts data of DataSeries by the configuration provided. Returns a new (cloned) DataSeries.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ...sortOrders | <code>function</code> | Functions that are called for every row and expected to                                   return the value(s) that DataSeries should be sorted by or                                   an array with [value, sortOrder] where sortOrder is either                                   'asc' or 'desc'. |

**Example**  
```js
const dataSeries = new DataSeries([
    new Map([['a', 1], ['b', 2]]),
    new Map([['a', 2], ['b', 1]]),
    new Map([['a', 1], ['d', 2]]),
    new Map([['a', 1], ['b', -1]]),
]);
const sorted = ds.sortBy(row => row.get('a'), [row => row.get('b'), 'asc']);
// Order of rows will now be 0, 2, 3, 1
```
<a name="merge"></a>

## merge(...dataSeries) ⇒ <code>DataSeries</code>
Merges current DataSeries with one or multiple other DataSeries. Returns a new (cloned)
DataSeries.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ...dataSeries | <code>DataSeries</code> | DataSeries that should be merged |

