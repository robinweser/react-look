/**
 * Flattens an array of nested arrays to the same level
 * @param {Array} array - array that gets flatten
 */
const flattenArray = array => {
  // return if input is not an array
  if (array instanceof Array !== true) {
    return array
  }
  return array.map(child => child instanceof Array ? flattenArray(child) : child)
}

export {flattenArray as default}
