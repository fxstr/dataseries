/**
 * Sorts data by keys/order provided
 * @param {array} data
 * @param {array} sortOrder      Each item is either a function that returns the row's key to sort
 *                               by or an array [function, bool] with a function that returns
 *                               the row's key to sort by and true if data should be sorted
 *                               descending.
 * @return {array}
*/
export default (data, ...sortOrder) => {
    sortOrder.forEach((order) => {
        if (typeof order !== 'function' && !Array.isArray(order)) {
            throw new Error(`sortBy: Expected parameters to be functions or arrays, is ${order} instead.`);
        }
        if (
            Array.isArray(order) &&
            (typeof order[0] !== 'function' || (order[1] !== 'asc' && order[1] !== 'desc'))
        ) {
            throw new Error(`sortBy: Expected array parameters to consist of a function and either 'asc' or 'desc', is [${order[0]}, ${order[1]}] instead.`)
        }

    });
    // Harmonize arguments and convert all to [function, order]
    const cleanSortOrder = sortOrder
        .map(item => (typeof item === 'function' ? [item, 'asc'] : item));
    // Sort sorts in place; copy array first
    return [...data].sort((a, b) => {
        // Get first item in sortOrder for which fn(a) and fn(b) are different
        const sorter = cleanSortOrder.find(([sort]) => sort(a) < sort(b) || sort(a) > sort(b));
        // Results are the same
        if (!sorter) return 0;
        const [sortFunction, order] = sorter;
        const aBefore = sortFunction(a) < sortFunction(b);
        return ((aBefore && order === 'asc') || (!aBefore && order === 'desc')) ? -1 : 1;
    });
};

