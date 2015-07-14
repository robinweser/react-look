export function isAdvanced(selector) {
	return this.isCondition(selector) || this.isMediaQuery(selector) || this.isPseudo(selector);
}

export function isIndexSensitive(selector) {
	const sensitivePseudos = [':last-child', ':first-child', ':nth-child', ':only-child', ':nth-last-child'];

	let i;
	let length = sensitivePseudos.length;
	for (i = 0; i < length; ++i)
		if (selector.indexOf(sensitivePseudos[i]) > -1) {
			return true;
		}
	return false;
}

export function isTypeSensitive(selector) {
	const sensitivePseudos = [':nth-of-type', ':first-of-type', ':last-of-type', ':nth-last-of-type', ':only-of-type'];

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

export function isCSS(selector) {
	return selector.trim().indexOf('_css') == 0;
}
/** 
 * Checks if the selector is a pseudo class
 */
export function isPseudo(selector) {
	return selector.trim().charAt(0) == ':';
}

/** 
 * Checks if the selector is a media query
 */
export function isMediaQuery(selector) {
	return selector.trim().charAt(0) == '@';
};

export function isCondition(selector) {
	return selector.includes('=');
}

//Other Pseudos
export function isPseudoLang(selector) {
	return selector.trim().indexOf(':lang') == 0;
}
export function isPseudoEmpty(selector) {
	return selector.trim().indexOf(':empty') == 0;
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

//Index Sensitive Pseudos
export function isPseudoFirstChild(selector) {
	return selector.trim().indexOf(':first-child') == 0;
}
export function isPseudoLastChild(selector) {
	return selector.trim().indexOf(':last-child') == 0;
}
export function isPseudoNthChild(selector) {
	return selector.trim().indexOf(':nth-child') == 0;
}
export function isPseudoOnlyChild(selector) {
	return selector.trim().indexOf(':only-child') == 0;
}
export function isPseudoNthLastChild(selector) {
	return selector.trim().indexOf(':nth-last-child') == 0;
}

//Type-Specific Index Sensitive Pseudos
export function isPseudoFirstOfType(selector) {
	return selector.trim().indexOf(':first-of-type') == 0;
}
export function isPseudoLastOfType(selector) {
	return selector.trim().indexOf(':last-of-type') == 0;
}
export function isPseudoNthOfType(selector) {
	return selector.trim().indexOf(':nth-of-type') == 0;
}
export function isPseudoOnlyOfType(selector) {
	return selector.trim().indexOf(':only-of-type') == 0;
}
export function isPseudoNthLastOfType(selector) {
	return selector.trim().indexOf(':nth-last-of-type') == 0;
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