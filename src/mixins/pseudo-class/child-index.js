import evalNthExpression from '../../utils/evalNthExpression'
import flattenArray      from '../../utils/flattenArray'
import getNthExpression  from '../../utils/splitNthExpression'
import MixinTypes        from '../../utils/MixinTypes'

const getChildIndex = ( parent, element ) => {
  let index

  if ( parent ) {
    index = flattenArray(parent.props.children).indexOf(element)
  } else {
    const elementParent = element._owner._instance.props._parent

    if ( elementParent ) {
      const ownerKey = element._owner._currentElement.key

      if ( ownerKey === null ) {
        console.warn('You need to pass a unique key in order to use child-index pseudo classes.')

        return undefined
      }

      flattenArray(elementParent.props.children).forEach(( child, ix ) => {
        if ( child.key === ownerKey ) {
          index = ix

          return
        }
      })
    }
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
  fn: ( key, styles, { parent, element } ) => {
    if ( parent ) {
      if ( flattenArray(parent.props.children)[0] === element ) {
        return styles
      }
    } else {
      const elementParent = element._owner._instance.props._parent
      const elementKey = element._owner._currentElement.key

      if ( elementParent && flattenArray(elementParent.props.children)[0].key === elementKey && elementKey !== null ) {
        return styles
      }
    }
  }
}, {
  key: ':last-child',
  type: MixinTypes.EQUAL,
  fn: ( key, styles, { parent, element } ) => {
    if ( parent ) {
      const children = flattenArray(parent.props.children)

      if ( children[children.length - 1] === element ) {
        return styles
      }
    } else {
      const elementParent = element._owner._instance.props._parent
      const elementKey = element._owner._currentElement.key

      if ( elementParent ) {
        const children = flattenArray(elementParent.props.children)

        if ( children[children.length - 1].key === elementKey && elementKey !== null ) {
          return styles
        }
      }
    }
  }
}, {
  key: ':only-child',
  type: MixinTypes.EQUAL,
  fn: ( key, styles, { parent, element } ) => {
    if ( parent && flattenArray(parent.props.children).length === 1 ) {
      return styles
    }

    const elementParent = element._owner._instance.props._parent

    if ( elementParent && flattenArray(elementParent.props.children).length === 1 ) {
      return styles
    }
  }
}, {
  key: ':nth-child',
  type: MixinTypes.BEGINWITH,
  fn: ( key, styles, { parent, element } ) => {
    const expression = getNthExpression(key)
    const childIndex = getChildIndex(parent, element)

    if ( childIndex === undefined ) {
      return false
    }

    return evalNthExpression(expression, childIndex + 1) ? styles : false
  }
}, {
  key: ':nth-last-child',
  type: MixinTypes.BEGINWITH,
  fn: ( key, styles, { parent, element } ) => {
    // TODO: Review this method as the changes worry me
    const expression = getNthExpression(key)
    const childIndex = getChildIndex(parent, element)

    if ( !childIndex === undefined ) {
      return false
    }

    if ( !parent ) {
      const elementParent = element._owner._instance.props._parent

      if ( !elementParent ) {
        return false
      }
    }

    return evalNthExpression(expression, length - childIndex) ? styles : false
  }
}]
