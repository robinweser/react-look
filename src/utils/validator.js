/**
 * A list of all unitless values
 */
let unitlessProperties = [
	'boxFlex', 'boxFlexGroup', 'columnCount', 'flex', 'flexGrow', 'flexPositive', 'flexNegative', 'flexShrink', 'fontWeight', 'lineClamp', 'lineHeight', 'opacity', 'order', 'orphans', 'tabSize', 'widows', 'zIndex', 'zoom', 'fillOpacity', 'strokeDashoffest', 'strokeOpacity', 'strokeWidth'
];

/** 
 * Checks if the selector is a media query
 */
export function isMediaQuery(selector) {
	return selector.trim().charAt(0) == '@';
};

/** 
 * Checks if the selector is stateful (treated as inline style)
 */
export function isCondition(selector) {
	return selector.trim().indexOf('=') > -1;
};

/** 
 * Checks if the selector is a pseudo class
 */
export function isPseudo(selector) {
	return selector.trim().charAt(0) == ':';
}

/** 
 * Checks if the selector is a pseudo class
 */
export function isClass(selector) {
	return selector.trim().charAt(0) == '.';
}

export function isAdvanced(selector) {
	return this.isExpression(selector) || this.isMediaQuery(selector) || this.isPseudo(selector);
}

export function isExpression(selector) {
	return selector.includes('=');
}
/** 
 * Checks if a property is an unitless property
 */
export function isUnitless(property) {
	return unitlessProperties.indexOf(property) > -1;
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