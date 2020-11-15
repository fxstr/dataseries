export default name => name
    // Letters after a space become upper case, space is removed
    .replace(/\s+(\w)/g, (match, letter) => letter.toUpperCase())
    // First letter is always lower case
    .replace(/^(\w)/g, (match, letter) => letter.toLowerCase());