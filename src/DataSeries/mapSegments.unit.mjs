import test from 'ava';
import mapSegments from './mapSegments.mjs';

const setupData = () => [
    new Map([['a', 1], ['b', 2]]),
    new Map([['a', 2], ['b', 4]]),
    new Map([['a', 3], ['b', 6]]),
    new Map([['a', 4], ['b', 8]]),
    new Map([['a', 5], ['b', 10]]),
];

test('throws on invalid parameters', (t) => {
    t.throws(() => mapSegments([], 'notAnArray'), {
        message: /must be an array, is notAnArray/,
    });
    t.throws(() => mapSegments([], [], 'notAnInt'), {
        message: /must be an integer, is notAnInt/,
    });
    t.throws(() => mapSegments([], [], 5, 'notAFn'), {
        message: /must be a function, is notAFn/,
    });
});

test('calls callback with expected parameters', (t) => {
    const data = setupData();
    const parameters = [];
    const fn = (...params) => {
        parameters.push(params);
    };
    mapSegments(data, ['a', 'b'], 3, fn);
    // Function was called 3 times
    t.is(parameters.length, 3);
    // Function was called with expected arguments
    t.deepEqual(parameters[0], [[1, 2, 3], [2, 4 ,6]]);
    t.deepEqual(parameters[1], [[2, 3, 4], [4 ,6, 8]]);
    t.deepEqual(parameters[2], [[3, 4, 5], [6, 8, 10]]);
});

test('returns expected value', (t) => {
    const data = setupData();
    const mean = (...numbers) => numbers.reduce((sum, nr) => sum + nr, 0) / numbers.length;
    // Returns (mean of first column) - (mean of second column)
    const fn = (colA, colB) => `${mean(...colA)}-${mean(...colB)}`;
    const result = mapSegments(data, ['a', 'b'], 3, fn);
    t.deepEqual(result, [new Map(), new Map(), '2-4', '3-6', '4-8']);
});

