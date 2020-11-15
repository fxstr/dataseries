/**
 * Concats one or multiple arrays together without modifying the original data
 * @param  {array}    previous      Array that new data should be added to
 * @param  {...array} params        One or more arrays that should be merged with the first
 *                                  parameter passed
 * @return {array}                  Array with merged items
 */
export default (previous, ...params) => (
    [...previous, ...params.flat()]
);
