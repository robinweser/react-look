import * as Misc from './misc';
import * as Validator from './validator';
import React from 'react';
import assign from 'object-assign';
import evaluateExpression from './evaluator';

/*
 * Replacing all el.look with their respective inline styles and CSS classes
 * @param {Object} el - component props that get validated and resolved
 */
export default function resolveLook(wrapper, el, selectors) {
	if (el && el.props) {
		let props = el.props;
		/*
		 * Recursively resolve look for child elements
		 */
		let children = [];
		if (props.children && props.children instanceof Array) {
			props.children.forEach((item, a, b, c) => {
				debugger;
				if (React.isValidElement(item)) {
					children.push(resolveLook(wrapper, item, selectors));
				}
			});
		} else {
			children = props.children;
		}

		let newStyle = {};
		if (props.hasOwnProperty('look') && selectors.hasOwnProperty(props.look)) {
			let styles = selectors[props.look];

			newStyle = resolveStyle(Misc.cloneObject(styles), wrapper.state)
			delete props.look;
		}

		if (props.style) {
			newStyle = assign(newStyle, props.style);
		}
		let newProps = ({}, props);
		newProps.style = newStyle;

		return React.cloneElement(el, newProps, children)
	} else {
		return el;
	}
}

function resolveStyle(styles, state) {
	let newStyle = styles.style;

	if (styles.condition) {
		let expr;
		for (expr in styles.condition) {
			if (evaluateExpression(expr, state)) {
				newStyle = assign(newStyle, resolveStyle(styles.condition[expr], state));
			}
		}
	}
	return newStyle;
}