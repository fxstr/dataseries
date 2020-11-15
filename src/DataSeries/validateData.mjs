export default (data) => {
    if (!Array.isArray(data)) {
        throw new Error(`validateData: Pass an array as argument; you used ${JSON.stringify(data)} instead.`);
    }
    const notMaps = data.filter(item => !(item instanceof Map));
    if (notMaps.length) {
        throw new Error(`validateData: Pass an array where every item is a Map; you passed an array, but the following items are not Maps: ${notMaps.map(JSON.stringify).join(', ')}`);
    }
    return data;
};
