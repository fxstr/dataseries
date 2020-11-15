/**
 * Groups rows of data by the value returned by groupingFunction for the given row.
 * @param {array} data
 * @param {function} groupingFunction       Function that takes a single item of data as argument
 *                                          and returns a value that the item should be grouped
 *                                          by
 * @return {array}                          Array with keys (returned by groupingFunction) and
 *                                          values consisting of an array. Return array instead of
 *                                          Map as it's easier to modify/iterate/map.
 */

export default (data, groupingFunction) => {
    if (typeof groupingFunction !== 'function') {
        throw new Error(`groupBy: Second argument must be a function, is ${groupingFunction} (${typeof groupingFunction}) instead.`);
    }
    const asMap = data.reduce((grouped, row) => {
        const key = groupingFunction(row);
        grouped.has(key) ? grouped.get(key).push(row) : grouped.set(key, [row]);
        return grouped;
    }, new Map());
    return Array.from(asMap.entries());
};