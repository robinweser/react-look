import cloneObject from './cloner';
import * as Validator from './validator';
import React from 'react';
import assign from 'object-assign';
import evaluateExpression from './evaluator';
import State from '../map/state';
import pseudoMap from '../map/pseudo';
import addRequiredEventListeners from './listener';

/**
 * Resolves styling for an element and returns the modified one.
 * @param {ObsceneComponent} container - the outer React Component to determine state and props
 * @param {ReactElement} element - current element that gets modified
 * @param {object} selectors - all selectors with styles, conditions and extra css classNames
 * @param {Object} childProps - information on child-indexes for index-sensitive pseudo-classes
 */
export default function resolveLook(container, element, selectors, childProps) {
	if (element && element.props) {
		let props = element.props;

		let children = [];

		if (props.children && props.children instanceof Array) {

			let typeMap = generateTypeMap(props.children);
			/**
			 * Recursively resolve look for child elements first
			 */
			props.children.forEach((item, index) => {
				/**
				 * Provides information on child (type-sensitive) child indexes to resolve index-sensitive pseudo-classes
				 */
				let childProps = {};
				if (item.props.look) {
					childProps['length'] = props.children.length;
					childProps['index'] = index;
					childProps['typeIndex'] = typeIndex[item.type];
					childProps['typeIndexLength'] = typeMap[item.type];
				}

				if (React.isValidElement(item)) {
					children.push(resolveLook(container, item, selectors, child));
				}
			});
			children = children.reverse();
		} else {
			children = props.children;
		}

		let newProps = ({}, props);
		let newStyle = {};
		if (props.hasOwnProperty('look') && selectors.hasOwnProperty(props.look)) {
			let styles = selectors[props.look];

			let key = element.key || element.ref || 'root';

			if (!State.has(container, key)) {
				State.add(container, key);
			} else {
				console.warn('You already got a root element. Please use a specific key or ref in order to achieve :hover, :active, :focus to work properly.');
			}

			addRequiredEventListeners(container, element, key, newProps);
			newStyle = resolveStyle(cloneObject(styles), newProps, container, element, key, childProps)
			delete props.look;
		}

		if (props.style) {
			newStyle = assign(newStyle, props.style);
		}
		newProps.style = newStyle;

		let newEl = React.cloneElement(element, newProps, children);
		return newEl;

	} else {
		return element;
	}
}

/**
 * Interates every condition and valuates the expressions
 * Also applies additional classNames if specified (This helps if you're using extern CSS-libraries)
 * This returns the final styles object
 */
function resolveStyle(styles, newProps, container, element, key, childProps) {
	let newStyle = styles.style;
	let state = container.state;

	if (styles.css) {
		if (!newProps.className) {
			newProps.className = styles.css;
		} else {
			newProps.className += ' ' + styles.css
		}
	}

	if (styles.condition) {
		let expr;
		for (expr in styles.condition) {
			if (evaluateExpression(expr, container, element, key, childProps)) {
				newStyle = assign(newStyle, resolveStyle(styles.condition[expr], newProps, container, element, key, childProps));
			}
		}
	}
	return newStyle;
}

/**
 * Iterate through all children and create a map with type/index information
 * This is needed to validate type-specific index-sensitive pseudo-classes
 * e.g. :last-type-of
 * @param {Array} children - an array of children
 */
function generateTypeMap(children) {
	let typeSensitiveMap = {};
	children.forEach((child, index) => {
		if (typeSensitiveMap.hasOwnProperty(child.type)) {
			++typeSensitiveMap[child.type];
		} else {
			typeSensitiveMap[child.type] = 1;
		}
	});
}