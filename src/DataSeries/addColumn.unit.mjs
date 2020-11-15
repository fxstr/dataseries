import test from 'ava';
import addColumn from './addColumn.mjs';

test('throws on invalid arguments', (t) => {
    // Not an array
    t.throws(() => addColumn([], 'name', {}), {
        message: /must be an array, is {}/,
    });
    // Different length
    t.throws(() => addColumn([], 'name', [1]), {
        message: /length of value is 1, size of TimeSeries is 0/,
    });    
});

test('adds data', (t) => {
    const originalData = [new Map([['a', 1]]), new Map([['b', 2]])];
    const result = addColumn(
        originalData,
        'field', 
        [3, 4],
    );
    t.deepEqual(result, [
        new Map([['a', 1], ['field', 3]]),
        new Map([['b', 2], ['field', 4]]),
    ]);
    // Original data was not modified (data was not added);
    t.not(result, originalData);
    t.deepEqual(originalData[0].size, 1);
})