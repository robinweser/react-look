import assign from 'object-assign'
import assignStyles from 'assign-styles'
import resolveStyles from './resolver'
import {getProcessors} from '../api/Config'
import React, {Component} from 'react'

/**
 * Main wrapper that maps your styles to a React Component
 * @param {Object} CustomComponent - a valid React Component that gets styles applied
 * @param {Array|Object} additionalStyles - additional styles that are used to resolve looks
 * @param {Array|Function} additionalProcessors - additional processors that modify the styles
 */
export default function Enhancer(CustomComponent, additionalStyles, additionalProcessors) {
	if (CustomComponent.prototype.setState) {
		// stateful react component
		class LookComponent extends CustomComponent {
			//Inherit the original displayName for proper use later on
			static displayName = CustomComponent.displayName || CustomComponent.name || 'Component'

			constructor() {
				super(...arguments)
				this.state = this.state ||  {}

				this._processors = prepareProcessors(this, additionalProcessors)
				this._lastActiveElements = []
				this.state._look = new Map()
			}

			render() {
				this.lookStyles = prepareStyles(this, additionalStyles)

				// Only resolve if there are styles to resolve
				// Otherwise just return super.render() which leads to no difference
				if (this.lookStyles && Object.keys(this.lookStyles).length > 0) {
					return resolveStyles(this, super.render())
				} else {
					console.warn(Component + ' was enhanced with Look, but did not provide any styles.')
					console.warn('This might affect performance and rendering time.')
					return super.render()
				}
			}
		}
		return LookComponent
	} else {
		//stateless react component
		class Stateless extends Component {
			constructor() {
				super(...arguments)
				this._processors = prepareProcessors(this, additionalProcessors)
			}
			render() {
				this.lookStyles = prepareStyles(this, assign({}, additionalStyles))
				return resolveStyles(this, CustomComponent(this.props))
			}
		}
		return Stateless
	}
}


/**
 * Resolves any styles input into a valid single style object
 * @param {Array|Object} styles - input to flatten
 */
export function flattenStyles(styles) {
	if (styles instanceof Array) {
		return assignStyles(...styles)
	} else if (styles instanceof Object) {
		return styles
	} else {
		console.warn('Pass either a valid object or an array of valid objects.')
		console.warn('Look can not flatten and will ignore the following styles input:', styles)
		return false
	}
}

/**
 * Prepares Component styles and additional styles for later use as a single style object
 * @param {Object} Component - Component providing styles
 * @param {Object|Array} additionalStyles - any additional styles provided by outer wrapper
 */
export function prepareStyles(Component, additionalStyles) {
	let styles
	if (Component.styles) {
		styles = assignStyles({}, Component.styles instanceof Function ? Component.styles.call(Component) : Component.styles)
		styles = resolveDefault(flattenStyles(styles))
	}

	if (additionalStyles) {
		styles = assignStyles({}, styles, resolveDefault(assign({}, additionalStyles)))
	}
	return styles
}

/**
 * In order to provide as less boilerplate as possible Look provides
 * a shortcut to use a default selector if only passing a single style object
 * @param {Object} styles - style object which perhaps is a default style
 */
export function resolveDefault(styles) {
	if (styles && styles[Object.keys(styles)[0]] instanceof Object !== true) {
		styles = {
			'_default': styles
		}
	}
	return styles
}

/**
 * Prepares processors and adds them to one unified array
 * @param {Object} Component - Component providing processors
 * @param {Object|Array} additionalProcessors - any additional processors provided by outer wrapper
 */
export function prepareProcessors(Component, additionalProcessors) {
	let newProcessors = getProcessors().slice(0)

	if (Component.processors) {
		if (Component.processors instanceof Function) {
			Component.processors = Component.processors()
		}
		//arrayify processors
		if (Component.processors instanceof Array !== true) {
			Component.processors = [Component.processors]
		}
		newProcessors.push(...Component.processors)
	}

	//add additional processors
	if (additionalProcessors) {
		if (additionalProcessors instanceof Array) {
			newProcessors.push(...additionalProcessors)
		} else if (additionalProcessors instanceof Object) {
			newProcessors.push(additionalProcessors)
		}
	}

	return newProcessors
}