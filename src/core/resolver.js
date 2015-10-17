import assign                           from 'object-assign'
import assignStyles                     from 'assign-styles'
import Config                           from '../api/Config'
import flattenArray                     from '../utils/flattenArray'
import processStyles                    from './processor'
import { cloneElement, isValidElement } from 'react'

/**
 * Resolves provided styles for an elements children
 * @param {Object} Component - wrapping React Component providing looks and elements
 * @param {Array|string|number} children - children that get resolved
 * @param {Object} parent - referencing element's parent
 */
export function resolveChildren( Component, children, parent ) {
  if ( children ) {
    // If there are more than one child, iterate over them
    if ( children instanceof Array ) {
      const newChildren = []

      // Recursively resolve styles for child elements first
      // Generate index-maps to resolve child-index-sensitive pseudo classes
      children.forEach(child => {
        // only resolve child if it actually is a valid react element
        if ( isValidElement(child) ) {
          newChildren.push(resolveStyles(Component, child, parent)) // eslint-disable-line no-use-before-define
        } else {
          // This clears undefined childs as they would falsely render
          // e.g. if you're trying to map {this.props.title} but it is not defined
          // It also fires a warning so that you may remove them on your own
          if ( child === undefined ) {
            console.warn('There are children which are either undefined, empty or invalid React Elements: ', children)
            // TODO: below was props.look and props isn't defined, I think child.props was meant here
            console.warn('Look removed 1 child while validating (styles="' + child.props.look + '"): child ', child)
          } else {
            newChildren.push(child)
          }
        }
      })

      return newChildren
    }

    return resolveStyles(Component, children, parent) // eslint-disable-line no-use-before-define
  }

  return children === 0 ? children : false
}

/**
 * Extracts referenced styles to an elements props
 * @param {Object} props - elements props that will be assigned
 * @param {Object} styles - a valid style object
 */
export function extractStyles( props, styles ) {
  if ( props.hasOwnProperty('look') ) {
    // Resolve look shortcut _default and map referenced styles
    if ( props.look === true ) {
      return styles._default
    }

    let extracted = {}
    // Splits look to resolve multiple looks
    // Reverse to loop backwards in order to resolve with priority
    const lookList = props.look.split(' ').reverse()

    lookList.forEach(look => {
      // Reduce if look is existing otherwise throw a warning
      if (styles.hasOwnProperty(look)) {
        extracted = assignStyles({}, styles[look], extracted)
      } else {
        console.warn('Assigned look does not exist and will be ignored.')
        console.warn('Provided styles: ' + JSON.stringify(styles) + ' do not include ' + look)

        return false
      }
    })

    return extracted
  }

  return false
}

/**
 * Resolves provided styles into style objects
 * Processes those using a predefined processor lineup
 * Maps the final style objects to the element
 * @param {Object} Component - wrapping React Component providing styles and elements
 * @param {Object} element - previously rendered React element
 * @param {Object} parent - referencing element's parent
 */
export default function resolveStyles( Component, element, parent ) {
  if ( element && element.props && (element.props.look || element.props.children) ) {
    const props = element.props

    // resolving child looks recursively to make sure they will be rendered correctly
    const newProps = assign({}, props)
    newProps.children = resolveChildren(Component, flattenArray(props.children), element)

    // Extracts only relevant styles according to the look prop
    let styles = extractStyles(props, Component.lookStyles)

    if ( styles ) {
      // Triggers style processing
      // Uses the exact processor lineup defined within Config
      const processArgs = { newProps, Component, element, Config, parent }

      styles = processStyles(styles, Component._processors, processArgs)

      if ( props.style ) {
        styles = assignStyles(styles, props.style)
      }

      newProps.style = styles
    }

    // Resolving styles for elements passed by props
    let prop

    for ( prop in newProps ) {
      if ( prop === 'children' ) {
        continue
      }

      if ( isValidElement(newProps[prop]) ) {
        newProps[prop] = resolveStyles(Component, newProps[prop])
      }
    }

    if ( !newProps.children ) {
      delete newProps.children
    }

    // Passing the current parent element via props
    // This is especially useful for mixins e.g. :first-child
    if ( parent ) {
      newProps._parent = parent
    }

    return cloneElement(element, newProps)
  }

  return element
}
