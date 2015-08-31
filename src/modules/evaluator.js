import {isPseudo, isCondition, isActionPseudo, isMediaQuery} from './validator';
import evalMediaQuery from './evaluator/media';
import evalCondition from './evaluator/condition';
import evalPseudoClass from './evaluator/pseudo';
import State from '../api/State';
import {getDefaultKey} from '../api/Config';
import createEventListener from './listener';
import assign from 'object-assign';

const defaultKey = getDefaultKey();

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
	if (isMediaQuery(expression)) {
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
	else if (isCondition(expression)) {
		return evalCondition(expression, Component._matchValues);
	}

	//eval pseudo
	else if (isPseudo(expression)) {
		let key = element.key || element.ref || defaultKey;
		
		//add required event listeners
		if (isActionPseudo(expression)) {
			newProps = assign(newProps, createEventListener(Component, element, key, expression.split(':')[1]));
		}
		
		return evalPseudoClass(expression, element.props, State.get(Component, key), childIndexMap);

	} else {
		console.warn('Failed resolving expression: ' + expression);
		console.warn('Invalid expression. Use `:`-prefix for pseudo classes, `@media` for media queries.');
		console.warn('Stateful styles are condition based on use the following pattern: `propOPERATORvalue`. e.g. active=true, clicks>=20.');
		return false;
	}
}