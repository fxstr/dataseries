export default (data, columnName) => {
    const result = data.map(row => row.get(columnName));
    if (data.every(row => !row.has(columnName))) {
        console.warn(`getColumn: Column ${columnName} does not exist.`);
    }
    return result;
};
