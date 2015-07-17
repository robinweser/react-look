export function validateSelector(selector, value) {
	return selector.indexOf(value) == 0;
}

export function isPseudo(selector) {
	return this.validateSelector(selector, ':');
}

export function isMediaQuery(selector) {
	return this.validateSelector(selector, '@');
}

export function isCondition(selector) {
	return selector.includes('=');
}

export function isAdvanced(selector) {
	return this.isCondition(selector) || this.isMediaQuery(selector) || this.isPseudo(selector);
}

export function isNumber(value) {
	return !isNaN(parseFloat(value)) && isFinite(value);
}

export function isEmpty(object) {
	return !Object.keys(object).length;
}