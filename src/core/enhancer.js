import resolveStyles from './resolver'
import { Component } from 'react'

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

    constructor() {
      super(...arguments)

      this.state = this.state || {}

      // Adds a scopeId to identify refering StyleSheets
			this._lookScope = CustomComponent.displayName || CustomComponent.name
      this.state._look = new Map()
    }


    render() {
      const renderedElement = stateless ? CustomComponent(this.props) : super.render() // eslint-disable-line

      return resolveStyles(this, renderedElement, config)
    }
  }

  return LookComponent
}
