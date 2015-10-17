import resolveStyles from './resolver'
import React, { Component } from 'react'

/**
 * Main wrapper that maps your styles to a React Component
 * @param {Object} CustomComponent - a valid React Component that gets styles applied
 * @param {Object} config - additional processors that modify the styles
 */
export default (CustomComponent, config = {}) => {
	let stateless = !CustomComponent.prototype.setState
	let Extend = stateless ? Component : CustomComponent
	
	class LookComponent extends Extend {
		//Inherit the original displayName for proper use later on
		static displayName = CustomComponent.displayName || CustomComponent.name || 'Component'

		constructor() {
			super(...arguments)
			this.state = this.state ||  {}
			
			//Adds a scopeId to identify refering StyleSheets
			this._lookScope = CustomComponent.displayName || CustomComponent.name
			this.state._look = new Map()
		}

		render() {
			let renderedElement = stateless ? CustomComponent(this.props) : super.render()
			return resolveStyles(this, renderedElement, config)
		}
	}
	return LookComponent
}