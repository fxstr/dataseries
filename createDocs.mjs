import jsdoc from 'jsdoc-to-markdown';
import { copyFileSync, writeFileSync, unlinkSync } from 'fs';

const source = './src/DataSeries/DataSeries.mjs';
const target = './src/DataSeries/DataSeries.js';
const doc = './src/DataSeries/DataSeries.md';

const jsdocOptions = {
    files: target,
};

const createDocs = () => {
    // Clone DataSeries.mjs to DataSeries.js, as jsdoc2md can only read .js files (🤔)
    copyFileSync(source, target);
    const result = jsdoc.renderSync(jsdocOptions);
    console.log(result);
    writeFileSync(doc, result);
    unlinkSync(target);
};

createDocs();
