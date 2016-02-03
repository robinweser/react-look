import generateHashCode from './generateHashCode'
import sortObject from './sortObject'
import _ from 'lodash'

let counter = 0
/**
 * Generates a unique hash code for a given style object
 * if the style properties are the same, the same hash will be returned
 * no matter how they're sorted
 * @param {Object} styles - style object which will get sorted and hashed
 */
export default function generateClassName(styles) {
  if (_.isEmpty(styles)) {
    return ++counter
  }
  return generateHashCode(JSON.stringify(sortObject(styles)))
}
