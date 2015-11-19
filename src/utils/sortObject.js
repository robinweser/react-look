/**
 * Sorts objects in order to always get the same hash code
 * @param {Object} obj - Object that gets sorted
 */
const sortObject = obj => {
  const out = {}

  Object.keys(obj).sort().forEach(key => {
    if (obj[key] instanceof Object) {
      out[key] = sortObject(obj[key])
    } else {
      out[key] = obj[key]
    }
  })

  return out
}

export  {
  sortObject as default
}
