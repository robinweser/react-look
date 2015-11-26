import warn from './warn'

/**
 * Evaluates child index positions using the parent element passed with scopeArgs
 * @param {Object} parent - parent element
 * @param {Object} element - element thats position gets evaluated
 */
export default (parent, element) => {
  if (!element) {
    return false
  }

  let index

  if (parent) {
    index = parent.props.children.indexOf(element)
  } else {
    const elementParent = element._owner._instance.props._parent
    if (elementParent) {
      const ownerKey = element._owner._currentElement.key
      if (ownerKey === null) {
        warn('You need to pass a unique key in order to use child-index pseudo classes.', element._owner._currentElement)
        return false
      }
      elementParent.props.children.forEach((child, pos) => {
        if (child.key === ownerKey) {
          index = pos
          return
        }
      })
    }
  }

  return index > -1 ? index : false
}
