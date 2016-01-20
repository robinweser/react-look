import { cloneElement, isValidElement, Children } from 'react'
import GlobalStyleSheet from '../utils/GlobalStyleSheet'
import flattenArray from '../utils/flattenArray'
import assignStyles from 'assign-styles'
import warn from '../utils/warn'

/**
 * Resolves plugins and merges with existing style property
 * @param {Object} styles - object with styles
 * @param {Object} props - current elements props
 * @param {Object} scopeArgs - special objects including important information
 * @param {Object} config - configuration containing plugins and plugin-specific configs
 */
function processStyles(styles, props, scopeArgs, config) {
  // Triggers plugin resolving
  // Uses the exact plugin lineup defined within Config
  if (config.plugins && config.plugins instanceof Array) {
    config.plugins.forEach(plugin => {
      styles = plugin(styles, scopeArgs, config)
    })
  }

  // If element already got some style just merge them
  // NOTE: This might overwrite the look assigned
  if (props.style) {
    styles = assignStyles(styles, props.style)
  }

  return styles
}

/**
 * Resolves provided styles into style objects
 * Processes those using a predefined plugin lineup
 * Maps the final style objects to the element
 * @param {Object} Component - wrapping React Component providing styles and elements
 * @param {Object} element - previously rendered React element
 * @param {Object} config - configuration containing plugins and plugin-specific configs
 * @param {Object} parent - referencing element's parent
 */
export default function resolveStyles(Component, element, config, parent) {
  if (element && element.props) {
    // early return if element itself is a Look component
    // it will be resolved anyways
    if (element.type && element.type._isLookEnhanced) {
      return element
    }

    let newProps = {...element.props }
    let changeIndicator = false

    Object.keys(newProps).forEach(property => {
      if (property === 'children') {
        return
      }

      // Resolving styles for elements passed by props
      // Skip children as they've been resolved already
      const propElement = newProps[property]
      if (isValidElement(propElement)) {
        newProps[property] = resolveStyles(Component, propElement, config)
        changeIndicator = true
      }
    })

    if (newProps.children) {
      // resolving child styles recursively to make sure they will be rendered correctly
      newProps.children = resolveChildren(Component, newProps.children, config, element) // eslint-disable-line
    }


    if (newProps.look) {
      // Merge an array of styles into a single style object
      if (newProps.look instanceof Array) {
        newProps.look = assignStyles({ }, ...newProps.look)
      }

      const styles = assignStyles({ }, newProps.look)

      // scopeArgs are provided to plugins to access special objects
      const scopeArgs = {
        newProps,
        Component,
        element,
        parent,
        GlobalStyleSheet
      }

      newProps.style = processStyles(styles, newProps, scopeArgs, config)
      changeIndicator = true
    }

    if (changeIndicator || newProps.children !== element.props.children) {
      // Passing the current parent element via props
      // This is especially useful for mixins e.g. :first-child
      if (parent) {
        newProps._parent = parent
      }
      return cloneElement(element, newProps)
    }
  }

  return element
}

/**
 * Resolves provided styles for an elements children
 * @param {Object} Component - wrapping React Component providing looks and elements
 * @param {Array|string|number} children - children that get resolved
 * @param {Object} config - configuration containing plugins and plugin-specific configs
 * @param {Object} parent - referencing element's parent
 */
function resolveChildren(Component, children, config, parent) {
  const childType = typeof children

  // directly return primitive children
  if (childType === 'string' || childType === 'number') {
    return children
  }
  if (children.type) {
    return resolveStyles(Component, children, config, parent)
  }

  // if there are more than one child, iterate over them
  if (children instanceof Array) {
    // flattening children prevents deeper nested children
    const flatChildren = flattenArray(children)

    // recursively resolve styles for child elements if it is a valid React Component
    return Children.map(flatChildren, child => isValidElement(child) ? resolveStyles(Component, child, config, parent) : child)
  }
}
