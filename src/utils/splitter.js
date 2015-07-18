import assign from 'object-assign';

import * as Validator from './validator';
import cloneObject from './cloner';
import addRequiredEventPseudos from '../map/pseudo';

let ref = '';
const blankStyle = {
	style: {},
	condition: {},
	css: ''
}

/**
 * Splits/Separates your styles into 3 groups: style, advanced and css
 * Recursively resolves pseudo-classes, extensions and media queries
 * @param {Object} styles - an object with selectors that contain style key-value pairs
 * @param {Object} sheet - a sheet you want to apply the splitted styles
 * @param {Map} map - a map that gets information about sepcial pseudo-classes added
 * @param {string} parent - represents the current selector if iterating inner objects
 */
export default function splitStyles(styles, sheet, pseudoMap, parent = '') {
	let selector;
	for (selector in styles) {
		selector = selector.trim();
		let current = styles[selector];

		if (current instanceof Object) {
			/**
			 * Checks if the current object is perhaps empty
			 */
			if (!Validator.isEmpty(current)) {
				/**
				 * Resolves media queries and pseudo classes
				 */
				if (Validator.isAdvanced(selector)) {
					sheet[parent].advanced[selector] = cloneObject(blankStyle, true);

					addRequiredEventPseudos(pseudoMap, ref, selector);

					splitStyles(current, sheet[parent].condition, pseudoMap, selector);
				} else {
					sheet[selector] = cloneObject(blankStyle, true);
					!parent && (ref = selector);
					splitStyles(current, sheet, pseudoMap, selector);
				}
			}
		} else {
			/**
			 * Small hack to add additional classNames
			 */
			if (Validator.validateSelector(selector, '_css')) {
				sheet[parent].css = current;
				delete styles[selector];
				continue;
			}
			sheet[parent].style[selector] = current;
		}
	}
	return sheet;
}