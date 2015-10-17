import evalNthExpression from '../../utils/evalNthExpression'
import flattenArray      from '../../utils/flattenArray'
import getNthExpression  from '../../utils/splitNthExpression'
import MixinTypes        from '../../utils/MixinTypes'

/**
 * Returns a childs type
 * If child is an ES6 class it returns the displayName
 * @param {Object} child - child which type gets identified
 */
export function getChildType( child ) {
  let childType

  if ( child.type instanceof Function ) {
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
  fn: ( key, styles, { parent, element } ) => {
    if ( parent ) {
      const children = flattenArray(parent.props.children)
      const elementType = getChildType(element)
      const length = children.length

      for ( let ix = 0; ix < length; ++ix ) {
        if ( getChildType(children[ix]) === elementType ) {
          if (children[ix] === element) {
            return styles
          }

          return false
        }
      }
    } else {
      const elementKey = element._owner._currentElement.key

      if ( !elementKey ) {
        // TODO: Warning
        return false
      }

      const elementParent = element._owner._instance.props._parent

      if ( elementParent ) {
        const children = flattenArray(elementParent.props.children)
        const elementType = getChildType(element._owner._currentElement)
        const length = children.length

        for ( let ix = 0; ix < length; ++ix ) {
          if ( getChildType(children[ix]) === elementType ) {
            if ( children[ix].key === elementKey ) {
              return styles
            }

            return false
          }
        }
      }
    }
  }
}, {
  key: ':last-of-type',
  type: MixinTypes.EQUAL,
  fn: ( key, styles, { parent, element } ) => {
    if ( parent ) {
      const children = flattenArray(parent.props.children)
      const elementType = getChildType(element)
      const length = children.length

      let lastTypedElement

      for ( let ix = 0; ix < length; ++ix ) {
        if ( getChildType(children[ix]) === elementType ) {
          lastTypedElement = children[ix] === element
        }
      }

      if ( lastTypedElement ) {
        return styles
      }
    } else {
      const elementKey = element._owner._currentElement.key

      if ( !elementKey ) {
        // TODO: Warning
        return false
      }

      const elementParent = element._owner._instance.props._parent

      if ( elementParent ) {
        const children = flattenArray(elementParent.props.children)
        const elementType = getChildType(element._owner._currentElement)
        const length = children.length

        let lastTypedElement

        for ( let ix = 0; ix < length; ++ix ) {
          if ( getChildType(children[ix]) === elementType ) {
            lastTypedElement = children[ix].key === elementKey
          }
        }

        if ( lastTypedElement ) {
          return styles
        }
      }
    }
  }
}, {
  key: ':only-of-type',
  type: MixinTypes.EQUAL,
  fn: ( key, styles, { parent, element } ) => {
    if ( parent ) {
      const children = flattenArray(parent.props.children)
      const elementType = getChildType(element)
      const length = children.length

      let typeCount = 0

      for ( let ix = 0; ix < length; ++ix ) {
        if ( getChildType(children[ix]) === elementType ) {
          ++typeCount
        }
      }

      if ( typeCount === 1 ) {
        return styles
      }
    } else {
      const elementKey = element._owner._currentElement.key

      if ( !elementKey ) {
        // TODO: Warning
        return false
      }

      const elementParent = element._owner._instance.props._parent

      if ( elementParent ) {
        const children = flattenArray(elementParent.props.children)
        const elementType = getChildType(element._owner._currentElement)
        const length = children.length

        let typeCount = -1

        for ( let ix = 0; ix < length; ++ix ) {
          if ( getChildType(children[ix]) === elementType ) {
            ++typeCount

            if ( children[ix].key === elementKey ) {
              // double check to only match the real elements
              ++typeCount
            }
          }
        }

        if ( typeCount === 1 ) {
          return styles
        }
      }
    }
  }
}, {
  key: ':nth-of-type',
  type: MixinTypes.BEGINWITH,
  fn: ( key, styles, { parent, element } ) => {
    if ( parent ) {
      const children = flattenArray(parent.props.children)
      const elementType = getChildType(element)
      const length = children.length

      let typeIndex = 0

      for ( let ix = 0; ix < length; ++ix ) {
        if ( getChildType(children[ix]) === elementType ) {
          ++typeIndex

          if ( children[ix] === element ) {
            const expression = getNthExpression(key)

            if ( evalNthExpression(expression, typeIndex) ) {
              return styles
            }
          }
        }
      }
    } else {
      const elementKey = element._owner._currentElement.key

      if ( !elementKey ) {
        // TODO: Warning
        return false
      }

      const elementParent = element._owner._instance.props._parent

      if ( elementParent ) {
        const children = flattenArray(elementParent.props.children)
        const elementType = getChildType(element._owner._currentElement)
        const length = children.length

        let typeIndex = 0

        for ( let ix = 0; ix < length; ++ix ) {
          if ( getChildType(children[ix]) === elementType ) {
            ++typeIndex

            if ( children[ix].key === elementKey ) {
              const expression = getNthExpression(key)

              if ( evalNthExpression(expression, typeIndex) ) {
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
  fn: ( key, styles, { parent, element } ) => {
    if ( parent ) {
      const children = flattenArray(parent.props.children)
      const elementType = getChildType(element)
      const length = children.length

      let typeCount = 0
      let typeIndex

      for ( let ix = 0; ix < length; ++ix ) {
        if ( getChildType(children[ix]) === elementType ) {
          ++typeCount

          if ( children[ix] === element ) {
            typeIndex = typeCount
          }
        }
      }

      if ( typeIndex ) {
        const expression = getNthExpression(key)

        if ( evalNthExpression(expression, typeCount + 1 - typeIndex) ) {
          return styles
        }
      }
    } else {
      const elementKey = element._owner._currentElement.key

      if ( !elementKey ) {
        // TODO: Warning
        return false
      }

      const elementParent = element._owner._instance.props._parent

      if ( elementParent ) {
        const children = flattenArray(elementParent.props.children)
        const elementType = getChildType(element._owner._currentElement)
        const length = children.length

        let typeCount = 0
        let typeIndex

        for ( let ix = 0; ix < length; ++ix ) {
          if ( getChildType(children[ix]) === elementType ) {
            ++typeCount

            if ( children[ix].key === elementKey ) {
              typeIndex = typeCount
            }
          }
        }

        if ( typeIndex ) {
          const expression = getNthExpression(key)

          if ( evalNthExpression(expression, typeCount + 1 - typeIndex) ) {
            return styles
          }
        }
      }
    }
  }
}]
