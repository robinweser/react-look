/**
 * Converts a camel-case string to a dash-case string
 * @param {string} str - str that gets converted to dash-case
 */
export default str => str.replace(/([a-z]|^)([A-Z])/g, (match, p1, p2) => p1 + '-' + p2.toLowerCase()).replace('ms-', '-ms-')
