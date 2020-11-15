import getColumn from './getColumn.mjs';

/**
 * Creates segments of a certain max length from data. Then calls fn with them. Returns fn's return
 * values for every segment as an array.
*/
export default (data, columnKeys, segmentLength, fn) => {

    if (!Array.isArray(columnKeys)) {
        throw new Error(`mapSegments: columnKeys must be an array, is ${columnKeys} instead.`);
    }
    if (!Number.isInteger(segmentLength)) {
        throw new Error(`mapSegments: segmentLength must be an integer, is ${segmentLength} instead.`);
    }
    if (typeof fn !== 'function') {
        throw new Error(`mapSegments: Callback function must be a function, is ${fn} instead.`);
    }

    // Map with columnKey as a key and data for that column (array) as value
    const columns = new Map(columnKeys.map(key => [key, getColumn(data, key)]));

    // Go through data
    return data.map((row, index) => {
        // If index is < segmentLength, no result is available; return empty Map.
        if (index < segmentLength - 1) return new Map();
        // Get current segments (that serve as an argument for fn)
        const segments = columnKeys.map(key => (
            columns.get(key).slice(index - segmentLength + 1, index + 1)
        ));
        // Call function with segments for all columnKeys and segmentLength; also passing
        // segmentLength simplifies checking if all data is ready to calculate return value
        return fn(...segments);
    });
};
