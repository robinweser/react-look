import Regex from './regex';
import {Validator} from 'type-utils';

/**
 * Validates input values by their type
 * NOTE: Uses regexes which are deprecated and will be removed soon
 * @param {string} value - value that gets validated by type
 * @param {string} type - current elements type
 */
export function evalValue(value, type) {
	console.warn("Validation within react-look has been deprecated. Use react-look-tools instead.");

	if (type === 'email') {
		return Regex.email.test(value);
	} else if (type === 'url') {
		return Regex.url.test(value);
	} else if (type === 'number' || type === 'range') {
		return Validator.isNumber(value);
	} else if (type === 'tel') {
		//TODO: tel validation
		return false;
	} else {
		return false;
	}
}

/**
 * Validates if a value is in range of min, max or not
 * @param {Object} props - current elements props including min,max and value
 */
export function evalRange(props, val) {
	let {min, max, defaultValue} = props;
	
	let value = parseInt(val) || defaultValue;
	return min !== undefined && max !== undefined && value >= min && value <= max;
}