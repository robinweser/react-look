/*
	A list of all unitless values
*/
export var unitlessProperties = [
	'boxFlex', 'boxFlexGroup', 'columnCount', 'flex', 'flexGrow', 'flexPositive', 'flexNegative', 'flexShrink', 'fontWeight', 'lineClamp', 'lineHeight', 'opacity', 'order', 'orphans', 'tabSize', 'widows', 'zIndex', 'zoom', 'fillOpacity', 'strokeDashoffest', 'strokeOpacity', 'strokeWidth'
];

/*
	Resolves an extend object
*/
export function handleExtend(base, selector) {
	var extension = base[selector];

	if (!extension.styles instanceof Array) {
		extension.styles = [extension.styles];
	}

	var i;
	var length = extension.length;
	for (i = 0; i < length; ++i) {
		if (extension.overwrite) {
			Object.assign(base, item);
		} else {
			Object.assign(item, base);
		}
	}

	delete extension;
	return base;
}

/* 
	Checks if the selector is a pseudo class
*/
export function generateClassName(selector, counter, options) {
	if (options.minify) {
		selector = 'c' + counter.toString(36);
		++counter;
	}
	return options.prefix + selector;
}

/* 
	Merges an array of className strings into one string for html use
*/
export function mergeClassNames(classNames) {
	if (classNames instanceof Array) {
		classNames = classNames.join(' ');
	}
	return classNames;
}

/* 
	returns a value with a given unit if needed
*/
export function addUnit(property, value, unit) {
	if (isNumber(value) && !isUnitless(property)) {
		value += unit;
	}
	return value;
}

/* 
	Checks if the selector is a media query
*/
export function isMediaQuery(selector) {
	return selector.trim().charAt(0) == '@';
};

/* 
	Checks if the selector is a extend object
*/
export function isExtend(selector) {
	return selector.trim().charAt(0) == '+';
};

/* 
	Checks if the selector is a pseudo class
*/
export function isPseudo(selector) {
	return selector.trim().charAt(0) == ':';
}

/* 
	Checks if the selector is a pseudo class
*/
export function isClass(selector) {
	return selector.trim().charAt(0) == '.';
}

/* 
	Checks if a property is an unitless property
*/
export function isUnitless(property) {
	return unitlessProperties.indexOf(property) > -1;
}

/* 
	Checks if a value really is a number
*/
export function isNumber(value) {
	return !isNaN(parseFloat(value)) && isFinite(value);
}

/* 
	Checks if an object is empty
*/
export function isEmpty(object) {
	return !Object.keys(object).length;
}