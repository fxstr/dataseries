## Functions

<dl>
<dt><a href="#fromObjects">fromObjects(data)</a> ⇒ <code>DataSeries</code></dt>
<dd><p>Creates a new DataSeries from an array of objects; saves us the hassle from creating Maps
first, as some users and libraries (CSV, JSON) prefer objects.</p>
</dd>
<dt><a href="#getData">getData()</a> ⇒ <code>Array.&lt;Map&gt;</code></dt>
<dd><p>Returns (raw) data</p>
</dd>
<dt><a href="#getColumn">getColumn(columnName)</a> ⇒ <code>array</code></dt>
<dd><p>Returns value of a column as an array</p>
</dd>
<dt><a href="#addRows">addRows(...params)</a></dt>
<dd><p>Adds items to data; pass in an number of arrays consisting of Maps. Returns a new DataSeries.</p>
</dd>
<dt><a href="#filter">filter(fn)</a></dt>
<dd><p>Filters DataSeries by filter function that is called for every item in current data.
Returns a new DataSeries.</p>
</dd>
<dt><a href="#addColumn">addColumn(name, Values)</a></dt>
<dd><p>Adds a new column to DataSeries</p>
</dd>
<dt><a href="#renameColumns">renameColumns(fn)</a></dt>
<dd><p>Changes all column keys</p>
</dd>
<dt><a href="#updateValues">updateValues(fn)</a></dt>
<dd><p>Updates/changes all values with the return value of the update function provided.</p>
</dd>
<dt><a href="#addColumnsFromSegments">addColumnsFromSegments(columnKeys, segmentLength, mapFunction)</a> ⇒ <code>DataSeries</code></dt>
<dd><p>Calls a callback function for segments (a certain amount of rows) for the given columnKeys
until the callback function was called with all possible segments. Helps adding a
derived column from the existing data, e.g. an moving average.</p>
</dd>
<dt><a href="#mergeRows">mergeRows(dataToMerge)</a> ⇒ <code>DataSeries</code></dt>
<dd><p>Merges provided data into current DataSeries; resulting DataSeries will have the same
amount of rows as originalDataSeries, but more columns.</p>
</dd>
<dt><a href="#head">head(amount, [offset])</a> ⇒ <code>DataSeries</code></dt>
<dd><p>Returns the top-most rows as a new DataSeries</p>
</dd>
<dt><a href="#tail">tail(amount, [offset])</a> ⇒ <code>DataSeries</code></dt>
<dd><p>Returns the bottom-most rows as a new DataSeries</p>
</dd>
<dt><a href="#merge">merge(...dataSeries)</a></dt>
<dd><p>Merges current DataSeries with one or multiple other DataSeries</p>
</dd>
</dl>

<a name="fromObjects"></a>

## fromObjects(data) ⇒ <code>DataSeries</code>
Creates a new DataSeries from an array of objects; saves us the hassle from creating Maps
first, as some users and libraries (CSV, JSON) prefer objects.

**Kind**: global function  
**Returns**: <code>DataSeries</code> - DataSeries with data that was passed in as an argument.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;object&gt;</code> | Data as an array of objects, e.g. [                          { date: 1, open: 2.3, close 2.2 },                          { date: 2, open: 2.4, close: 2.3 },                          ] |

<a name="getData"></a>

## getData() ⇒ <code>Array.&lt;Map&gt;</code>
Returns (raw) data

**Kind**: global function  
<a name="getColumn"></a>

## getColumn(columnName) ⇒ <code>array</code>
Returns value of a column as an array

**Kind**: global function  
**Returns**: <code>array</code> - Array of all column data for columnName  

| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>\*</code> | Name of the column that should be returned |

<a name="addRows"></a>

## addRows(...params)
Adds items to data; pass in an number of arrays consisting of Maps. Returns a new DataSeries.

**Kind**: global function  

| Param | Type |
| --- | --- |
| ...params | <code>Array.&lt;Map&gt;</code> | 

<a name="filter"></a>

## filter(fn)
Filters DataSeries by filter function that is called for every item in current data.
Returns a new DataSeries.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Filter function |

<a name="addColumn"></a>

## addColumn(name, Values)
Adds a new column to DataSeries

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>\*</code> | Name of the new column; anything that a Map accepts as a key |
| Values | <code>array</code> | for the new column. Make sure that the array's length is the                      same as TimeSerie's length. |

<a name="renameColumns"></a>

## renameColumns(fn)
Changes all column keys

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>functin</code> | Function that takes a single argument columnKey (*) and returns the                        updated column key. Will return a new instance of DataSeries. |

<a name="updateValues"></a>

## updateValues(fn)
Updates/changes all values with the return value of the update function provided.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Function that takes two arguments: columnKey (*) and value. Should                          return the updated value. |

<a name="addColumnsFromSegments"></a>

## addColumnsFromSegments(columnKeys, segmentLength, mapFunction) ⇒ <code>DataSeries</code>
Calls a callback function for segments (a certain amount of rows) for the given columnKeys
until the callback function was called with all possible segments. Helps adding a
derived column from the existing data, e.g. an moving average.

**Kind**: global function  
**Returns**: <code>DataSeries</code> - A new DataSeries with the returned data  

| Param | Type | Description |
| --- | --- | --- |
| columnKeys | <code>array</code> | Keys of the columns that mapFunction should be called with |
| segmentLength | <code>int</code> | Length of the segments that the callback function should                                 be called with |
| mapFunction | <code>function</code> | Function that will be called with every segment; arguments                                 are the columns (see columnKeys) and their segments. Is                                 expected to return a Map every time it was called with the                                 new column data |

<a name="mergeRows"></a>

## mergeRows(dataToMerge) ⇒ <code>DataSeries</code>
Merges provided data into current DataSeries; resulting DataSeries will have the same
amount of rows as originalDataSeries, but more columns.

**Kind**: global function  
**Returns**: <code>DataSeries</code> - New merged DataSeries  

| Param | Type | Description |
| --- | --- | --- |
| dataToMerge | <code>Array.&lt;Map&gt;</code> | Array of Maps that must have the same length as current                                  DataSeries' data. First row of dataToMerge will be merged                                  with first row of current DataSeries etc. |

<a name="head"></a>

## head(amount, [offset]) ⇒ <code>DataSeries</code>
Returns the top-most rows as a new DataSeries

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| amount | <code>number</code> |  | Amount of rows to return |
| [offset] | <code>number</code> | <code>0</code> | Offset to use; 0 starts at the very first row |

<a name="tail"></a>

## tail(amount, [offset]) ⇒ <code>DataSeries</code>
Returns the bottom-most rows as a new DataSeries

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| amount | <code>number</code> |  | Amount of rows to return |
| [offset] | <code>number</code> | <code>0</code> | Offset to use; 0 starts at the very last row |

<a name="merge"></a>

## merge(...dataSeries)
Merges current DataSeries with one or multiple other DataSeries

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ...dataSeries | <code>DataSeries</code> | DataSeries that should be merged |

