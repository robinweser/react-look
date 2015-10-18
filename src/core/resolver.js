import assign from 'object-assign'
import { cloneElement, isValidElement, Children } from 'react'
import assignStyles from 'assign-styles'

/**
 * Resolves provided styles into style objects
 * Processes those using a predefined processor lineup
 * Maps the final style objects to the element
 * @param {Object} Component - wrapping React Component providing styles and elements
 * @param {Object} element - previously rendered React element
 * @param {Object} parent - referencing element's parent
 */
export default function resolveStyles(Component, element, config, parent) {
  if (element && element.props && (element.props.look || element.props.children)) {
    let props = element.props

    // resolving child looks recursively to make sure they will be rendered correctly
    let newProps = assign({}, props)

    if (props.children) {
      newProps.children = resolveChildren(Component, props.children, config, element)
    }

    if (props.look) {
      if (props.look instanceof Array) {
        newProps.look = assignStyles({}, ...props.look)
      }

      let styles = assign({}, newProps.look.style)
      if (newProps.look._scope) {
        if (Component._lookScope === newProps.look._scope) {

          // Triggers plugin resolving
          // Uses the exact plugin lineup defined within Config
          if (config.plugins) {
            let scopeArgs = {newProps, Component, element, parent}
            styles = resolvePlugins(styles, config, scopeArgs)
          }

          // If element already got some style just merge them
          // NOTE: This might overwrite the look assigned
          if (props.style) {
            styles.style = assignStyles(styles, props.style)
          }
          newProps.style = styles
        }
      } else {
        console.warn(Component._lookScope + ' got enhanced by Look using invalid styles. Please always use Look.createStyleSheet.')
      }
    }

    // Resolving styles for elements passed by props
    Object.keys(newProps).forEach(prop => {
      if (prop === 'children') {
        return
      }
      if (isValidElement(newProps[prop])) {
        newProps[prop] = resolveStyles(Component, newProps[prop], config)
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
const resolveChildren = (Component, children, config, parent) => {
  let childType = typeof children
  // Directly return primitive children
  if (childType === 'string' || childType === 'number') {
    return children
  }
  // If there are more than one child, iterate over them
  if (children instanceof Array) {
    if (Children.count(children) === 1) {
      return resolveStyles(Component, Children.only(children), config, parent)
    }

    children = flattenArray(children)
    // Recursively resolve styles for child elements
    // This also flattens all the childs and adds keys
    return Children.map(children, (child) => {
      if (isValidElement(child)) {
        return resolveStyles(Component, child, config, parent)
      }
      return child
    })
  } else {
    if (children.type) {
      return resolveStyles(Component, children, config, parent)
    }
    return children
  }
}

  /**
  * Processes styles using a predefined set of plugins
  * @param {Object} styles - any style object that gets processed
  * @param {Object} config - a map of arguments that might be passed to the plugin
  */
const resolvePlugins = (styles, config, scopeArgs) => {
  config.plugins.forEach(plugin => {
    styles = plugin(styles, config, scopeArgs)
  })
  return styles
}

/**
 * Flattens an array of nested arrays to the same level
 * @param {Array} array - array that gets flatten
 */
const flattenArray = (array) => {
  // return if input is not an array
  if ( array instanceof Array !== true ) {
    return array
  }

  let flat = []

  array.forEach(child => {
    let catChild = child

    if ( child instanceof Array ) {
      catChild = flattenArray(child)
    }

    flat = flat.concat(catChild)
  })

  return flat
}