import getNthExpression from '../../utils/splitNthExpression'
import evalNthExpression from '../../utils/evalNthExpression'

/**
 * Evaluates child index positions using data from childIndexMap
 * childIndexMap is provided by arguments
 */
const getChildIndex = (parent, element) => {
  let index
  if (parent) {
    index = parent.props.children.indexOf(element)
  } else {
    const elementParent = element._owner._instance.props._parent
    if (elementParent) {
      const ownerKey = element._owner._currentElement.key
      if (ownerKey === null) {
        console.warn('You need to pass a unique key in order to use child-index pseudo classes.')
        return undefined
      }
      elementParent.props.children.forEach((child, pos) => {
        if (child.key === ownerKey) {
          index = pos
          return
        }
      })
    }
  }

  return index
}

const firstChild = (property, styles, customKey, {parent, element}) => {
  if (parent) {
    if (parent.props.children[0] === element) {
      return styles
    }
  } else {
    const elementParent = element._owner._instance.props._parent
    const elementKey = element._owner._currentElement.key.replace('.$', '')
    if (elementParent && elementParent.props.children[0].key === elementKey && elementKey !== null) {
      return styles
    }
  }
  return false
}

const lastChild = (property, styles, customKey, {parent, element}) => {
  if (parent) {
    const children = parent.props.children
    if (children[children.length - 1] === element) {
      return styles
    }
  } else {
    const elementParent = element._owner._instance.props._parent
    const elementKey = element._owner._currentElement.key
    if (elementParent) {
      const children = elementParent.props.children
      if (children[children.length - 1].key === elementKey && elementKey !== null) {
        return styles
      }
    }
  }
  return false
}

const onlyChild = (property, styles, customKey, {parent, element}) => {
  if (parent && parent.props.children.length === 1) {
    return styles
  }
  const elementParent = element._owner._instance.props._parent

  if (elementParent && elementParent.props.children.length === 1) {
    return styles
  }

  return false
}

const nthChild = (property, styles, customKey, {parent, element}) => {
  const expression = getNthExpression(property)
  const childIndex = getChildIndex(parent, element)
  if (childIndex === undefined) {
    return false
  }
  return evalNthExpression(expression, childIndex + 1) ? styles : false
}

const nthLastChild = (property, styles, customKey, {parent, element}) => {
  const expression = getNthExpression(property)
  const childIndex = getChildIndex(parent, element)
  if (childIndex === undefined) {
    return false
  }
  // TODO: childLength wasn't used.. is it needed?
  if (!parent) {
    const elementParent = element._owner._instance.props._parent

    if (!elementParent) {
      return false
    }
  }

  return evalNthExpression(expression, length - childIndex) ? styles : false
}

export default {
  firstChild,
  lastChild,
  onlyChild,
  nthChild,
  nthLastChild
}
