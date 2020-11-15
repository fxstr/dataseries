import { fileURLToPath } from 'url';
import { dirname, parse } from 'path';
import { readFileSync } from 'fs';
import test from 'ava';
import parseCSV from 'csv-parse/lib/sync.js';
import glob from 'glob';
import DataSeries from '../index.mjs';

// Tests code of the documentation (README.md)

test('creates and updates data', (t) => {

    // Read data from a CSV file; dataFolder is the current execution path (which is needed if
    // you are using ES6 modules)
    const dataFolder = dirname(fileURLToPath(new URL(import.meta.url)));

    // Calculates arithmetic mean of an arbitrary amount of numbers
    const mean = (...numbers) => numbers.reduce((sum, nr) => sum + nr, 0) / numbers.length;

    const dataSeries = DataSeries
        // Create dataSeries from a CSV file
        .fromCSV(`${dataFolder}/testData/AAPL.csv`)
        // Convert every column's data into the correct format (is a string by default)
        .updateValues((key, value) => {
            // Convert data of column 'date' to a JS date
            if (key === 'date') return new Date(value);
            // Convert all other columns to a number
            return parseFloat(value);
        })
        // Add a new column 'mean' that contains the arithmetic mean of the column 'close' for 5
        // rows
        .addColumnsFromSegments(['close'], 5, closeData => (
            new Map([['arithmeticMeanOfClose', mean(...closeData)]])
        ));

    // Print the first five rows
    console.log(dataSeries.head(5).getData());

    t.is(dataSeries.head(5).size, 5);
    t.is(dataSeries.head(5).getData()[4].get('arithmeticMeanOfClose'), 193.69400019999998);

});


