/**
 * Clones a Object
 * @param {Object} object - Object that get's cloned
 * TODO: optimize this step
 */
export default function cloneObject(obj) {
	return JSON.parse(JSON.stringify(obj));
}