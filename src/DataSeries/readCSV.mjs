import { readFileSync } from 'fs';
import parseCSV from 'csv-parse/lib/sync.js';

export default (filePath) => {
    const fileContent = readFileSync(filePath, 'utf8');
    return parseCSV(fileContent, { columns: true });
};
