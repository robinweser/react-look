import MixinTypes from '../../utils/MixinTypes'
import getNthExpression from '../../utils/splitNthExpression'
import evalNthExpression from '../../utils/evalNthExpression'
import flattenArray from '../../utils/flattenArray'

const getChildIndex = (element) => {
  let index
  let elementParent = element._owner._instance.props._parent
  if (elementParent) {
    let ownerKey = element._owner._currentElement.key
    if (ownerKey === null) {
      console.warn('You need to pass a unique key in order to use child-index pseudo classes.')
      return undefined
    }
    flattenArray(elementParent.props.children).forEach((child, i) => {
      if (child.key === ownerKey) {
        index = i
        return
      }
    })
  }
  return index
}

/**
 * Evaluates child index positions using data from childIndexMap
 * childIndexMap is provided by arguments
 */
export default [{
  key: ':first-child',
  type: MixinTypes.EQUAL,
  fn: (key, styles, {element}) => {
    let elementParent = element._owner._instance.props._parent
    let elementKey = element._owner._currentElement.key
    if (elementParent && flattenArray(elementParent.props.children)[0].key === elementKey && elementKey !== null) {
      return styles
    }
  }
}, {
  key: ':last-child',
  type: MixinTypes.EQUAL,
  fn: (key, styles, {element}) => {
    let elementParent = element._owner._instance.props._parent
    let elementKey = element._owner._currentElement.key
    if (elementParent) {
      let children = flattenArray(elementParent.props.children)
      if (children[children.length - 1].key === elementKey && elementKey !== null) {
        return styles
      }
    }
  }
}, {
  key: ':only-child',
  type: MixinTypes.EQUAL,
  fn: (key, styles, {parent}) => {
    let elementParent = element._owner._instance.props._parent
    if (elementParent && flattenArray(elementParent.props.children).length === 1) {
      return styles
    }
  }
}, {
  key: ':nth-child',
  type: MixinTypes.BEGINWITH,
  fn: (key, styles, {element}) => {
    let expression = getNthExpression(key)
    let childIndex = getChildIndex(element)
    if (childIndex === undefined) {
      return false
    }
    return evalNthExpression(expression, childIndex + 1) ? styles : false
  }
}, {
  key: ':nth-last-child',
  type: MixinTypes.BEGINWITH,
  fn: (key, styles, {element}) => {
    let expression = getNthExpression(key)
    let childIndex = getChildIndex(element)
    if (!childIndex === undefined) {
      return false
    }
    let childLength
    let elementParent = element._owner._instance.props._parent
    if (elementParent) {
      childLength = flattenArray(elementParent.props.children).length
    } else {
      return false
    }
    return evalNthExpression(expression, length - childIndex) ? styles : false
  }
}]