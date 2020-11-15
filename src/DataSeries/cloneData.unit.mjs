import test from 'ava';
import cloneData from './cloneData.mjs';

test('clones data', (t) => {
    const source = [
        new Map([['a', 1]]),
        new Map([['b', 2]]),
    ];
    const clone = cloneData(source);
    // Change source
    source[0].set('a', 2);
    source.splice(1, 0);
    // Clone was not modified
    t.is(clone[0].get('a'), 1);
    t.is(clone.length, 2);
});
