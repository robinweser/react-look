/**
 * Validates if a value is a true number
 * @param {number} value - value that gets validated
 */
export default function isNumber(value) {
	return !isNaN(parseFloat(value)) && isFinite(value);
}