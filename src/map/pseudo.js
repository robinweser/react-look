import * as Validator from '../utils/validator';
const eventPseudos = [':active', ':focus', ':hover', ':valid', ':invalid'];

/**
 * Adds pseudo-class information concerning a style selector
 * This helps to purposeful handle only needed pseudo classes
 * @param {Map} pseudo - a map to store event pseudos
 * @param {string} selector - a selector which those event pseudos belong to
 * @param {string} event - pseudo-class that represents an event
 */
export default function addRequiredEventPseudos(pseudo, selector, event) {
	let eventIndex = eventPseudos.indexOf(event);
	if (eventIndex > -1) {

		//Creates a new pseudo map if it doesn't exist before
		if (!pseudo.has(selector)) {
			pseudo.set(selector, new Map());
		}

		//Validates current selectors and analogous sets event reference
		if (eventIndex > 2) {
			setEventPseudo(pseudo, selector, 'change')
		} else {
			setEventPseudo(pseudo, selector, event.substr(1, event.length - 1))
		}
	}
}

/**
 * Sets a specific event for a given selector
 * @param {Map} pseudo - a map to store event pseudos
 * @param {string} selector - a selector which those event pseudos belong to
 * @param {string} event - pseudo-class that represents an event
 */
function setEventPseudo(pseudo, selector, event) {
	pseudo.get(selector).set(event, true);
}