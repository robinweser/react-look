/**
 * Flattens an array of nested arrays to the same level
 * @param {Array} array - array that gets flatten
 */
const flattenArray = array => {
  let out = []

  // return if input is not an array
  if (array instanceof Array !== true) {
    return array
  }

  array.forEach(child => out = out.concat(flattenArray(child)))
  return out
}

export {flattenArray as default}
