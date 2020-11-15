import test from 'ava';
import mergeRows from './mergeRows.mjs';
import mapSegmentsMjs from './mapSegments.mjs';

test('throws on invalid arguments', (t) => {
    t.throws(() => mergeRows([], 'notAnArray'), {
        message: /be an array, is notAnArray/,
    });
    t.throws(() => mergeRows([1], []), {
        message: /dataToMerge is 0, length of data is 1/,
    });
});

test('merges rows', (t) => {
    const data = [
        new Map([['a', 1]]),
        new Map([['a', 2]]),
    ];
    const dataToMerge = [
        new Map([['b', 2]]),
        new Map([['a', 3], ['b', 3]]),
    ];
    const result = mergeRows(data, dataToMerge);
    t.deepEqual(result, [
        new Map([['a', 1], ['b', 2]]),
        new Map([['a', 3], ['b', 3]]),
    ]);
    // Result was cloned
    t.not(data, dataToMerge);
    // Original data was not modified
    t.deepEqual(data[0], new Map([['a', 1]]));
    t.deepEqual(dataToMerge[0], new Map([['b', 2]]));
});