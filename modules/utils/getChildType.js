import _ from 'lodash'

/**
 * Returns a childs type
 * If child is an ES6 class it returns the displayName
 * @param {Object} child - child which type gets identified
 */
export default function getChildType(child) {
  if (_.isFunction(child.type)) {
    return child.type.hasOwnProperty('name') ? child.type.name : child.type
  }
  return child.type
}
