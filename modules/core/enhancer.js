import resolveStyles from './resolver'
import CSSStyleSheet from '../components/CSSStyleSheet'
import React, { Component, PropTypes } from 'react'
import assignDeep from 'object-assign-deep'
/**
 * Main wrapper that maps your styles to a React Component
 * @param {Object} CustomComponent - a valid React Component that gets styles applied
 * @param {Object} config - additional processors that modify the styles
 */
export default (CustomComponent, config = {}) => {
  // Detecting stateless components
  // Sets the base Component which should be extended
  const stateless = !CustomComponent.prototype.setState
  const Extend = stateless ? Component : CustomComponent


  class LookComponent extends Extend {
    // Inherit the original displayName for proper use later on
    static displayName = CustomComponent.displayName || CustomComponent.name || 'Component'
    static childContextTypes = {_lookConfig: PropTypes.object}
    static contextTypes = {_lookConfig: PropTypes.object}

    constructor() {
      super(...arguments)
      this.state = this.state || {}

      // Adds a scopeId to identify refering StyleSheets
      this._lookScope = config.styleScope || CustomComponent.displayName || CustomComponent.name
      this.state._look = new Map()
    }

    getChildContext() {
      let newContext = super.getChildContext ? super.getChildContext() : {}

      // Passes down a lookConfig to its children
      if (this.props.lookConfig) {
        newContext = assignDeep(newContext, {
          _lookConfig: this.props.lookConfig
        })
      }

      return newContext
    }

    render() {
      const contextConfig = this.context ? this.context._lookConfig : {}
      const propsConfig = this.props ? this.props.lookConfig : {}

      const renderedElement = stateless ? CustomComponent(this.props, this.context) : super.render() // eslint-disable-line

      // Compose all possible ways to configure Look
      const elementConfig = renderedElement && renderedElement.props ? renderedElement.props.lookConfig : {}
      const composedConfig = assignDeep({}, contextConfig, propsConfig, elementConfig, config)

      const content = resolveStyles(this, renderedElement, composedConfig)

      // This mechanism was heavily inspired by Radium which passes
      // a Style Catcher down the context to add CSS styles
      // and renders those in a <style> after the main content
      if (composedConfig.lookRoot) {
        return (
          <div>
            {content}
            <CSSStyleSheet userAgent={composedConfig.userAgent} />
          </div>
          )
      }

      return content
    }
  }

  return LookComponent
}
