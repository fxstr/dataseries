export default (data, name, values) => {

    if (!Array.isArray(values)) {
        throw new Error(`addColumn: Parameter values must be an array, is ${JSON.stringify(values)} instead.`);
    }
    if (data.length !== values.length) {
        throw new Error(`addColumn: Length of values must be the same as length of TimeSeries' data; length of value is ${values.length}, size of TimeSeries is ${data.length}.`);
    }
    
    return data.map((item, index) => (
        new Map([...item.entries(), [name, values[index]]])
    ));
    
};
