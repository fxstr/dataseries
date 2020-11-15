import test from 'ava';
import groupBy from './groupBy.mjs';

test('throws on invalid arguments', (t) => {
    t.throws(() => groupBy([], 'notAFunction'), {
        message: /is notAFunction \(string\) instead/,
    });
});

test('groups data', (t) => {
    const data = [
        { a: 2, b: 1 },
        // Test undefined as key
        { b: 2 },
        // Test duplicate key
        { a: 2, b: 4 }
    ];
    const result = groupBy(data, ({ a }) => a);
    t.deepEqual(result, [
        [2, [data[0], data[2]]],
        [undefined, [data[1]]],
    ]);
});