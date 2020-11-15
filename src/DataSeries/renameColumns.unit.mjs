import test from 'ava';
import renameColumns from './renameColumns.mjs';

test('throws on invalid argument', (t) => {
    t.throws(() => renameColumns([], 'notAFunction'), {
        message: /must be a function, is notAFunction/,
    });
});

test('renames columns', (t) => {
    const data = [
        new Map([['a', 1], ['b', 2]]),
        new Map([['a', 2], ['c', 2]]),
    ];
    const result = renameColumns(data, name => name.toUpperCase());
    t.deepEqual(result, [
        new Map([['A', 1], ['B', 2]]),
        new Map([['A', 2], ['C', 2]]),
    ]);
    // Result should be a new array
    t.not(data, result);
    // Original data may not have changed
    t.not(data[0], result[0])
});