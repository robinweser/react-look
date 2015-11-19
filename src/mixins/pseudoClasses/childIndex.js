import getPseudoExpression from '../../utils/getPseudoExpression'
import evalNthExpression from '../../utils/evalNthExpression'
import warn from '../../utils/warn'

// Evaluates child index positions using the parent element passed with scopeArgs
const getChildIndex = (parent, element) => {
  let index
  if (parent) {
    index = parent.props.children.indexOf(element)
  } else {
    const elementParent = element._owner._instance.props._parent
    if (elementParent) {
      const ownerKey = element._owner._currentElement.key
      if (ownerKey === null) {
        warn('You need to pass a unique key in order to use child-index pseudo classes.', element._owner._currentElement)
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

const firstChild = (property, styles, mixinKey, {parent, element}) => {
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

const lastChild = (property, styles, mixinKey, {parent, element}) => {
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

const onlyChild = (property, styles, mixinKey, {parent, element}) => {
  if (parent && parent.props.children.length === 1) {
    return styles
  }
  const elementParent = element._owner._instance.props._parent

  if (elementParent && elementParent.props.children.length === 1) {
    return styles
  }

  return false
}

const nthChild = (property, styles, mixinKey, {parent, element}) => {
  const expression = getPseudoExpression(property)
  const childIndex = getChildIndex(parent, element)
  if (childIndex === undefined) {
    return false
  }
  return evalNthExpression(expression, childIndex + 1) ? styles : false
}

const nthLastChild = (property, styles, mixinKey, {parent, element}) => {
  const expression = getPseudoExpression(property)
  const childIndex = getChildIndex(parent, element)
  if (childIndex === undefined) {
    return false
  }

  let childLength
  if (parent) {
    childLength = parent.props.children.length
  } else {
    const elementParent = element._owner._instance.props._parent
    if (elementParent) {
      childLength = elementParent.props.children.length
    } else {
      return false
    }
  }
  return evalNthExpression(expression, childLength - childIndex) ? styles : false
}

export default {
  firstChild,
  lastChild,
  onlyChild,
  nthChild,
  nthLastChild
}
