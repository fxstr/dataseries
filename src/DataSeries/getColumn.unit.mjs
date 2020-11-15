import test from 'ava';
import getColumn from './getColumn.mjs';
import getColumnMjs from './getColumn.mjs';

test('warns if data is missing', (t) => {
    const originalWarn = console.warn;
    const warnings = [];
    console.warn = (...args) => warnings.push(...args);
    const data = [new Map()];
    getColumnMjs(data, 'b');
    t.is(warnings.length, 1);
    t.is(warnings[0], 'getColumn: Column b does not exist.')
    console.warn = originalWarn;
});

test('returns column data', (t) => {
    const data = [
        new Map([['a', 1], ['b', 1]]),
        new Map([['a', 2]]),
        new Map([['b', 3]]),
    ];
    const result = getColumn(data, 'b');
    t.deepEqual(result, [1, undefined, 3]);
    t.not(data, result);
});