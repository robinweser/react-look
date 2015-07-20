/**
 * Clones a Object
 * @param {Object} object - Object that get's cloned
 */
export default function cloneObject(obj) {
	return JSON.parse(JSON.stringify(obj));
}