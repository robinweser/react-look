import assign from 'object-assign'
import assignStyles from 'assign-styles'
import resolveStyles from './resolver'
import { getProcessors } from '../api/Config'
import React, { Component } from 'react'

/**
 * Main wrapper that maps your styles to a React Component
 * @param {Object} CustomComponent - a valid React Component that gets styles applied
 * @param {Array|Function} additionalProcessors - additional processors that modify the styles
 */
export default (CustomComponent, additionalProcessors) => {
	let stateless = !CustomComponent.prototype.setState
	let Extend = stateless ? Component : CustomComponent
	
		// stateful react component
	class LookComponent extends Extend {
		//Inherit the original displayName for proper use later on
		static displayName = CustomComponent.displayName || CustomComponent.name || 'Component'

		constructor() {
			super(...arguments)
			this.state = this.state ||  {}
			this._processors = getProcessors().slice(0)
			this._lookScopeId = CustomComponent._lookScopeId
			this.state._look = new Map()
		}

		render() {
			let renderedElement = stateless ? CustomComponent(this.props) : super.render()
			return resolveStyles(this, renderedElement)
		}
	}
	return LookComponent
}