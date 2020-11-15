import test from 'ava';
import sortBy from './sortBy.mjs';

test('throws on invalid arguments', (t) => {
    t.throws(() => sortBy([], 'notAFunction'), {
        message: /functions or arrays, is notAFunction instead/,
    });
    t.throws(() => sortBy([], ['notAFunction', 'notAsc']), {
        message: /'desc', is \[notAFunction, notAsc\] instead/,
    });
});

test('sorts asc and desc', (t) => {
    const data = [
        { a: 5 },
        { a: -2 },
        { a: 2 },
        { a: 0 },
    ];
    // Sorts ascending by default
    sortBy(data, row => row.a).reduce((prev, item) => {
        t.is(item.a > prev.a, true);
        return item;
    });
    // Sorts ascending if sortOrder is false
    sortBy(data, [row => row.a, 'asc']).reduce((prev, item) => {
        t.is(item.a > prev.a, true);
        return item;
    });
    // Sorts ascending if sortOrder is false
    sortBy(data, [row => row.a, 'desc']).reduce((prev, item) => {
        t.is(item.a < prev.a, true);
        return item;
    });
});

test('sorts by multiple levels', (t) => {
    const data = [
        { a: 1, b: 2, c: 4 },
        { a: 2 },
        // Use two equal items
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 4 },
        { a: 1, b: -1 },
    ];
    const result = sortBy(
        data,
        // Sort by a asc, then by b desc, then c asc
        row => row.a,
        [row => row.b, 'desc'],
        [row => row.c, 'asc'],
    );
    t.deepEqual(result, [
        data[2],
        data[0],
        data[3],
        data[4],
        data[1],
    ]);
});
