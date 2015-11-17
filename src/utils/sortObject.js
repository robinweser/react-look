/**
 * Sorts objects in order to always get the same hash code
 * @param {Object} obj - Object that gets sorted
 */
export default obj => {
  let out = {}
  Object.keys(obj).sort().forEach(key => {
    if (obj[key] instanceof Object) {
      out[key] = sortObject(obj[key])
    } else {
      out[key] = obj[key]
    }
  })
  return out
}
