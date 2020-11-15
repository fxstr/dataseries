import addRows from './addRows.mjs';
import validateData from './validateData.mjs';
import cloneData from './cloneData.mjs';
import addColumn from './addColumn.mjs';
import renameColumns from './renameColumns.mjs';
import updateValues from './updateValues.mjs';
import getColumn from './getColumn.mjs';
import mapSegments from './mapSegments.mjs';
import mergeRows from './mergeRows.mjs';
import readCSV from './readCSV.mjs';
import createCamelCase from './createCamelCase.mjs';
import groupBy from './groupBy.mjs';
import sortBy from './sortBy.mjs';

/**
 * Two-dimensional row-based immutable data store. Suitable to run statistics on simple timeseries
 * or other data.
 */
export default class DataSeries {

    /**
     * Holds our private data; can be accessed via getData and only updated when a new DataSeries
     * is constructed ().
     * @type {Map[]}
     * @private
     */
    #data = [];

    /**
     * Constructs new DataSeries from data passed in; data is validated and shallowly cloned
     * (two levels deep; first level is an array and second level is a Map).
     * @param {Map[]} data
     */
    constructor(data = []) {
        const clone = cloneData(validateData(data));
        this.#data = clone;
    }

    /**
     * Creates a new DataSeries from an array of objects; saves us the hassle of creating Maps
     * first, as some users and libraries (CSV, JSON) prefer objects.
     * @param {object[]} data   Data as an array of objects, e.g. [
     *                          { date: 1, open: 2.3, close 2.2 },
     *                          { date: 2, open: 2.4, close: 2.3 },
     *                          ]
     * @returns {DataSeries}    DataSeries with data that was passed in as an argument.
     */
    static fromObjects(data) {
        const asMap = data.map(item => new Map(Object.entries(item)));
        return new DataSeries(asMap);
    }

    /**
     * Load data from a CSV file. Pass in the file path; will use first row as keys for all columns.
     * Keys (first row) will automatically be converted to camelCase notation ("Column Name" becomes
     * "columnName").
     * @param {string} filePath      Path to the CSV file
     */
    static fromCSV(filePath) {
        return DataSeries
            .fromObjects(readCSV(filePath))
            .renameColumns(createCamelCase);
    }

    /* static fromCSVs(glob, fileNameColumnName) {
        console.log('TODO');
    } */


    /**
     * Returns the amount of rows in the current DataSeries.
     * @return {number}
     */
    get size() {
        return this.#data.length;
    }

    /**
     * Returns (raw) data of current DataSeries as an array consisting of Maps.
     * @returns {Map[]}
     */
    getData() {
        return this.#data;
    }

