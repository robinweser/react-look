import assign from 'object-assign';
import * as Validator from './validator'

/**
 * Converts an value to an Array
 * @param {string|number|boolean|Object}
 */
export function toArray(value) {
	if (value instanceof Array == false) {
		value = [value];
	}
	return value;
}

/**
 * Clones a Object
 * NOTE: This is much like Immutable.js behavoir
 * @param {Object} object - Object that get's cloned
 */
export function cloneObject(obj, deep = true) {
	let clone = {};
	let i;

	for (i in obj) {
		let temp = obj[i];
		if (temp instanceof Object) {
			clone[i] = cloneObject(temp, true);
		} else {
			clone[i] = temp;
		}
	}
	return clone;
}