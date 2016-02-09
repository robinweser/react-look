import resolveStyles from './resolver'
import copyProperties from '../utils/copyProperties'
import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

const contextType = { _lookConfig: PropTypes.object }
/**
 * Wrapper that maps your styles to a React Component
 * @param {Object} CustomComponent - a valid React Component that gets styles applied
 * @param {Object} config - additional processors that modify the styles
 */
export default (CustomComponent, config = { }) => {
  // Detecting stateless components
  // Sets the base Component which should be extended
  const stateless = !CustomComponent.prototype.setState
  const Extend = stateless ? Component : CustomComponent


  class LookComponent extends Extend {
    // Inherit the original displayName for proper use later on
    static displayName = CustomComponent.displayName || CustomComponent.name || 'Component';
    static childContextTypes = { ... CustomComponent.childContextTypes, ... contextType };
    static contextTypes = { ... CustomComponent.contextTypes, ... contextType };
    static _isLookEnhanced = true;

    render() {
      const contextConfig = this.context ? this.context._lookConfig : null
      const renderedElement = stateless ? CustomComponent(this.props, this.context) : super.render() // eslint-disable-line

      // Compose all possible ways to configure Look
      const composedConfig = _.merge({ }, contextConfig, config)
      return resolveStyles(this, renderedElement, composedConfig)
    }
  }

  // copy props in order to get hmr working correctly
  if (process.env.NODE_ENV !== 'production') {
    copyProperties(CustomComponent.prototype, LookComponent.prototype)
  }

  return LookComponent
}
