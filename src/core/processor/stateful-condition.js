import assign from 'object-assign'
import assignStyles from 'assign-styles'

export default {
	args: ['Component'],

	/**
	 * Validates if a selector is a stateful condition
	 * @param {string} selector - selector that gets validates
	 */
	isCondition(selector) {
		return validate(selector, '=') || validate(selector, '<') ||  validate(selector, '>') ||  validate(selector, '!=')
	},

	/**
	 * Returns used operator within a condition
	 * @param {string} condition - condition which contains an operator
	 */
	getOperator(condition) {
		const operators = ['>=', '<=', '!=', '=', '>', '<'];

		let i;
		let length = operators.length;
		for (i = 0; i < length; ++i) {
			let op = operators[i];
			if (condition.indexOf(op) > -1) {
				return op;
			}
		}
	},

	/**
	 * Evaluates if a condition is fullfiled by checking a given set of values
	 * NOTE: Those values always include this.props and this.state
	 * @param {string} condition - Condition that gets evaluateCondition
	 * @param {Object} matchValues - A list of values that are used to evaluate the condition
	 */
	evaluateCondition(condition, matchValues) {
		let operator = this.getOperator(condition);
		let [property, value] = condition.split(operator);

		if (matchValues.hasOwnProperty(property)) {
			let match = (matchValues[property] === undefined ? 'undefined' : matchValues[property]);

			if (!isNumber(match)) {
				match = match.toString();
			}

			switch (operator) {
				case '>=':
					return match >= value;
				case '<=':
					return match <= value;
				case '!=':
					return match != value;
				case '=':
					return match == value;
				case '>':
					return match > value;
				case '<':
					return match < value;
				default:
					console.warn('Failed evaluating condition: ' + condition + '. There has been an invalid operator `' + operator) + '`.';
					console.warn('Use >=, <=, !=, =, > or < with the following pattern: `propOPERATORvalue`');
					return false;
			}
		} else {
			return false;
		}
	},

	resolveCondition(styles, matchValues) {
		let newStyles = {}

		let property
		for (property in styles) {
			if (property instanceof Object && this.isCondition(property) && this.evaluateCondition(property, matchValues)) {
				newStyles = resolveCondition(styles, matchValues)
			} else {
				newStyles[property] = styles[property]
			}
		}

		return newStyles
	},

	process(styles, Component) {
		let matchValues = assign({}, Component.props, Component.state)
		return resolveCondition(styles, matchValues)
	}
}

/**
 * Validates if a value is a true number
 * @param {number} value - value that gets validated
 */
function isNumber(value) {
	return !isNaN(parseFloat(value)) && isFinite(value);
}

function validate(selector, value) {
	return selector.indexOf(value) > -1
}