/** 
 * Checks if the selector is a media query
 */
export function isMediaQuery(selector) {
	return selector.trim().charAt(0) == '@';
};

export function isCondition(selector) {
	return selector.includes('=');
}

export function isAdvanced(selector) {
	return this.isCondition(selector) || this.isMediaQuery(selector) || this.isPseudo(selector);
}

export function isIndexSensitive(selector) {
	let sensitivePseudos = [':last-child', ':first-child', ':nth-child', ':nth-last-child', ':nth-of-type', ':first-of-type'];

	let i;
	let length = sensitivePseudos.length;
	for (i = 0; i < length; ++i)
		if (selector.indexOf(sensitivePseudos[i]) > -1) {
			return true;
		}
	return false;
}
/** 
 * Checks if a value really is a number
 */
export function isNumber(value) {
	return !isNaN(parseFloat(value)) && isFinite(value);
}

/** 
 * Checks if an object is empty
 */
export function isEmpty(object) {
	return !Object.keys(object).length;
}
/** 
 * Checks if the selector is a pseudo class
 */
export function isPseudo(selector) {
	return selector.trim().charAt(0) == ':';
}

//Other Pseudos
export function isPseudoLang(selector) {
	return selector.trim().indexOf(':lang') == 0;
}

//Action Pseudos
export function isPseudoActive(selector) {
	return selector.trim().indexOf(':active') == 0;
}
export function isPseudoHover(selector) {
	return selector.trim().indexOf(':hover') == 0;
}
export function isPseudoFocus(selector) {
	return selector.trim().indexOf(':focus') == 0;
}

//Input Pseudos
export function isPseudoChecked(selector) {
	return selector.trim().indexOf(':checked') == 0;
}
export function isPseudoDisabled(selector) {
	return selector.trim().indexOf(':disabled') == 0;
}
export function isPseudoEnabled(selector) {
	return selector.trim().indexOf(':enabled') == 0;
}
export function isPseudoInvalid(selector) {
	return selector.trim().indexOf(':invalid') == 0;
}
export function isPseudoValid(selector) {
	return selector.trim().indexOf(':valid') == 0;
}
export function isPseudoInRange(selector) {
	return selector.trim().indexOf(':in-range') == 0;
}
export function isPseudoReadOnly(selector) {
	return selector.trim().indexOf(':read-only') == 0;
}
export function isPseudoReadWrite(selector) {
	return selector.trim().indexOf(':read-write') == 0;
}
export function isPseudoDefault(selector) {
	return selector.trim().indexOf(':default') == 0;
}
export function isPseudoIndeterminate(selector) {
	return selector.trim().indexOf(':indeterminate') == 0;
}
export function isPseudoOutOfRange(selector) {
	return selector.trim().indexOf(':out-of-range') == 0;
}
export function isPseudoRequired(selector) {
	return selector.trim().indexOf(':required') == 0;
}
export function isPseudoOptional(selector) {
	return selector.trim().indexOf(':optional') == 0;
}