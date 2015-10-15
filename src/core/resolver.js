import assign from 'object-assign'
import { cloneElement, isValidElement, Children } from 'react'
import assignStyles from 'assign-styles'
import processStyles from './processor'
import Config from '../api/Config'
/**
 * Resolves provided styles into style objects
 * Processes those using a predefined processor lineup
 * Maps the final style objects to the element
 * @param {Object} Component - wrapping React Component providing styles and elements
 * @param {Object} element - previously rendered React element
 * @param {Object} parent - referencing element's parent
 */
export default function resolveStyles(Component, element, parent) {
  if (element && element.props) {
    let props = element.props

    // resolving child looks recursively to make sure they will be rendered correctly
    let newProps = assign({}, props)

    if (props.children) {
      newProps.children = resolveChildren(Component, props.children, element)
    }

    if (props.look) {
      if (props.look instanceof Array) {
        newProps.look = assignStyles(...props.look)
      }

      if (Component._lookScopeId && newProps.look._scope && Component._lookScopeId === newProps.look._scope) {
        let processArgs = {
          newProps,
          Component,
          element,
          Config,
          parent
        }
        // Triggers style processing
        // Uses the exact processor lineup defined within Config
        let styles = processStyles(assign({}, newProps.look.style), Component._processors, processArgs)
        newProps.style = props.style ? assignStyles(styles, props.style) : styles
      }
    }

    // Resolving styles for elements passed by props
    Object.keys(newProps).forEach(prop => {
      if (prop === 'children') {
        return
      }
      if (isValidElement(newProps[prop])) {
        newProps[prop] = resolveStyles(Component, newProps[prop])
      }
    })

    // Passing the current parent element via props
    // This is especially useful for mixins e.g. :first-child
    parent && (newProps._parent = parent)

    return cloneElement(element, newProps)
  } else {
    return element
  }
}

/**
 * Resolves provided styles for an elements children
 * @param {Object} Component - wrapping React Component providing looks and elements
 * @param {Array|string|number} children - children that get resolved
 * @param {Object} parent - referencing element's parent
 */
export function resolveChildren(Component, children, parent) {
  let childType = typeof children
  // Directly return primitive children
  if (childType === 'string' || childType === 'number') {
    return children
  }
  // If there are more than one child, iterate over them
  if (children instanceof Array) {
    if (Children.count(children) === 1) {
      return resolveStyles(Component, Children.only(children), parent)
    }

    // Recursively resolve styles for child elements
    // This also flattens all the childs and adds keys
    return Children.map(children, (child) => isValidElement(child) ? resolveStyles(Component, child, parent) : child)
  } else {
    return children.type ? resolveStyles(Component, children, parent) : children
  }
}