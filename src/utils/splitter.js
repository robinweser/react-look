import * as Validator from './validator';
import {
	cloneObject
}
from './misc';
import assign from 'object-assign';

let blankStyle = {
		style: {},
		condition: {}
	}
	/**
	 * Core algorithm which seperates all your styles and resolves all special objects
	 * Recursively resolves pseudo-classes, extensions and media queries
	 */
export default function splitStyles(styles, sheet, parent = '') {
	let selector;
	for (selector in styles) {
		let current = styles[selector];

		if (current instanceof Object) {
			/**
			 * Checks if the current object is perhaps empty
			 * Benefit: Prevents empty selectors since those affect your rendering performance
			 */
			if (!Validator.isEmpty(current)) {
				/**
				 * Resolves media queries and pseudo classes
				 */
				if (Validator.isAdvanced(selector)) {
					sheet[parent].condition[selector] = cloneObject(blankStyle, true);

					if (Validator.isIndexSensitive(selector)) {
						sheet[parent].indexSensitive = true;
					}

					splitStyles(current, sheet[parent].condition, selector);
				} else {
					sheet[selector] = cloneObject(blankStyle, true);
					splitStyles(current, sheet, selector);
				}
			}
		} else {
			sheet[parent].style[selector] = current;
		}
	}
	return sheet;
}