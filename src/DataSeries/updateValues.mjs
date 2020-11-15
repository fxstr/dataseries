/**
 * Goes through all rows of data and appplies formatFunction for every row.
 * @param {array} data
 * @param {function} formatFunction
 * @return {array}
 */
export default (data, formatFunction) => {
    if (typeof formatFunction !== 'function') {
        throw new Error(`formatValues: format function must be a function, is ${formatFunction} instead.`);
    }
    return data.map(row => new Map(
        Array.from(row.entries()).map(([key, value]) => [key, formatFunction(key, value)])
    ));
};
