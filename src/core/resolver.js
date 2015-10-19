import assign from 'object-assign'
import { cloneElement, isValidElement, Children } from 'react'
import assignStyles from 'assign-styles'
import flattenArray from '../utils/flattenArray'

/**
 * Resolves provided styles into style objects
 * Processes those using a predefined plugin lineup
 * Maps the final style objects to the element
 * @param {Object} Component - wrapping React Component providing styles and elements
 * @param {Object} element - previously rendered React element
 * @param {Object} config - configuration containing plugins and plugin-specific configs
 * @param {Object} parent - referencing element's parent
 */
export default function resolveStyles(Component, element, config, parent) {
	// only resolve if look or children exist
	if (element && element.props && (element.props.look ||  element.props.children)) {
    
		let props = element.props
		let newProps = assign({}, props)


		if (props.children) {
			// resolving child styles recursively to make sure they will be rendered correctly
			newProps.children = resolveChildren(Component, props.children, config, element)
		}



		if (props.look) {
			// Merge an array of styles into a single style object
			if (props.look instanceof Array) {
				newProps.look = assignStyles({}, ...props.look)
			}

			// scopeArgs are provided to plugins to access special objects
			let scopeArgs = {newProps, Component, element, parent}

			// Checks if styles are scoped
			// Scoped styles only perform style processing if in correct scope
			// NOTE: This solves multiple processing due to wrapping Components
			if (newProps.look._scope) {
				if (Component._lookScope === newProps.look._scope) {
					newProps.style = processStyles(newProps.look.style, props, scopeArgs, config)
				}
			} else {
				// If global scopes are used it processed styles everytime
				// Throws warning to use scoped styles instead
				console.warn(Component._lookScope + ' got enhanced by Look using global styles which might affect performance. Please always use scoped styles with the StyleSheet API.')
				newProps.style = processStyles(newProps.look, props, scopeArgs, config)
			}
		}


		// Resolving styles for elements passed by props
		// Skip children as they've been resolved already
		Object.keys(newProps).forEach(prop => {
			if (prop !== 'children' && isValidElement(newProps[prop])) {
				newProps[prop] = resolveStyles(Component, newProps[prop], config)
			}
		})


		// Passing the current parent element via props
		// This is especially useful for mixins e.g. :first-child
		parent && (newProps._parent = parent)

		return cloneElement(element, newProps)
	} else {
		return element
	}
}

/**
 * Resolves plugins and merges with existing style property
 * @param {Object} styles - object with styles
 * @param {Object} props - current elements props
 * @param {Object} scopeArgs - special objects including important information
 * @param {Object} config - configuration containing plugins and plugin-specific configs
 */
const processStyles = (styles, props, scopeArgs, config) => {
	let newStyles = assign({}, styles)
  
		// Triggers plugin resolving
		// Uses the exact plugin lineup defined within Config
	if (config.plugins) {
		newStyles = resolvePlugins(newStyles, scopeArgs, config)
	}

	// If element already got some style just merge them
	// NOTE: This might overwrite the look assigned
	if (props.style) {
		newStyles = assignStyles(styles, props.style)
	}
  
	return newStyles
}

/**
 * Resolves provided styles for an elements children
 * @param {Object} Component - wrapping React Component providing looks and elements
 * @param {Array|string|number} children - children that get resolved
 * @param {Object} config - configuration containing plugins and plugin-specific configs
 * @param {Object} parent - referencing element's parent
 */
const resolveChildren = (Component, children, config, parent) => {
	let childType = typeof children
  
		// directly return primitive children
	if (childType === 'string' || childType === 'number') {
		return children
	}
  
	// if there are more than one child, iterate over them
	if (children instanceof Array) {
		if (Children.count(children) === 1) {
			return resolveStyles(Component, Children.only(children), config, parent)
		}

		// flattening children prevents deeper nested children
		children = flattenArray(children)

		// recursively resolve styles for child elements if it is a valid React Component
		return Children.map(children, (child) => {
			if (isValidElement(child)) {
				return resolveStyles(Component, child, config, parent)
			}
			return child
		})
	} else {
		if (children.type) {
			return resolveStyles(Component, children, config, parent)
		}
		return children
	}
}

/**
 * Processes styles using a predefined set of plugins
 * @param {Object} styles - any style object that gets processed
 * @param {Object} scopeArgs - special objects including important information
 * @param {Object} config - a map of arguments that might be passed to the plugin
 */
const resolvePlugins = (styles, scopeArgs, config) => {
	config.plugins.forEach(plugin => {
		styles = plugin(styles, scopeArgs, config)
	})

	return styles
}