import { cloneElement } from 'react'
import { resolvePlugins, resolveChildren, resolveProps, isLookEnhanced } from '../resolver'
import extractCSS from '../../mixins/dom/extractCSS'
import renderStaticStyles from './renderer'
import StyleContainer from '../../api/dom/StyleContainer'
import assignStyles from 'assign-styles'
import _ from 'lodash'


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

    // The react-dom package recieves all styles as classNames
    // They come prerendered by StyleSheet.create and reference all dynamic StyleSheet
    // Those will be iterated and additionally added if conditions are fulfilled
    if (newProps.className) {

      // static arguments that get passed to every plugin
      const staticPluginArguments = {
        resolve: resolvePlugins,
        StyleContainer,
        Component,
        newProps,
        element,
        config
      }

      newProps.className.split(' ').forEach(className => {
        const dynamicStyles = StyleContainer.dynamics.get(className)
        // Resolve plugins if there are dynamic styles to resolve
        // and plugins are provided via config
        if (dynamicStyles && config.plugins) {
          // Constructs the pluginInterface
          const pluginInterface = {
            ...staticPluginArguments,
            styles: assignStyles({ }, dynamicStyles)
          }
          const newStyles = resolvePlugins(pluginInterface)

          // Only apply styles if there are some
          if (!_.isEmpty(newStyles)) {
            const dynamicClassName = renderStaticStyles(newStyles, className + '-dynamic-')
            extractCSS({ value: dynamicClassName, newProps })
            newProps._lookShouldUpdate = true
          }
        }
      })
    }

    // Only actually clone if it is needed
    // If there are styles, children got resolved or props got resolved
    if (newProps.children !== element.props.children || newProps._lookShouldUpdate) {
      return cloneElement(element, newProps)
    }
  }

  return element
}
