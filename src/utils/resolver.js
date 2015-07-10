import * as Misc from './misc';
import * as Validator from './validator';
import React from 'react';
import assign from 'object-assign';
import evaluateExpression from './evaluator';
import StateMap from '../map/state';
import pseudoMap from '../map/pseudo';
import * as Listener from './listener';

/*
 * Resolves styling for an element and returns the modified one.
 * @param {ObsceneComponent} wrapper - the outer React Component to determine state and props
 * @param {}
 */
export default function resolveLook(wrapper, el, selectors) {
	if (el && el.props) {
		let props = el.props;

		//Recursively resolve look for child elements
		let children = [];
		if (props.children && props.children instanceof Array) {
			props.children.forEach((item, index) => {
				if (React.isValidElement(item)) {
					children.push(resolveLook(wrapper, item, selectors));
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

			if (!StateMap.has(wrapper, key)) {
				StateMap.set(wrapper, key, new Map());
			}
			Listener.addRequiredListeners(wrapper, el, key, newProps);
			newStyle = resolveStyle(Misc.cloneObject(styles), wrapper, el, key)
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
 * Interates every condition and valuates the expressions. 
 * This returns the final styles object. 
 */
function resolveStyle(styles, wrapper, el, key) {
	let newStyle = styles.style;
	let state = wrapper.state;

	if (styles.condition) {
		let expr;
		for (expr in styles.condition) {
			if (evaluateExpression(expr, wrapper, el, key)) {
				newStyle = assign(newStyle, resolveStyle(styles.condition[expr], wrapper, el, key));
			}
		}
	}
	return newStyle;
}