    /**
     * Returns all values (rows) of a single column as an array.
     * @param {*} columnName        Name of the column that should be returned
     * @returns {array}             Array of all rows for columnName
     */
    getColumn(columnName) {
        return getColumn(this.#data, columnName);
    }

    /**
     * Adds items to DataSeries; pass in any number of arrays consisting of Maps. Returns a new
     * (cloned) DataSeries.
     * @param {...Map[]} params      Rows to add to DataSeries
     * @returns {DataSeries}
     */
    addRows(...params) {
        return new DataSeries(addRows(this.#data, ...params));
    }

    /**
     * Filters DataSeries by a filter function that is called for every row.
     * Returns a new (cloned) DataSeries.
     * @param {function} fn     Filter function; works as the regular JavaScript array filter
     *                          function. Return a value that coerces to true to keep the row,
     *                          or to false otherwise.
     * @returns {DataSeries}
     */
    filter(fn) {
        return new DataSeries(this.#data.filter(fn));
    }

    /**
     * Adds a new column to DataSeries. Returns a new (cloned) Data Series.
     * @param {*} name      Name of the new column; anything that a Map accepts as a key.
     * @param {array}       Values for the new column. Make sure that the array's length is the
     *                      same as the current DataSerie's size.
     * @returns {DataSeries}
     */
    addColumn(name, values) {
        return new DataSeries(addColumn(this.#data, name, values));
    }

    /**
     * Changes all column keys through a renaming function.
     * @param {functin} fn    Function that takes a single argument columnKey (*) and returns the
     *                        updated column key. Will return a new (cloned) instance of
     *                        DataSeries.
     * @returns {DataSeries}
     */
    renameColumns(fn) {
        return new DataSeries(renameColumns(this.#data, fn));
    }

    /**
     * Updates/changes all values with the return value of the update function provided.
     *                          return the updated value. Is very useful to e.g. convert strings
     * @param {function} fn     Function that takes two arguments: columnKey (*) and value. Should
     *                          (from a CSV file) to numbers or dates. Returns a new (cloned)
     *                          DataSeries.
     * @returns {DataSeries}
     */
    updateValues(fn) {
        return new DataSeries(updateValues(this.#data, fn));
    }

    /**
     * Calls a callback function for segments (a certain amount of rows) for the given columnKeys
     * until the callback function was called with all possible segments. Helps adding a
     * derived column from the existing data, e.g. an moving average. Returns a new (cloned)
     * DataSeries.
     * @example
     * const data = [
     *     { colA: 2, colB: 3 },
     *     { colA: 4, colB: 5 },
     *     { colA: 3, colB: 6 },
     * ];
     * const dataSeries = DataSeries.fromObjects(data);
     * // A simple function that returns the arithmetic mean of all parameters passed in
     * const createMean = numbers => numbers.reduce((prev, current) => prev + current, 0) /
     *     numbers.length;
     * const addMean = (valuesOfColA, valuesOfColB) => new Map([
     *     ['colAMean', createMean(valuesOfColA)],
     *     ['colBMean', createMean(valuesOfColB)],
     * ]);
     * // Adds a new column "mean" that contains the mean of colA for two rows.
     * const dataSeriesWithAverage = dataSeries.addColumnsFromSegments(
     *     ['colA', 'colB'],
     *     2,
     *     addMean,
     * );
     *
     * // dataSeriesWithAverage.getData() now equals:
     * // [
     * //     Map(2) { 'colA' => 2, 'colB' => 3 },
     * //     Map(4) { 'colA' => 4, 'colB' => 5, 'colAMean' => 3, 'colBMean' => 4 },
     * //     Map(4) { 'colA' => 3, 'colB' => 6, 'colAMean' => 3.5, 'colBMean' => 5.5 },
     * // ]
     * @param {array} columnKeys       Keys of the columns that mapFunction should be called with.
     * @param {int} segmentLength      Length of the segments that the callback function should
     *                                 be called with.
     * @param {function} mapFunction   Function that will be called with every segment; arguments
     *                                 are the columns (see columnKeys) and their segments. The
     *                                 function is expected to return a Map every time it was
     *                                 called with the new column data.
     * @returns {DataSeries}           A new DataSeries with the returned data.
    */
    addColumnsFromSegments(columnKeys, segmentLength, mapFunction) {
        const result = mapSegments(this.#data, columnKeys, segmentLength, mapFunction);
        return this.mergeRows(result);
    }

    /**
     * Merges provided data into current DataSeries; resulting DataSeries will have the same
     * amount of rows as originalDataSeries, but more columns. Returns a new (cloned) DataSeries.
     * @param {Map[]} dataToMerge       Array of Maps that must have the same length as current
     *                                  DataSeries' data. First row of dataToMerge will be merged
     *                                  with first row of current DataSeries etc.
     * @return {DataSeries}             New merged DataSeries
     */
    mergeRows(dataToMerge) {
        return new DataSeries(mergeRows(this.#data, dataToMerge));
    }

    /**
     * Returns the top-most rows as a new (cloned) DataSeries.
     * @param {number} amount         Amount of rows to return
     * @param {number} [offset=0]     Offset to use; 0 starts at the very first row
     * @return {DataSeries}
     */
    head(amount, offset = 0) {
        if (!Number.isInteger(amount) || !Number.isInteger(offset)) {
            throw new Error(`DataSeries: Arguments amount and offset must be integers, are ${amount} and ${offset} instead.`);
        }
        return new DataSeries(this.#data.slice(
            offset,
            offset + amount,
        ));
    }


    /**
     * Returns the bottom-most rows as a new (cloned) DataSeries.
     * @param {number} amount         Amount of rows to return
     * @param {number} [offset=0]     Offset to use; 0 starts at the very last row
     * @return {DataSeries}
     */
    tail(amount, offset = 0) {
        if (!Number.isInteger(amount) || !Number.isInteger(offset)) {
            throw new Error(`DataSeries: Arguments amount and offset must be integers, are ${amount} and ${offset} instead.`);
        }
        return new DataSeries(this.#data.slice(
            this.size - amount - offset,
            this.size - offset,
        ));
    }


    /**
     * Groups data of DataSeries by the configuration provided. Returns an array of arrays with
     * two values: groupKey and a (cloned) DataSeries for that groupKey.
     * @example
     * const dataSeries = new DataSeries([
     *     new Map([['a', 1]]),
     *     new Map([['b', 2]]),
     *     new Map([['a', 3]]),
     *     new Map([['a', 1], ['d', 2]]),
     * ]);
     * const grouped = ds.groupBy(row => row.get('a'));
     * // Grouped is now:
     * // [
     * //     [1, DataSeries.fromObject([{ a: 1 }, { a: 1, d: 2 }])],
     * //     [undefined, DataSeries.fromObject([{ b: 2 }])],
     * //     [3, DataSeries.fromObject([{ a: 3 }])],
     * // ]
     * @param {...function} groupingFunction  Functions that is called for every row and expected to
     *                                        return the value that the given row should be grouped
     *                                        by.
     * @returns {DataSeries}
     */
    groupBy(groupingFunction) {
        // Convert all values (that are arrays from this.#data) to new DataSeries
        return groupBy(this.#data, groupingFunction)
            .map(([key, value]) => [key, new DataSeries(value)]);
    }


    /**
     * Sorts data of DataSeries by the configuration provided. Returns a new (cloned) DataSeries.
     * @example
     * const dataSeries = new DataSeries([
     *     new Map([['a', 1], ['b', 2]]),
     *     new Map([['a', 2], ['b', 1]]),
     *     new Map([['a', 1], ['d', 2]]),
     *     new Map([['a', 1], ['b', -1]]),
     * ]);
     * const sorted = ds.sortBy(row => row.get('a'), [row => row.get('b'), 'asc']);
     * // Order of rows will now be 0, 2, 3, 1
     * @param {...function} sortOrders   Functions that are called for every row and expected to
     *                                   return the value(s) that DataSeries should be sorted by or
     *                                   an array with [value, sortOrder] where sortOrder is either
     *                                   'asc' or 'desc'.
     * @returns {DataSeries}
     */
    sortBy(...sortOrders) {
        return new DataSeries(sortBy(this.#data, ...sortOrders));
    }

    /**
     * Merges current DataSeries with one or multiple other DataSeries. Returns a new (cloned)
     * DataSeries.
     * @param {...DataSeries} dataSeries     DataSeries that should be merged
     * @returns {DataSeries}
     */
    merge(...dataSeries) {
        return dataSeries.reduce((previous, series) => (
            previous.addRows(series.getData())
        ), this);
    }

}
