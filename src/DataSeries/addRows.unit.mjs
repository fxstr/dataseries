import test from 'ava';
import addRows from './addRows.mjs';

test('adds array based data', (t) => {
    const original = [1, 2];
    const result = addRows(original, [3, 4], [5, 6]);
    t.deepEqual(result, [1, 2, 3, 4, 5, 6]);
    // Original was not changed
    t.deepEqual(original, [1, 2]);
});
