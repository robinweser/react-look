/**
 * Clones a Object
 * @param {Object} object - Object that get's cloned
 * Taken from: http://heyjavascript.com/4-creative-ways-to-clone-objects/
 */
export default function cloneObject(obj) {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}
	var temp = obj.constructor();
	for (var key in obj) {
		temp[key] = cloneObject(obj[key]);
	}
	return temp;
}