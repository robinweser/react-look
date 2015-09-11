/**
 * Extracts only the mathematical expression out an pseudo-class string 
 * @param {string} pseudo - pseudo-class selector that includes a mathmactical expression
 * @param {string} expression - defines which index-sensitive pseudo-class your pseudo is, e.g: nth-child, first-of-type 
 */
export default function splitNthExpression(pseudo) {
	let split = pseudo.replace(/ /g, '').split('(');
	return {
		expression: split[1].substr(0, split[1].length - 1),
		pseudo: split[0]
	}
}