/**
 * Sorts objects in order to always get the same hash code
 * @param {Object} obj - Object that gets sorted
 */
export default function sortObject(obj) {
  return Object.keys(obj).sort().reduce((output, property) => {
    output[property] = obj[property]; // eslint-disable-line
    return output; // eslint-disable-line
  }, { })
}
