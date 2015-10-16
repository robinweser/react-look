import getNthExpression from '../../utils/splitNthExpression'
import evalNthExpression from '../../utils/evalNthExpression'

/**
 * Returns a childs type
 * If child is an ES6 class it returns the displayName
 * @param {Object} child - child which type gets identified
 */
const getChildType = (child) => {
  let childType
  if (child.type instanceof Function) {
    childType = (child.type.hasOwnProperty('name') ? child.type.name : child.type)
  } else {
    childType = child.type
  }
  return childType
}

/**
 * Evaluates child-type index positions using data from childIndexMap
 * childIndexMap is provided by arguments
 */
const firstOfType = (property, styles, customKey, {parent, element}) => {
  if (parent) {
    const elementType = getChildType(element)
    const children = parent.props.children
    let index
    const length = children.length
    for (index = 0; index < length; ++index) {
      if (getChildType(children[index]) === elementType) {
        if (children[index] === element) {
          return styles
        } else {
          return false
        }
      }
    }
  } else {
    const elementKey = element._owner._currentElement.key
    if (!elementKey) {
      // TODO: Warning
      return false
    }
    const elementParent = element._owner._instance.props._parent
    if (elementParent) {
      const elementType = getChildType(element._owner._currentElement)
      const children = elementParent.props.children
      let index
      const length = children.length
      for (index = 0; index < length; ++index) {
        if (getChildType(children[index]) === elementType) {
          if (children[index].key === elementKey) {
            return styles
          } else {
            return false
          }
        }
      }
    }
  }
  return false
}


const lastOfType = (property, styles, customKey, {parent, element}) => {
  if (parent) {
    const elementType = getChildType(element)
    const children = parent.props.children
    let lastTypedElement
    let index
    const length = children.length
    for (index = 0; index < length; ++index) {
      if (getChildType(children[index]) === elementType) {
        if (children[index] === element) {
          lastTypedElement = true
        } else {
          lastTypedElement = false
        }
      }
    }
    if (lastTypedElement) {
      return styles
    }
  } else {
    const elementKey = element._owner._currentElement.key
    if (!elementKey) {
      // TODO: Warning
      return false
    }
    const elementParent = element._owner._instance.props._parent
    if (elementParent) {
      const elementType = getChildType(element._owner._currentElement)
      const children = elementParent.props.children
      let lastTypedElement
      let index
      const length = children.length
      for (index = 0; index < length; ++index) {
        if (getChildType(children[index]) === elementType) {
          if (children[index].key === elementKey) {
            lastTypedElement = true
          } else {
            lastTypedElement = false
          }
        }
      }
      if (lastTypedElement) {
        return styles
      }
    }
  }
  return false
}


const onlyOfType = (property, styles, customKey, {parent, element}) => {
  if (parent) {
    const elementType = getChildType(element)
    const children = parent.props.children
    let typeCount = 0
    let index
    const length = children.length
    for (index = 0; index < length; ++index) {
      if (getChildType(children[index]) === elementType) {
        ++typeCount
      }
    }
    if (typeCount === 1) {
      return styles
    }
  } else {
    const elementKey = element._owner._currentElement.key
    if (!elementKey) {
      // TODO: Warning
      return false
    }
    const elementParent = element._owner._instance.props._parent
    if (elementParent) {
      const elementType = getChildType(element._owner._currentElement)
      const children = elementParent.props.children
      let typeCount = -1
      let index
      const length = children.length
      for (index = 0; index < length; ++index) {
        if (getChildType(children[index]) === elementType) {
          ++typeCount
          if (children[index].key === elementKey) {
            // double check to only match the real elements
            ++typeCount
          }
        }
      }
      if (typeCount === 1) {
        return styles
      }
    }
  }
  return false
}


const nthOfType = (property, styles, customKey, {parent, element}) => {
  if (parent) {
    const elementType = getChildType(element)
    const children = parent.props.children
    let typeIndex = 0
    let index
    const length = children.length
    for (index = 0; index < length; ++index) {
      if (getChildType(children[index]) === elementType) {
        ++typeIndex
        if (children[index] === element) {
          const expression = getNthExpression(property)
          if (evalNthExpression(expression, typeIndex)) {
            return styles
          }
        }
      }
    }
  } else {
    const elementKey = element._owner._currentElement.key
    if (!elementKey) {
      // TODO: Warning
      return false
    }
    const elementParent = element._owner._instance.props._parent
    if (elementParent) {
      const elementType = getChildType(element._owner._currentElement)
      const children = elementParent.props.children
      let typeIndex = 0
      let index
      const length = children.length
      for (index = 0; index < length; ++index) {
        if (getChildType(children[index]) === elementType) {
          ++typeIndex
          if (children[index].key === elementKey) {
            const expression = getNthExpression(property)
            if (evalNthExpression(expression, typeIndex)) {
              return styles
            }
          }
        }
      }
    }
  }
  return false
}


const nthLastOfType = (property, styles, customKey, {parent, element}) => {
  if (parent) {
    const elementType = getChildType(element)
    const children = parent.props.children
    let typeIndex
    let typeCount = 0
    let index
    const length = children.length
    for (index = 0; index < length; ++index) {
      if (getChildType(children[index]) === elementType) {
        ++typeCount
        if (children[index] === element) {
          typeIndex = typeCount
        }
      }
    }
    if (typeIndex) {
      const expression = getNthExpression(property)
      if (evalNthExpression(expression, typeCount + 1 - typeIndex)) {
        return styles
      }
    }
  } else {
    const elementKey = element._owner._currentElement.key
    if (!elementKey) {
      // TODO: Warning
      return false
    }
    const elementParent = element._owner._instance.props._parent
    if (elementParent) {
      const elementType = getChildType(element._owner._currentElement)
      const children = elementParent.props.children
      let typeIndex
      let typeCount = 0
      let index
      const length = children.length
      for (index = 0; index < length; ++index) {
        if (getChildType(children[index]) === elementType) {
          ++typeCount
          if (children[index].key === elementKey) {
            typeIndex = typeCount
          }
        }
      }
      if (typeIndex) {
        const expression = getNthExpression(property)
        if (evalNthExpression(expression, typeCount + 1 - typeIndex)) {
          return styles
        }
      }
    }
  }
  return false
}

export default {
  firstOfType,
  lastOfType,
  onlyOfType,
  nthOfType,
  nthLastOfType
}
