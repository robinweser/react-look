
/**
 * Flattens an array of nested arrays to the same level
 * @param {Array} array - array that gets flatten
 */
export default (array) => {
  // return if input is not an array
  if (array instanceof Array !== true) {
    return array
  }

  let flat = []

  array.forEach(child => {
    let catChild = child

    if (child instanceof Array) {
      catChild = flattenArray(child)
    }
    
    flat = flat.concat(catChild)
  })

  return flat
}
