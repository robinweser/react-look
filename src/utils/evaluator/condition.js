/*
 * Evaluates if a condition is fullfiled by checking a given set of values
 * NOTE: Those values always include this.props and optionally this.state
 * @param {string} condition - Condition that gets evaluateCondition
 * @param {Object} matchValues - A list of values that are used to evaluate the condition
 */
export default function evaluateCondition(condition, matchValues) {
	let [
		property, value
	] = expression.split('=');
	if (matchValues[property] == value) {
		return true;
	}
}