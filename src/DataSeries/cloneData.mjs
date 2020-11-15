/**
 * Clones data one level deep (array and Maps)
 * @param  {Map[]} data    Array of Maps to clone
 * @return {[type]}        Shallowly cloned data
 */
export default data => (
    [...data.map(entry => new Map(entry))]
);
