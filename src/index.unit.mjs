import test from 'ava';
import DataSeries from './index.mjs';

test('exports expected exports', (t) => {
    t.is(typeof DataSeries, 'function');
});
