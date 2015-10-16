import getNthExpression from '../../utils/splitNthExpression'
import evalNthExpression from '../../utils/evalNthExpression'


const firstChild = (property, styles, customKey, {parent, element}) => {
  if (parent) {
    if (parent.props.children[0] === element) {
      return styles
    }
  } else {
    let elementParent = element._owner._instance.props._parent
    let elementKey = element._owner._currentElement.key
    if (elementParent && elementParent.props.children[0].key === elementKey && elementKey !== null) {
      return styles
    }
  }
}

const lastChild = (property, styles, customKey, {parent, element}) => {
  if (parent) {
    let children = parent.props.children
    if (children[children.length - 1] === element) {
      return styles
    }
  } else {
    let elementParent = element._owner._instance.props._parent
    let elementKey = element._owner._currentElement.key
    if (elementParent) {
      let children = elementParent.props.children
      if (children[children.length - 1].key === elementKey && elementKey !== null) {
        return styles
      }
    }
  }
}

const onlyChild = (property, styles, customKey, {parent, element}) => {
  if (parent && parent.props.children.length === 1) {
    return styles
  } else {
    let elementParent = element._owner._instance.props._parent
    if (elementParent && elementParent.props.children.length === 1) {
      return styles
    }
  }
}

const nthChild = (property, styles, customKey, {parent, element}) => {
  let expression = getNthExpression(property)
  let childIndex = getChildIndex(parent, element)
  if (childIndex === undefined) {
    return false
  }
  return evalNthExpression(expression, childIndex + 1) ? styles : false
}

const nthLastChild = (property, styles, customKey, {parent, element}) => {
  let expression = getNthExpression(property)
  let childIndex = getChildIndex(parent, element)
  if (!childIndex === undefined) {
    return false
  }
  let childLength
  if (parent) {
    childLength = parent.props.children.length
  } else {
    let elementParent = element._owner._instance.props._parent
    if (elementParent) {
      childLength = elementParent.props.children.length
    } else {
      return false
    }
  }
  return evalNthExpression(expression, length - childIndex) ? styles : false
}

export default {
  firstChild,
  lastChild,
  OnlyChild,
  NthChild,
  NthLastChild
}

/**
 * Evaluates child index positions using data from childIndexMap
 * childIndexMap is provided by arguments
 */
const getChildIndex = (parent, element) => {
  let index
  if (parent) {
    index = parent.props.children.indexOf(element)
  } else {
    let elementParent = element._owner._instance.props._parent
    if (elementParent) {
      let ownerKey = element._owner._currentElement.key
      if (ownerKey === null) {
        console.warn('You need to pass a unique key in order to use child-index pseudo classes.')
        return undefined
      }
      elementParent.props.children.forEach((child, i) => {
        if (child.key === ownerKey) {
          return index = i
        }
      })
    }
  }
  return index
}