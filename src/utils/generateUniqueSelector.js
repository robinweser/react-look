import generateHashCode from './generateHashCode'
import sortObject from './sortObject'

/**
 * Generates a unique hash code for a given style object
 * if the style properties are the same, the same hash will be returned
 * no matter how they're sorted
 * @param {Object} styles - style object which will get sorted and hashed
 */
export default styles => {
  if (styles !== undefined && styles instanceof Object) {
    return 'c' + generateHashCode(JSON.stringify(sortObject(styles)))
  }
}
