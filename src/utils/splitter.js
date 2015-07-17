import assign from 'object-assign';

import * as Validator from './validator';
import cloneObject from './cloner';
import PseudoMap from '../map/pseudo';

let ref = '';
const blankStyle = {
		style: {},
		condition: {},
		css: ''
	}
	/**
	 * Core algorithm which separates all your styles and resolves all special objects
	 * Recursively resolves pseudo-classes, extensions and media queries
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
					sheet[parent].condition[selector] = cloneObject(blankStyle, true);

					PseudoMap.addRequiredEventPseudos(pseudoMap, ref, selector);

					splitStyles(current, sheet[parent].condition, pseudoMap, selector);
				} else {
					sheet[selector] = cloneObject(blankStyle, true);
					!parent && (ref = selector);
					splitStyles(current, sheet, pseudoMap, selector);
				}
			}
		} else {
			/*
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