import * as Validator from './validator';
import {_Object} from 'type-utils';
import evalMediaQuery from './evaluator/media';
import evalCondition from './evaluator/condition';
import evalPseudoClass from './evaluator/pseudo';
import State from '../class/State';
import createEventListener from './listener';

/**
 * Evaluates any advanced expression which are pseudo classes, media queries or stateful conditions
 * @param {Component} Component - the outer react component
 * @param {Object} element - current element thats style gets resolved
 * @param {string} expression - expression that gets evaluated
 * @param {Object} newProps - props that get the new styles added 
 * @param {Object} childIndexMap - information on children index/type 
 */
export default function evaluateExpression(Component, element, expression, newProps, childIndexMap) {
	//eval media queries
	if (Validator.isMediaQuery(expression)) {
		/**
		 * Adds a resize listener to instantly recheck all media queries
		 * NOTE: It is assumend that a user won't resize an application too often
		 */
		if (!Component._mediaQueryListener) {
			Component._mediaQueryListener = true;
			window.addEventListener('resize', () => {
				Component.forceUpdate();
			});
		}

		return evalMediaQuery(expression);
	}

	//eval conditions
	else if (Validator.isCondition(expression)) {
		return evalCondition(expression, Component._matchValues);
	}

	//eval pseudo
	else if (Validator.isPseudo(expression)) {
		let key = element.key || element.ref || 'root';
		
		//add required event listeners
		if (Validator.isActionPseudo(expression)) {
			newProps = _Object.assign(newProps, createEventListener(Component, element, key, expression.split(':')[1]));
		}
		return evalPseudoClass(expression, element.props, State.get(Component, key), childIndexMap);

	} else {
		return false;
	}
}