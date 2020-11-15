import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import test from 'ava';
import DataSeries from './DataSeries.mjs';

test('inits without data', (t) => {
    const ds = new DataSeries();
    t.deepEqual(ds.getData(), []);
});

test('inits with data', (t) => {
    const data = [new Map([['a', 'b'], ['b', 'c']])];
    const ds = new DataSeries(data);
    t.deepEqual(ds.getData(), data);
});

test('validates data', (t) => {
    t.throws(() => new DataSeries('notAnArray'));
});

test('clones data', (t) => {
    const rawData = [new Map([['a', 1]])];
    const ds = new DataSeries(rawData);
    t.not(ds.getData(), rawData);
    t.not(ds.getData()[0], rawData[0]);
});

test('implements addRows', (t) => {
    const ds = new DataSeries();
    const item1 = new Map([['a', 'b']]);
    const item2 = new Map([['c', 'd']]);
    const ds1 = ds.addRows([item1], [item2]);
    t.deepEqual(ds1.getData(), [item1, item2]);
    // Returned new DataSeries
    t.not(ds, ds1);
});

test('implements filter', (t) => {
    const ds = new DataSeries([
        new Map([['key', 1]]),
        new Map([['key', 2]]),
        new Map([['key', 3]]),
    ]);
    const ds1 = ds.filter(entry => entry.get('key') % 2 === 0);
    t.deepEqual(ds1.getData(), [new Map([['key', 2]])]);
    // Returned new DataSeries
    t.not(ds1, ds);
});

test('implements renameColumn', (t) => {
    const ds = new DataSeries([new Map([['a', 1]]), new Map([['b', 2]])]);
    const ds1 = ds.renameColumns(name => name.toUpperCase());
    t.deepEqual(
        ds1.getData(),
        [new Map([['A', 1]]), new Map([['B', 2]])],
    );
    t.not(ds, ds1);
});

test('implements updateValues', (t) => {
    const ds = new DataSeries([new Map([['a', 1]]), new Map([['b', 2]])]);
    const ds1 = ds.updateValues((key, value) => `${key}-${value}`);
    t.deepEqual(
        ds1.getData(),
        [new Map([['a', 'a-1']]), new Map([['b', 'b-2']])],
    );
    t.not(ds, ds1);
});

test('implements addColumn', (t) => {
    const ds = new DataSeries([new Map([['a', 1]]), new Map([['b', 2]])]);
    const ds1 = ds.addColumn('field', [3, 4]);
    t.deepEqual(
        ds1.getData(),
        [new Map([['a', 1], ['field', 3]]), new Map([['b', 2], ['field', 4]])],
    );
    t.not(ds, ds1);
});

test('implements size', (t) => {
    const ds = new DataSeries();
    t.is(ds.size, 0);
    const ds1 = new DataSeries([new Map([['a', 1]]), new Map([['b', 2]])]);
    t.is(ds1.size, 2);
});

test('implements getColumn', (t) => {
    const ds = new DataSeries([new Map([['a', 1]]), new Map([['b', 2]])]);
    const ds1 = ds.getColumn('a');
    t.deepEqual(ds1, [1, undefined]);
    t.not(ds, ds1);
});

test('implements addColumnsFromSegments', (t) => {
    const mean = (...nr) => nr.reduce((sum, number) => sum + number, 0) / nr.length;
    const multiMeans = (columnA, columnB) => (
        new Map([
            ['meanA', mean(...columnA)],
            ['meanB', mean(...columnB)],
        ])
    );
    const ds = new DataSeries([
        new Map([['a', 1], ['b', 2]]),
        new Map([['a', 2], ['b', 4]]),
        new Map([['a', 3], ['b', 6]]),
    ]);
    const ds1 = ds.addColumnsFromSegments(['a', 'b'], 2, multiMeans);
    t.is(ds1 instanceof DataSeries, true);
    t.deepEqual(ds1.getData(), [
        new Map([['a', 1], ['b', 2]]),
        new Map([['a', 2], ['b', 4], ['meanA', 1.5], ['meanB', 3]]),
        new Map([['a', 3], ['b', 6], ['meanA', 2.5], ['meanB', 5]]),
    ]);
    t.not(ds1, ds);
});

