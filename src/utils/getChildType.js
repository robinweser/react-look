/**
 * Returns a childs type
 * If child is an ES6 class it returns the displayName
 * @param {Object} child - child which type gets identified
 */
export default child => {
  let childType
  if (child.type instanceof Function) {
    childType = (child.type.hasOwnProperty('name') ? child.type.name : child.type)
  } else {
    childType = child.type
  }
  return childType
}
