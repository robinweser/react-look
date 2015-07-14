import assign from 'object-assign';

import * as Validator from './validator';
import cloneObject from './cloner';
import PseudoMap from '../map/pseudo';

let ref = '';
let blankStyle = {
		style: {},
		condition: {},
		css: ''
	}
	/**
	 * Core algorithm which seperates all your styles and resolves all special objects
	 * Recursively resolves pseudo-classes, extensions and media queries
	 */
export default function splitStyles(styles, sheet, pseudoMap, parent = '') {
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

					PseudoMap.addEventPseudo(pseudoMap, ref, selector);

					splitStyles(current, sheet[parent].condition, pseudoMap, selector);
				} else {
					sheet[selector] = cloneObject(blankStyle, true);
					if (!parent) {
						ref = selector;
					}
					splitStyles(current, sheet, pseudoMap, selector);
				}
			}
		} else {
			if (Validator.isCSS(selector)) {
				sheet[parent].css = current;
				delete styles[selector];
				continue;
			}
			sheet[parent].style[selector] = current;
		}
	}
	return sheet;
}