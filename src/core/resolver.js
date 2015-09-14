import assign from 'object-assign'
import {cloneElement, isValidElement} from 'react'
import assignStyles from 'assign-styles'
import processStyles from './processor'

/**
 * Resolves provided looks into style objects
 * Processes those using a predefined processor lineup
 * Maps the final style objects to the element
 * @param {Object} Component - wrapping React Component providing looks and elements
 * @param {Object} element - previously rendered React element
 * @param {Object} childIndexMap - information on child index and child types
 */
export default function resolveLook(Component, element, childIndexMap) {
	if (element && element.props) {
		let props = element.props

		//resolving child looks recursively to make sure they will be rendered correctly
		let newProps = assign({}, props)
		newProps.children = resolveChildren(Component, props.children)

		console.log(Component)
		//Extracts only relevant styles according to the look prop
		let styles = extractStyles(props, Component.styles)

		if (styles) {
			//Triggers style processing
			//Uses the exact processor lineup defined within Config
			let processArgs = {
				newProps, Component, element, childIndexMap
			}
			styles = processStyles(styles, Component._processors, processArgs)
			if (props.style) {
				styles = assignStyles(styles, props.style)
			}

			newProps.style = styles
		}

		//Resolving styles for elements passed by props
		let prop
		for (prop in newProps) {
			if (prop === 'children') {
				continue
			}
			if (isValidElement(newProps[prop])){
				newProps[prop] = resolveLook(Component, newProps[prop])
			}
		}

		return cloneElement(element, newProps, newProps.children)
	} else {
		return element
	}
}

/**
 * Resolves provided looks for an elements children
 * @param {Object} Component - wrapping React Component providing looks and elements
 * @param {Array|string|number} children - children that get resolved
 */
export function resolveChildren(Component, children) {
	if (children) {
		//If there are more than one child, iterate over them
		if (children instanceof Array) {
			let newChildren = []

			let typeMap = generateTypeMap(children)
			let indexMap = {}
			let childType, childIndex

			//Recursively resolve look for child elements first
			//Generate index-maps to resolve child-index-sensitive pseudo classes
			children.forEach((child, index) => {

				//only resolve child if it actually is a valid react element
				if (isValidElement(child)) {

					//Provides information on child (type-sensitive) child indexes to resolve index-sensitive pseudo-classes
					indexMap = generateIndexMap(child, indexMap)

					childType = getChildType(child)
					childIndex = {
						'index': index + 1,
						'length': children.length,
						'typeIndex': indexMap[childType],
						'typeLength': typeMap[childType]
					}
					newChildren.push(resolveLook(Component, child, childIndex))

				} else {
					//This clears undefined childs as they would falsely render
					//e.g. if you're trying to map {this.props.title} but it is not defined
					//It also fires a warning so that you may remove them on your own
					if (child === undefined) {
						console.warn('There are children which are either undefined, empty or invalid React Elements: ', children)
						console.warn('Look removed 1 child while validating (look="' + props.look + '"): child ', child)
					} else {
						newChildren.push(child);
					}
				}
			})
			return newChildren
		} else {
			return resolveLook(Component, children)
		}
	} else {
		return children === 0 ? children : false
	}
}

/**
 * Extracts referenced styles to an elements props
 * @param {Object} props - elements props that will be assigned
 * @param {Object} styles - a valid style object
 */
export function extractStyles(props, styles) {
	if (props.hasOwnProperty('look')) {

		//Resolve look shortcut _default and map referenced styles
		if (props.look === true) {
			return styles._default
		} else {
			let extracted = {}
				//Splits look to resolve multiple looks
				//Reverse to loop backwards in order to resolve with priority
			let lookList = props.look.split(' ').reverse()
			lookList.forEach(look => {
				//Reduce if look is existing otherwise throw a warning
				if (styles.hasOwnProperty(look)) {
					extracted = assignStyles({}, styles[look], extracted)
				} else {
					console.warn('Assigned look does not exist and will be ignored.')
					console.warn('Provided styles: ' + JSON.stringify(styles) + ' do not include ' + look)
					return false
				}
			})
			return extracted
		}
		delete props.look
	} else {
		return false
	}
}

/**
 * Generates a index map with information on type/index of each child
 * This is needed to validate type-specific index-sensitive pseudo-classes
 * e.g. :last-type-of
 * @param {Array} children - an array of children
 * @pararam {Object} indexMap - an object which stores the information
 */
export function generateIndexMap(child, indexMap) {

	// use component displayName if child is a function (ES6 component)
	let childType = getChildType(child)

	if (indexMap.hasOwnProperty(childType)) {
		++indexMap[childType]
	} else {
		indexMap[childType] = 1;
	}
	return indexMap
}

/**
 * Iterate through all children and create a map with type/index information
 * @param {Array} children - an array of children
 */
export function generateTypeMap(children) {
	let indexMap = {}
	children.forEach((child, index) => {
		generateIndexMap(child, indexMap)
	})
	return indexMap
}

/**
 * Returns a childs type
 * If child is an ES6 class it returns the displayName
 * @param {Object} child - child which type gets identified
 */
export function getChildType(child) {
	let childType
	if (child.type instanceof Function) {
		childType = (child.type.hasOwnProperty('name') ? child.type.name : child.type)
	} else {
		childType = child.type
	}
	return childType
}
