import test from 'ava';
import updateValues from './updateValues.mjs';

test('throws on invalid argument', (t) => {
    t.throws(() => updateValues([], 'notAFunction'), {
        message: /must be a function, is notAFunction/,
    })
});

test('updates values', (t) => {
    const data = [
        new Map([['a', 1], ['b', 2]]),
        new Map([['a', 2], ['c', 4]]),
    ];
    const result = updateValues(data, (key, value) => `${key}-${value}`);
    t.deepEqual(result, [
        new Map([['a', 'a-1'], ['b', 'b-2']]),
        new Map([['a', 'a-2'], ['c', 'c-4']]),
    ]);
    // New array was returned
    t.not(data, result);
    // Values of array were not changed but re-created
    t.not(data[0], result[0]);
});