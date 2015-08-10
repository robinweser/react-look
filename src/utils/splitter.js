import * as Validator from './validator';
import {_Object, Validator as _Validator} from 'type-utils';
import addRequiredEventPseudos from '../map/pseudo';

let ref = '';
const blankStyle = {
	style: {},
	advanced: {},
	css: ''
}

/**
 * Splits/Separates your styles into 3 groups: style, advanced and css
 * Recursively resolves pseudo classes, extensions and media queries
 * @param {Object} styles - an object with selectors that contain style key-value pairs
 * @param {Object} sheet - a sheet you want to apply the splitted styles
 * @param {Map} pseudoMap - a map that gets information about sepcial pseudo classes added
 * @param {string} parent - represents the current selector if iterating inner objects
 * TODO: refactor wrapping resolver, this is kind of dirty and only allows single-stage
 */
export default function splitStyles(styles, sheet, pseudoMap, parent, wrapper) {
	let selector;
	for (selector in styles) {
		selector = selector.trim();
		let currentStyles = styles[selector];

		if (currentStyles instanceof Object) {
			/**
			 * Checks if the current object is perhaps empty
			 */
			if (!_Validator.isEmpty(currentStyles)) {
				/**
				 * Resolves media queries and pseudo classes
				 */
				if (Validator.isAdvanced(selector)) {
					//Resolve outer advanced wrapper 
					if (!parent)  { 
						splitStyles(currentStyles, sheet, pseudoMap, '', selector);
						wrapper = '';
						continue;
					}

					sheet[parent].advanced[selector] = _Object.clone(blankStyle);

					addRequiredEventPseudos(pseudoMap, ref, selector);

					splitStyles(currentStyles, sheet[parent].advanced, pseudoMap, selector);
				} else {
					if (!sheet[selector]) {
						sheet[selector] = _Object.clone(blankStyle);
					}

					!parent && (ref = selector);

					//Resolve outer advanced wrapper 
					if (wrapper) {
						sheet[selector].advanced[wrapper] = _Object.clone(blankStyle);
						splitStyles(currentStyles, sheet, pseudoMap, selector, wrapper);
						continue;
					}

					splitStyles(currentStyles, sheet, pseudoMap, selector);
				}
			}
		} else {
			if (!parent){
				parent = '_default';
				sheet[parent] = _Object.clone(blankStyle);
			}
			/**
			 * Small hack to add additional classNames
			 */
			if (Validator.validateSelector(selector, 'css')) {
				sheet[parent].css = currentStyles;
				delete styles[selector];
				continue;
			}

			//Resolve outer advanced wrapper 
			if (wrapper) {
				sheet[parent].advanced[wrapper].style[selector] = currentStyles;
			} else {
				sheet[parent].style[selector] = currentStyles;
			}
		}
	}
	return sheet;
}