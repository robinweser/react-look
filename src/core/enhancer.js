import assign from 'object-assign'
import assignStyles from 'assign-styles'
import resolveLook from './resolver'

export default function Look(Component, additionalStyles) {
	class EnhancedComponent extends Component {
		constructor() {
			super(...arguments)
			this.state = this.state ||  {}

			this._lastActiveElements = []
			this.state._look = new Map()
		}

		render() {
			this.styles = prepareStyles(this, additionalstyles)

			// Only resolve if there are styles to resolve
			// Otherwise just return super.render() which leads to no difference
			if (this.styles && Object.keys(this.styles).length > 0) {
				return resolveLook(this, super.render())
			} else {
				console.warn(Component + ' was enhanced with Look, but did not provide any styles.')
				console.warn('This might affect performance and rendering time.')
				return super.render()
			}
		}
	}

	//Inherit the original displayName for proper use later on
	EnhancedComponent.displayName = Component.displayName || Component.name || 'Component'
	return EnhancedComponent
}


/**
 * Resolves any styles input into a valid single style object
 * @param {Array|Object} styles - input to flatten
 */
export function flattenStyles(styles) {
	if (styles instanceof Array) {
		return assignStyles(...styles);
	} else if (styles instanceof Function) {
		return flattenStyles(styles())
	} else if (styles instanceof Object) {
		return styles
	} else {
		console.warn('Pass either a valid object or an array of valid objects.')
		console.warn('Look can not flatten and will ignore the following styles input ', styles)
		return {}
	}
}

/**
 * Prepares Component styles and additional styles for later use as a single style object
 * @param {Object} Component - Component providing styles
 * @param {Object|Array} additionalStyles - any additional styles provided by outer wrapper
 */
export function prepareStyles(Component, additionalStyles) {
	let styles = flattenStyles(additionalStyles ? additionalStyles : {})

	if (Component.look) {
		styles = assignStyles(flattenStyles(Component.look), styles)
		delete Component.look
	}

	//In order to provide as less boilerplate as possible Look provides
	//a shortcut to use a default selector if only passing a single style object
	if (styles[Object.keys(styles)[0]] instanceof Object !== true) {
		styles = {
			'_default': styles
		}
	}
	return styles;
}