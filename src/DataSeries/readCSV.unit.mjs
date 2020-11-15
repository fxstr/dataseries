import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import test from 'ava';
import readCSV from './readCSV.mjs';

test('fails on invalid path or data', (t) => {
    t.throws(() => readCSV('invalidPath'));
});

test('reads and returns csv', (t) => {
    const currentFolder = dirname(fileURLToPath(new URL(import.meta.url)));
    const csvPath = join(currentFolder, '../test/testData/AAPL.csv');
    const result = readCSV(csvPath);
    t.is(result.length, 252);
    t.deepEqual(result[0], {
        Date: '2019-06-10',
        Open: '191.809998',
        High: '195.369995',
        Low: '191.619995',
        Close: '192.580002',
        'Adj Close': '190.308762',
        Volume: '26220900',
    });
});