import cloneObject from './cloner';
import * as Validator from './validator';
import React from 'react';
import assign from 'object-assign';
import evaluateExpression from './evaluator';
import State from '../map/state';
import pseudoMap from '../map/pseudo';
import * as Listener from './listener';

/*
 * Resolves styling for an element and returns the modified one.
 * @param {ObsceneComponent} wrapper - the outer React Component to determine state and props
 * @param {ReactElement} el - current element that gets modified
 * @param {object} selectors - all selectors with styles, conditions and extra css classNames
 * @param {Object} childProps - information on child-indexes for index-sensitive pseudo-classes
 */
export default function resolveLook(wrapper, el, selectors, childProps) {
	if (el && el.props) {
		let props = el.props;

		let children = [];

		if (props.children && props.children instanceof Array) {
			let typeIndex = {};
			let typeMap = {};

			/*
			 * Iterate through all children and create a map with type/index information
			 * This is needed to validate type-specific index-sensitive pseudo-classes
			 * e.g. :last-type-of
			 */
			props.children.forEach((item, index) => {
				if (typeMap.hasOwnProperty(item.type)) {
					++typeMap[item.type];
				} else {
					typeMap[item.type] = 1;
				}
			})

			/*
			 * Recursively resolve look for child elements first 
			 */
			props.children.forEach((item, index) => {
				/*
				 * Creates a map with index informtations
				 * This is needed to validate index-senstive pseudo-classes
				 * e.g. :first-child, :nth-child
				 */
				if (typeIndex.hasOwnProperty(item.type)) {
					++typeIndex[item.type];
				} else {
					typeIndex[item.type] = 1;
				}

				let child = {};
				if (item.props.look) {
					let pseudoMap = State.get(wrapper, 'pseudoMap').get(item.props.look);
					child['length'] = props.children.length;
					child['index'] = index;
					child['indexType'] = typeIndex[item.type];
					child['indexTypeLength'] = typeMap[item.type];
				}

				if (React.isValidElement(item)) {
					children.push(resolveLook(wrapper, item, selectors, child));
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

			let key = el.key || el.ref || 'root';

			if (!State.has(wrapper, key)) {
				State.add(wrapper, key);
			} else {
				console.warn('You already got a root element. Please use a specific key or ref in order to achieve :hover, :active, :focus to work properly.');
			}

			Listener.addRequiredListeners(wrapper, el, key, newProps);
			newStyle = resolveStyle(cloneObject(styles), newProps, wrapper, el, key, childProps)
			delete props.look;
		}

		if (props.style) {
			newStyle = assign(newStyle, props.style);
		}
		newProps.style = newStyle;

		let newEl = React.cloneElement(el, newProps, children);
		return newEl;

	} else {
		return el;
	}
}

/**
 * Interates every condition and valuates the expressions
 * Also applies additional classNames if specified (This helps if you're using extern CSS-libraries)
 * This returns the final styles object
 */
function resolveStyle(styles, newProps, wrapper, el, key, childProps) {
	let newStyle = styles.style;
	let state = wrapper.state;

	if (styles.css) {
		if (!newProps.className) {
			newProps.className = '';
		}
		newProps.className += styles.css
	}

	if (styles.condition) {
		let expr;
		for (expr in styles.condition) {
			if (evaluateExpression(expr, wrapper, el, key, childProps)) {
				newStyle = assign(newStyle, resolveStyle(styles.condition[expr], newProps, wrapper, el, key, childProps));
			}
		}
	}
	return newStyle;
}