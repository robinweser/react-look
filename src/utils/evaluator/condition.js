const operators = ['>=', '<=', '=', '>', '<'];
/*
 * Evaluates if a condition is fullfiled by checking a given set of values
 * NOTE: Those values always include this.props and optionally this.state
 * @param {string} condition - Condition that gets evaluateCondition
 * @param {Object} matchValues - A list of values that are used to evaluate the condition
 */
export default function evaluateCondition(condition, matchValues) {
	let operator = evaluateOperator(condition);
	let [property, value] = expression.split(operator);

	if (operator == '>=') {
		return matchValues[property] >= value;
	} else if (operator == '<=') {
		return matchValues[property] <= value;
	} else if (operator == '=') {
		return matchValues[property] == value;
	} else if (operator == '>') {
		return matchValues[property] > value;
	} else if (operator == '<') {
		return matchValues[property] < value;
	}
}

function evaluateOperator(condition) {
	operators.forEach(op => {
		if (condition.includes(op)) {
			return op;
		}
	})
}