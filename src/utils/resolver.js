import cloneObject from './cloner';
import * as Validator from './validator';
import React from 'react';
import assign from 'assign-styles';
import evaluateExpression from './evaluator';
import State from '../map/state';
import pseudoMap from '../map/pseudo';
import addRequiredEventListeners from './listener';

/**
 * Resolves styling for an element and returns the modified one.
 * @param {LookComponent} container - the outer React Component to determine state and props
 * @param {Object} element - current element that gets modified
 * @param {object} selectors - all selectors with styles, conditions and extra css classNames
 * @param {Object} childProps - information on child-indexes for index-sensitive pseudo-classes
 */
export default function resolveLook(container, element, selectors, childProps) {
	if (element && element.props) {
		let props = element.props;

		let children = [];

		//If there are more than one child, iterate over them
		if (props.children) {
			if (props.children instanceof Array) {

				let typeMap = generateTypeMap(props.children);
				let indexMap = {};
				/**
				 * Recursively resolve look for child elements first
				 * Generate index-maps to resolve child-index-sensitive pseudo-classes
				 */
				props.children.forEach((child, index) => {

					//only resolve child if it actually is a valid react element
					if (child) {

						//Provides information on child (type-sensitive) child indexes to resolve index-sensitive pseudo-classes
						generateIndexMap(child, indexMap);

						let type = getChildType(child);

						let childProps = {
							'index': index + 1,
							'length': props.children.length,
							'typeIndex': indexMap[type],
							'typeIndexLength': typeMap[type]
						}
						children.push(resolveLook(container, child, selectors, childProps));

					} else {
						/**
						 * This clears undefined childs as they would fail to render
						 * e.g. if you're trying to map {this.props.title} but it is not defined
						 * It also fires a warning so that you may remove them on your own
						 */
						if (child === undefined) {
							console.warn('There are children which are either undefined, empty or invalid React Elements: ', props.children);
							console.warn('Look removed 1 child while validating (look="' + props.look + '"): child ', child);
						} else {
							children.push(child);
						}
					}
				});
			} else {
				children = resolveLook(container, props.children, selectors);
			}
		}

		let newProps = ({}, props);
		let newStyle = {};

		//TODO: add multiple look support, see #14
		if (props.hasOwnProperty('look')) {
			let looks = props.look.split(' ');
			let key = element.key || element.ref || 'root';
			/**
			 * Splits look to resolve multiple looks
			 * Adds required event listeners and resolves all styles
			 * addEventListener might be improved since this one might add double listeners of multiple looks require one
			 */
			looks.forEach(look => {
				if (container._pseudoMap.has(look)) {
					if (!State.has(container, key)) {
						State.add(container, key);
					} else {
						if (key === 'root') {
							console.warn('You already got a root element. Please use a specific key or ref in order to achieve :hover, :active, :focus to work properly.');
						}
					}
				}

				if (selectors.hasOwnProperty(look)) {
					let styles = cloneObject(selectors[look]);

					addRequiredEventListeners(container, element, look, key, newProps);

					let resolvedStyle = resolveStyle(styles, newProps, container, element, key, childProps);
					newStyle = assign(newStyle, resolvedStyle);
				}
			})
			delete props.look;
		}

		/**
		 *If there already are styles in props they get assigned
		 *NOTE: newStyles get overwritten since attached ones have higher prio
		 */
		if (props.style) {
			newStyle = assign(newStyle, props.style);
		}
		newProps.style = newStyle;
		return React.cloneElement(element, newProps, children);
	} else {
		return element;
	}
}

/**
 * Interates every condition and valuates the expressions
 * Also applies additional classNames if specified (This helps if you're using extern CSS-libraries)
 * This returns the final styles object
 * @param {Object} styles - object that stores all style information, style, advanced and css
 * @param {Object} newProps- props that get the new styles added 
 * @param {LookComponent} container - the outer React Component that wraps all elements
 * @param {Object} element - current element
 * @param {string} key - current element's unique key (default is 'root')
 * @param {Object} childProps - map with information on index/type of the current element
 */
function resolveStyle(styles, newProps, container, element, key, childProps) {
	let newStyle = styles.style;
	let state = container.state;

	if (styles.css) {
		resolveClassName(styles.css, newProps);
	}

	if (styles.advanced) {
		let expr;
		for (expr in styles.advanced) {
			if (evaluateExpression(expr, container, element, key, childProps)) {
				let resolvedStyle = resolveStyle(styles.advanced[expr], newProps, container, element, key, childProps);
				newStyle = assign(newStyle, resolvedStyle);
			}
		}
	}
	return newStyle;
}

/**
 * Adds additional CSS classes to the className list
 * @param {string} css - a string containing (a) valid className(s)
 */
function resolveClassName(css, newProps) {
	if (!newProps.className) {
		newProps.className = css;
	} else {
		newProps.className += ' ' + css
	}
}

/**
 * Generates a index map with information on type/index of each child
 * This is needed to validate type-specific index-sensitive pseudo-classes
 * e.g. :last-type-of
 * @param {Array} children - an array of children
 * @pararam {Object} indexMap - an object which stores the information
 */
function generateIndexMap(child, indexMap) {

	// use component displayName if child is a function (ES6 component)
	let type = getChildType(child);

	if (indexMap.hasOwnProperty(type)) {
		++indexMap[type];
	} else {
		indexMap[type] = 1;
	}

	return indexMap;
}

/**
 * Iterate through all children and create a map with type/index information
 * @param {Array} children - an array of children
 */
function generateTypeMap(children) {
	let indexMap = {};
	children.forEach((child, index) => {
		generateIndexMap(child, indexMap);
	});
	return indexMap;
}


/**
 * Returns a childs type
 * If child is an ES6 class it returns the displayName
 * @param {Object} child - child which type gets identified
 */
function getChildType(child) {
	let type;
	if (child.type instanceof Function) {
		type = (child.type.hasOwnProperty('name') ? child.type.name : child.type);
	} else {
		type = child.type;
	}
	return type;
}