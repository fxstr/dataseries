export default (data, renamingFunction) => {
    if (typeof renamingFunction !== 'function') {
        throw new Error(`renameColumns: Second argument must be a function, is ${renamingFunction} instead.`);
    }
    return data.map(row => (
        new Map(Array.from(row.entries()).map(([key, value]) => [renamingFunction(key), value]))
    ));
}
