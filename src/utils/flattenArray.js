/**
 * Flattens an array of nested arrays to the same level
 * @param {Array} array - array that gets flatten
 */
export default function flattenArray(array) {
  // return if input is not an array
  if (array instanceof Array !== true) {
    return array
  }

  let flat = []
  array.forEach(child => {
    if (child instanceof Array) {
      child = flattenArray(child)
    }
    flat = flat.concat(child)
  })

  return flat
}