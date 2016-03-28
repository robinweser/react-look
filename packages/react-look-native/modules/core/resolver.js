import { cloneElement } from 'react-native'
import _ from 'lodash'

import { resolver } from 'react-look-core'
const { resolvePlugins, resolveChildren, resolveProps, isLookEnhanced } = resolver
import StyleContainer from '../api/StyleContainer'

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
    if (isLookEnhanced(element)) {
      return element
    }

    const newProps = { ...element.props }
    resolveProps(Component, newProps, config)
    resolveChildren(Component, newProps, config)


    // The react-native package recieves all styles as style
    // They're just plain objects and might contain nested extensions
    // Resolving those should lead to a flat style object
    if (newProps.style) {

      // Resolve plugins if there are dynamic styles to resolve
      // and plugins are provided via config
      if (newProps.style._selector && config.plugins) {

        // static arguments that get passed to every plugin
        const staticPluginArguments = {
          resolve: resolvePlugins,
          Component,
          newProps,
          element,
          config
        }

        let newStyles = { }

        newProps.style._selector.forEach(selector => {
          const staticStyles = StyleContainer.get(selector)
          const dynamicStyles = StyleContainer._getDynamic(selector)

          // Constructs the pluginInterface
          const pluginInterface = {
            ...staticPluginArguments,
            styles: _.merge({ }, dynamicStyles)
          }
          _.merge(newStyles, staticStyles, resolvePlugins(pluginInterface))
        })

        // shallow check the new styles
        // we only need to actually update if the styles changed
        if (!_.isEmpty(newStyles)) {
          newProps.style = newStyles
          newProps._lookShouldUpdate = true
        }
      }
    }

    // Only actually clone if it is needed
    // If there are styles, children got resolved or props got resolved
    if (newProps.children !== element.props.children || newProps._lookShouldUpdate) {
      return cloneElement(element, newProps)
    }
  }

  return element
}
