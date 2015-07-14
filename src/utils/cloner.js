import * as Validator from './validator'

/**
 * Clones a Object
 * NOTE: This is much like Immutable.js behavoir
 * @param {Object} object - Object that get's cloned
 */
export default function cloneObject(obj, deep = true) {
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