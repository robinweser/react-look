import * as Validator from './validator';
import evaluateMediaQuery from './evaluator/media';
import evaluateCondition from './evaluator/condition';
import evaluatePseudoClass from './evaluator/pseudo';
import State from '../map/state';

/**
 * Evaluates any advanced expression which are pseudo classes, media queries or stateful conditions
 * @param {string} expression - expression that gets evaluated
 * @param {Component} container - the outer react component
 * @param {Object} element - current element thats style gets resolved
 * @param {string} key - current element's unique key to resolve user-action pseudos
 * @param {Object} childProps - information on children index/type 
 */
export default function evaluateExpression(expression, container, element, key, childProps) {
	//eval media queries
	if (Validator.isMediaQuery(expression)) {
		return evaluateMediaQuery(expression);
	}
	//eval conditions
	else if (Validator.isCondition(expression)) {
		let matchValues = container._matchValues;
		return evaluateCondition(expression, matchValues);
	}
	//eval pseudos
	else if (Validator.isPseudo(expression)) {
		let keyState = State.get(container, key);
		return evaluatePseudoClass(expression, element.props, keyState, childProps);
	} else {
		return false;
	}
}