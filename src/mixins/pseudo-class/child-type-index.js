import MixinTypes from '../../utils/MixinTypes'
import getNthExpression from '../../utils/splitNthExpression'
import evalNthExpression from '../../utils/evalNthExpression'
import flattenArray from '../../utils/flattenArray'

/**
 * Returns a childs type
 * If child is an ES6 class it returns the displayName
 * @param {Object} child - child which type gets identified
 */
export function getChildType(child) {
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
export default [{
  key: ':first-of-type',
  type: MixinTypes.EQUAL,
  fn: (key, styles, {parent, element}) => {
    if (parent) {
      let elementType = getChildType(element)
      let children = flattenArray(parent.props.children)
      let i
      let length = children.length

      for (i = 0; i < length; ++i) {
        if (getChildType(children[i]) === elementType) {
          if (children[i] === element) {
            return styles
          } else {
            return false
          }
        }
      }
    } else {
      let elementKey = element._owner._currentElement.key

      if (!elementKey) {
        // TODO: Warning
        return false
      }

      let elementParent = element._owner._instance.props._parent

      if (elementParent) {
        let elementType = getChildType(element._owner._currentElement)
        let children = flattenArray(elementParent.props.children)
        let i
        let length = children.length

        for (i = 0; i < length; ++i) {
          if (getChildType(children[i]) === elementType) {
            if (children[i].key === elementKey) {
              return styles
            } else {
              return false
            }
          }
        }
      }
    }
  }
}, {
  key: ':last-of-type',
  type: MixinTypes.EQUAL,
  fn: (key, styles, {parent, element}) => {
    if (parent) {
      let elementType = getChildType(element)
      let children = flattenArray(parent.props.children)
      let lastTypedElement
      let i
      let length = children.length

      for (i = 0; i < length; ++i) {
        if (getChildType(children[i]) === elementType) {
          if (children[i] === element) {
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
      let elementKey = element._owner._currentElement.key

      if (!elementKey) {
        // TODO: Warning
        return false
      }

      let elementParent = element._owner._instance.props._parent

      if (elementParent) {
        let elementType = getChildType(element._owner._currentElement)
        let children = flattenArray(elementParent.props.children)
        let lastTypedElement
        let i
        let length = children.length

        for (i = 0; i < length; ++i) {
          if (getChildType(children[i]) === elementType) {
            if (children[i].key === elementKey) {
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
  }
}, {
  key: ':only-of-type',
  type: MixinTypes.EQUAL,
  fn: (key, styles, {parent, element}) => {
    if (parent) {
      let elementType = getChildType(element)
      let children = flattenArray(parent.props.children)
      let typeCount = 0
      let i
      let length = children.length

      for (i = 0; i < length; ++i) {
        if (getChildType(children[i]) === elementType) {
          ++typeCount
        }
      }

      if (typeCount === 1) {
        return styles
      }
    } else {
      let elementKey = element._owner._currentElement.key

      if (!elementKey) {
        // TODO: Warning
        return false
      }

      let elementParent = element._owner._instance.props._parent

      if (elementParent) {
        let elementType = getChildType(element._owner._currentElement)
        let children = flattenArray(elementParent.props.children)
        let typeCount = -1
        let i
        let length = children.length

        for (i = 0; i < length; ++i) {
          if (getChildType(children[i]) === elementType) {
            ++typeCount
            if (children[i].key === elementKey) {
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
  }
}, {
  key: ':nth-of-type',
  type: MixinTypes.BEGINWITH,
  fn: (key, styles, {parent, element}) => {
    if (parent) {
      let elementType = getChildType(element)
      let children = flattenArray(parent.props.children)
      let typeIndex = 0
      let i
      let length = children.length

      for (i = 0; i < length; ++i) {
        if (getChildType(children[i]) === elementType) {
          ++typeIndex

          if (children[i] === element) {
            let expression = getNthExpression(key)

            if (evalNthExpression(expression, typeIndex)) {
              return styles
            }
          }
        }
      }
    } else {
      let elementKey = element._owner._currentElement.key

      if (!elementKey) {
        // TODO: Warning
        return false
      }

      let elementParent = element._owner._instance.props._parent

      if (elementParent) {
        let elementType = getChildType(element._owner._currentElement)
        let children = flattenArray(elementParent.props.children)
        let typeIndex = 0
        let i
        let length = children.length

        for (i = 0; i < length; ++i) {
          if (getChildType(children[i]) === elementType) {
            ++typeIndex

            if (children[i].key === elementKey) {
              let expression = getNthExpression(key)

              if (evalNthExpression(expression, typeIndex)) {
                return styles
              }
            }
          }
        }
      }
    }
  }
}, {
  key: ':nth-last-of-type',
  type: MixinTypes.BEGINWITH,
  fn: (key, styles, {parent, element}) => {
    if (parent) {
      let elementType = getChildType(element)
      let children = flattenArray(parent.props.children)
      let typeIndex
      let typeCount = 0
      let i
      let length = children.length

      for (i = 0; i < length; ++i) {
        if (getChildType(children[i]) === elementType) {
          ++typeCount

          if (children[i] === element) {
            typeIndex = typeCount
          }
        }
      }

      if (typeIndex) {
        let expression = getNthExpression(key)

        if (evalNthExpression(expression, typeCount + 1 - typeIndex)) {
          return styles
        }
      }
    } else {
      let elementKey = element._owner._currentElement.key

      if (!elementKey) {
        // TODO: Warning
        return false
      }

      let elementParent = element._owner._instance.props._parent

      if (elementParent) {
        let elementType = getChildType(element._owner._currentElement)
        let children = flattenArray(elementParent.props.children)
        let typeIndex
        let typeCount = 0
        let i
        let length = children.length

        for (i = 0; i < length; ++i) {
          if (getChildType(children[i]) === elementType) {
            ++typeCount

            if (children[i].key === elementKey) {
              typeIndex = typeCount
            }
          }
        }

        if (typeIndex) {
          let expression = getNthExpression(key)

          if (evalNthExpression(expression, typeCount + 1 - typeIndex)) {
            return styles
          }
        }
      }
    }
  }
}]
