import resolveStyles from './resolver'
import { StyleComponent } from './container'
import copyProperties from '../utils/copyProperties'
import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

const contextType = { _lookConfig: PropTypes.object }
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
    static displayName = CustomComponent.displayName || CustomComponent.name || 'Component';
    static childContextTypes = { ...CustomComponent.childContextTypes, ...contextType };
    static contextTypes = { ...CustomComponent.contextTypes, ...contextType };
    static _isLookEnhanced = true;

    getChildContext() {
      let newContext = super.getChildContext ? super.getChildContext() : {}

      // Passes down a lookConfig to its children
      if (this.props.lookConfig) {
        newContext = _.merge(newContext, {
          _lookConfig: this.props.lookConfig
        })
      }

      return newContext
    }

    render() {
      const contextConfig = this.context ? this.context._lookConfig : null
      const propsConfig = this.props ? this.props.lookConfig : null

      const renderedElement = stateless ? CustomComponent(this.props, this.context) : super.render() // eslint-disable-line

      // Compose all possible ways to configure Look
      const elementConfig = renderedElement && renderedElement.props ? renderedElement.props.lookConfig : null
      const composedConfig = _.merge({}, contextConfig, propsConfig, elementConfig, config)

      const content = resolveStyles(this, renderedElement, composedConfig)

      // This mechanism was heavily inspired by Radium which passes
      // a Style Catcher down the context to add CSS styles
      // and renders those in a <style> after the main content
      if (composedConfig.lookRoot) {
        return (
          <div>
            {content}
            <StyleComponent userAgent={composedConfig.userAgent} />
          </div>
        )
      }

      return content
    }
  }

  // copy props in order to get hmr working correctly
  if (process.env.NODE_ENV !== 'production') {
    copyProperties(CustomComponent.prototype, LookComponent.prototype)
  }

  return LookComponent
}
