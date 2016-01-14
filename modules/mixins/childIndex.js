import getPseudoExpression from '../utils/getPseudoExpression'
import evalNthExpression from '../utils/evalNthExpression'
import getChildIndex from '../utils/getChildIndex'

const firstChild = (property, styles, mixinKey, { parent, element }) => {
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

const lastChild = (property, styles, mixinKey, { parent, element }) => {
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

const onlyChild = (property, styles, mixinKey, { parent, element }) => {
  if (parent && parent.props.children.length === 1) {
    return styles
  }
  const elementParent = element._owner._instance.props._parent

  if (elementParent && elementParent.props.children.length === 1) {
    return styles
  }

  return false
}

const nthChild = (property, styles, mixinKey, { parent, element }) => {
  const expression = getPseudoExpression(property)
  const childIndex = getChildIndex(parent, element)
  return evalNthExpression(expression, childIndex + 1) ? styles : false
}

const nthLastChild = (property, styles, mixinKey, { parent, element }) => {
  const expression = getPseudoExpression(property)
  const childIndex = getChildIndex(parent, element)

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
