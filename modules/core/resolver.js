import { cloneElement, isValidElement, Children } from 'react'
import StyleContainer from './container'
import flattenArray from '../utils/flattenArray'
import assignStyles from 'assign-styles'


export function resolvePlugins(styles, scopeArgs, config) {
  // Triggers plugin resolving
  // Uses the exact plugin lineup defined within Config
  if (config.plugins && config.plugins instanceof Array) {
    config.plugins.forEach(plugin => styles = plugin(styles, scopeArgs, config))
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
 */
export default function resolveStyles(Component, element, config) {
  if (element && element.props) {
    // early return if element itself is a Look component
    // it will be resolved anyways
    if (element.type && element.type._isLookEnhanced) {
      return element
    }

    let newProps = { ...element.props }
    Object.keys(newProps).forEach(property => {
      if (property === 'children') {
        return
      }

      // Resolving styles for elements passed by props
      // Skip children as they've been resolved already
      const propElement = newProps[property]
      if (isValidElement(propElement)) {
        newProps[property] = resolveStyles(Component, propElement, config)
        newProps.hasResolvedProps = true
      }
    })

    if (newProps.children) {
      // resolving child styles recursively to make sure they will be rendered correctly
      newProps.children = resolveChildren(Component, newProps.children, config) // eslint-disable-line
    }


    if (newProps.className) {

      // scopeArgs are provided to plugins to access special objects
      const scopeArgs = {
        newProps,
        Component,
        element,
        StyleContainer
      }

      let newStyles = {}

      newProps.className.split(' ').forEach(className => {
        let dynamicStyles = assignStyles({}, StyleContainer.dynamics.get(className))

        if (dynamicStyles) {
          assignStyles(newStyles, resolvePlugins(dynamicStyles, scopeArgs, config))
        }
      })

      // Only apply styles if there are some
      if (Object.keys(newStyles).length > 0) {
        newProps.style = newStyles
      }

      // If element already got inlined styles just merge them
      if (element.props.style) {
        newProps.style = assignStyles(newProps.style, element.props.style)
      }
    }

    // Only actually clone if it is needed
    // If there are styles, children got resolved or props got resolved
    if (newProps.style || newProps.children !== element.props.children || newProps.hasResolvedProps) {
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
 */
function resolveChildren(Component, children, config) {
  const childType = typeof children

  // directly return primitive children
  if (childType === 'string' || childType === 'number') {
    return children
  }
  if (children.type) {
    return resolveStyles(Component, children, config)
  }

  // if there are more than one child, iterate over them
  if (children instanceof Array) {
    // flattening children prevents deeper nested children
    const flatChildren = flattenArray(children)

    // recursively resolve styles for child elements if it is a valid React Component
    return Children.map(flatChildren, child => {
      if (isValidElement(child)) {
        return resolveStyles(Component, child, config)
      }
      return child
    })
  }
}
