export default (data, dataToMerge) => {
    if (!Array.isArray(dataToMerge)) {
        throw new Error(`mergeRows: dataToMerge must be an array, is ${dataToMerge} instead.`);
    }
    if (data.length !== dataToMerge.length) {
        throw new Error(`mergeRows: dataToMerge must have the same length as data; length of dataToMerge is ${dataToMerge.length}, length of data is ${data.length}.`);
    }
    return data.map((row, index) => (
        new Map([...row.entries(), ...dataToMerge[index].entries()])
    ));
}