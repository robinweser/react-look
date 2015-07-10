import * as Validator from './validator';
import {
	cloneObject
}
from './misc';
import assign from 'object-assign';

let ref = '';
let blankStyle = {
		style: {},
		condition: {}
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

					generatePseudoMap(pseudoMap, ref, selector);

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
			sheet[parent].style[selector] = current;
		}
	}
	return sheet;
}

function generatePseudoMap(pseudoMap, parent, selector) {
	if (!pseudoMap.has(parent)) {
		pseudoMap.set(parent, new Map());
	}
	if (Validator.isIndexSensitive(selector)) {
		pseudoMap.get(parent).set('indexSensitive', true);
	}

	if (Validator.isPseudoActive(selector)) {
		pseudoMap.get(parent).set('active', true);
	}

	if (Validator.isPseudoFocus(selector)) {
		rpseudoMap.get(parent).set('focus', true);
	}

	if (Validator.isPseudoHover(selector)) {
		pseudoMap.get(parent).set('hover', true);
	}
}