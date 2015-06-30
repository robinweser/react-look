let counter = 0;
let reference = {};
/*
	A list of all unitless values
*/
export let unitlessProperties = [
	'boxFlex', 'boxFlexGroup', 'columnCount', 'flex', 'flexGrow', 'flexPositive', 'flexNegative', 'flexShrink', 'fontWeight', 'lineClamp', 'lineHeight', 'opacity', 'order', 'orphans', 'tabSize', 'widows', 'zIndex', 'zoom', 'fillOpacity', 'strokeDashoffest', 'strokeOpacity', 'strokeWidth'
];

/*
	Core algorithm which seperates all your styles and resolves all special objects
	Recursively resolves pseudo-classes, extensions and media queries
*/
export function generateSelectors(styles, stylesheet, options, parent = '') {
	let selector;

	for (selector in styles) {
		let current = styles[selector];
		/*
			Resolves functions if they're not executed directly
		*/
		if (current instanceof Function) {
			current = current();
		}

		if (current instanceof Object) {
			/*
				Checks if the current object is perhaps empty
				Benefit: Prevents empty selectors since those affect your rendering performance
			*/
			if (!isEmpty(current)) {

				/*
					Resolves extended styles which can be added by using '+' as your property key
				*/
				if (isExtend(selector)) {
					styles = extendStyle(styles, selector);
					generateSelectors(styles, stylesheet, options, parent);
					return;
				}

				/*
					Resolves media queries and automatically adds them to same queries if existing
					*/
				if (isMediaQuery(selector)) {
					//TODO: handle media queries
					return;
				}

				/*
					Resolves pseudo classes, also works with nested ones
				*/
				if (isPseudo(selector)) {
					let pseudo = parent + selector;
					stylesheet.set(pseudo, new Map());
					generateSelectors(current, stylesheet, options, pseudo);
					return;
				}

				/*
					Prevents nested style objects
					Benefit: You won't create too specific selectors since they're not performant at all
				*/
				if (!parent) {
					parent = generateClassName(selector, options.minify);

					stylesheet.set(parent, new Map());
					generateSelectors(current, stylesheet, options, parent);

					reference[selector] = parent.slice(1);
					parent = '';
				}
			}
		} else {
			/*
				Resolves and adds simple properties-value pairs to the global stylesheet
			*/
			let value = addUnit(selector, current, options.unit);
			stylesheet.get(parent).set(selector, value);
		}
	}
	return reference;
}
/*
	Resolves an extend object
*/
export function extendStyle(base, selector) {
	let extension = base[selector];

	if (!extension.styles instanceof Array) {
		extension.styles = [extension.styles];
	}

	let i;
	let length = extension.length;
	for (i = 0; i < length; ++i) {
		if (extension.overwrite) {
			Object.assign(base, item);
		} else {
			Object.assign(item, base);
		}
	}

	delete base[selector];
	return base;
}

/* 
	Generates an unique class selector based on a counter
*/
export function generateClassName(selector, minify) {
	if (minify) {
		selector = '.c' + counter.toString(36);
		++counter;
	}
	return selector;
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

export function resetCounter() {
	counter = 0;
}
export function clearReference() {
	reference = {};
}