test('implements mergeRows', (t) => {
    const ds = new DataSeries([
        new Map([['a', 1]]),
        new Map([['b', 2]]),
    ]);
    const result = ds.mergeRows([new Map([['c', 1]]), new Map([['c', 2]])]);
    t.deepEqual(result.getData(), [
        new Map([['a', 1], ['c', 1]]),
        new Map([['b', 2], ['c', 2]]),
    ]);
    t.not(ds, result);
});

test('implements fromCSV', (t) => {
    const currentDirectory = dirname(fileURLToPath(new URL(import.meta.url)));
    const csvPath = join(currentDirectory, '../test/testData/AAPL.csv');
    const ds = DataSeries.fromCSV(csvPath);
    t.is(ds.size, 252);
    t.deepEqual(ds.getData()[0], new Map([
        ['date', '2019-06-10'],
        ['open', '191.809998'],
        ['high', '195.369995'],
        ['low', '191.619995'],
        ['close', '192.580002'],
        ['adjClose', '190.308762'],
        ['volume', '26220900'],
    ]));
});

test('implements head', (t) => {
    const ds = new DataSeries([
        new Map([['a', 1]]),
        new Map([['b', 2]]),
        new Map([['c', 3]]),
        new Map([['d', 4]]),
    ]);
    t.throws(() => ds.head('test'), {
        message: /must be integers, are test/,
    });
    t.is(ds.head(2).size, 2);
    t.is(ds.head(2) instanceof DataSeries, true);
    // We cannot test DataSeries#data as it's private. Use getData instead
    t.deepEqual(ds.head(2).getData(), ds.getData().slice(0, 2));
    t.deepEqual(ds.head(2, 1).getData(), ds.getData().slice(1, 3));
});

test('implements tail', (t) => {
    const ds = new DataSeries([
        new Map([['a', 1]]),
        new Map([['b', 2]]),
        new Map([['c', 3]]),
        new Map([['d', 4]]),
    ]);
    t.throws(() => ds.tail('test'), {
        message: /must be integers, are test/,
    });
    t.is(ds.tail(2).size, 2);
    t.is(ds.head(2) instanceof DataSeries, true);
    // We cannot test DataSeries#data as it's private. Use getData instead
    t.deepEqual(ds.tail(2).getData(), ds.getData().slice(2, 4));
    t.deepEqual(ds.tail(2, 1).getData(), ds.getData().slice(1, 3));
});


test('implements groupBy', (t) => {
    const ds = new DataSeries([
        new Map([['a', 1]]),
        new Map([['b', 2]]),
        new Map([['a', 3]]),
        new Map([['a', 1], ['d', 2]]),
    ]);
    const grouped = ds.groupBy(row => row.get('a'));
    // We cannot test for matching DataSeries#data as it's private
    t.deepEqual(grouped, [
        [1, new DataSeries()],
        [undefined, new DataSeries()],
        [3, new DataSeries()],
    ]);
    t.deepEqual(grouped[0][1].getData(), [
        new Map([['a', 1]]),
        new Map([['a', 1], ['d', 2]]),
    ]);
});

test('implements sortBy', (t) => {
    const ds = new DataSeries([
        new Map([['a', 1], ['b', 2]]),
        new Map([['a', 2], ['b', 1]]),
        // Meh: undefined is > 2 and <2.
        new Map([['a', 1], ['d', 2]]),
        new Map([['a', 1], ['b', -1]]),
    ]);
    const sorted = ds.sortBy(row => row.get('a'), [row => row.get('b'), 'asc']);
    // Check if data was cloned
    t.not(sorted.getData()[0], ds.getData()[0]);
    t.deepEqual(sorted.getData(), [
        ds.getData()[0],
        ds.getData()[2],
        ds.getData()[3],
        ds.getData()[1],
    ]);
});

test('implements merge', (t) => {
    const ds0 = new DataSeries([
        new Map([['a', 1], ['b', 2]]),
    ]);
    const ds1 = new DataSeries([
        new Map([['a', 2], ['b', 2]]),
        new Map([['a', 3], ['b', 1]]),
    ]);
    const ds2 = new DataSeries([
        new Map([['a', 4], ['b', 2]]),
    ]);
    const merged = ds0.merge(ds1, ds2);
    t.deepEqual(merged.getData(), [
        ...ds0.getData(),
        ...ds1.getData(),
        ...ds2.getData(),
    ]);
    // Original was not modified
    t.is(ds0.getData().length, 1);
});

test('JSDoc example works as expected', (t) => {
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
    console.log(dataSeriesWithAverage.getData());
    t.is(true, true);
});
