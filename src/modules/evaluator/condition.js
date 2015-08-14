import {_Validator} from 'type-utils';
/**
 * Evaluates if a condition is fullfiled by checking a given set of values
 * NOTE: Those values always include this.props and this.state
 * @param {string} condition - Condition that gets evaluateCondition
 * @param {Object} matchValues - A list of values that are used to evaluate the condition
 */
export default function evalCondition(condition, matchValues) {
	let operator = evaluateOperator(condition);
	let [property, value] = condition.split(operator);

	if (matchValues.hasOwnProperty(property)) {
		let match = (matchValues[property] === undefined ? 'undefined' : matchValues[property]);

		if (!_Validator.isNumber(match)) {
			match = match.toString();
		}

		if (operator === '>=') {
			return match >= value;
		} else if (operator === '<=') {
			return match <= value;
		} else if (operator === '!=') {
			return match != value;
		} else if (operator === '=') {
			return match == value;
		} else if (operator === '>') {
			return match > value;
		} else if (operator === '<') {
			return match < value;
		} else {
			console.warn('Failed evaluating condition: ' + condition + '. There has been an invalid operator `' + operator) + '`.';
			console.warn('Use >=, <=, !=, =, > or < with the following pattern: `propOPERATORvalue`');
			return false;
		}
	} else {
		return false;
	}
}

/**
 * Returns used operator within a condition
 * @param {string} condition - condition which contains an operator
 */
function evaluateOperator(condition) {
	const operators = ['>=', '<=', '!=', '=', '>', '<'];

	let i;
	let length = operators.length;
	for (i = 0; i < length; ++i) {
		let op = operators[i];
		if (condition.indexOf(op) > -1) {
			return op;
		}
	}
}