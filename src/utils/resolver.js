import * as Misc from './misc';
import * as Validator from './validator';
import React from 'react';
import assign from 'object-assign';
import evaluateExpression from './evaluator';
import StateMap from './map/state';
import pseudoMap from './map/pseudo';

/*
 * Resolves styling for an element and returns the modified one.
 * @param {ObsceneComponent} wrapper - the outer React Component to determine state and props
 * @param {}
 */
export default function resolveLook(wrapper, el, selectors) {
	if (el && el.props) {
		if (!StateMap.has(wrapper.state, el)) {
			StateMap.set(wrapper.state, el);
		}
		let props = el.props;

		//Recursively resolve look for child elements
		let children = [];
		if (props.children && props.children instanceof Array) {

			//Determine if any child needs index sensitive pseudo class check
			let indexSensitive;
			props.children.forEach(item => {
				if (item.props.look) {
					if (selectors[item.props.look] && selectors[item.props.look].indexSensitive) {
						indexSensitive = true;
					}
				}
			});

			StateMap.setState(wrapper.state, el, 'index', pseudoMap(el, indexSensitive));

			debugger;

			props.children.forEach((item, index) => {
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


/**
 * Interates every condition and valuates the expressions. 
 * This returns the final styles object. 
 */
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