import { fileURLToPath } from 'url';
import { dirname, parse } from 'path';
import { readFileSync } from 'fs';
import test from 'ava';
import parseCSV from 'csv-parse/lib/sync.js';
import glob from 'glob';
import DataSeries from '../index.mjs';

// Tests code of the documentation (README.md)

test('creates and updates data', (t) => {
    const mean = (...numbers) => numbers.reduce((sum, nr) => sum + nr, 0) / numbers.length;
    const dataFolder = dirname(fileURLToPath(new URL(import.meta.url)));
    const files = glob.sync(`${dataFolder}/testData/**.csv`);
    const content = files.map(filePath => [filePath, readFileSync(filePath, 'utf8')]);
    const dataSeries = content.map(([fileName, fileContent]) => {
        const csv = parseCSV(fileContent, { columns: true });
        let ds = DataSeries.fromObjects(csv);
        ds = ds.renameColumns(name => (
            name
                .replace(/^(\w)/g, (match, firstLetter) => firstLetter.toLowerCase())
                .replace(/\s+(\w)/g, (match, letter) => letter.toUpperCase())
        ));
        ds = ds.updateValues((key, value) => key === 'date' ? new Date(value) : parseFloat(value));
        const instrument = parse(fileName).name;
        ds = ds.addColumn('instrument', Array.from({ length: ds.size }).map(() => instrument));
        ds = ds.addColumnsFromSegments(['close'], 3, (closeData, length) => (
            new Map([['meanClose', closeData.length < length ? null : mean(...closeData)]])
        ));
        // console.log(ts.getData());
    });
    t.pass();
});


// const dataFolder = dirname(fileURLToPath(new URL(import.meta.url)));
// const ts = TimeSeries.fromCSVs({
//     files: `${dataFolder}/**/*.csv`,
//     updateValues: (key, value) => key === 'date' ? new Date(value) : parseFloat(value),
//     fileNameColumn: 'instrument',
// });

