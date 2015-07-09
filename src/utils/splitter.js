import * as Validator from './validator';
import {cloneObject} from './misc';
import assign from 'object-assign';

let blankStyle = {
		style: {},
		condition: {}
	}
	/**
	 * Core algorithm which seperates all your styles and resolves all special objects
	 * Recursively resolves pseudo-classes, extensions and media queries
	 */
export function splitStyles(styles, sheet, parent = '') {
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

export function splitConditions(conditions) {
	let condition;

	let split = {
		media: new Map(),
		expression: new Map(),
		pseudo: new Map()
	};

	conditions.media = new Map();
	for (condition in conditions) {
		if (Validator.isMediaQuery(condition)) {
			split.media.set(normalizeMediaQuery(condition), conditions[condition]);
		}
		if (Validator.isPseudo(condition)) {
			split.pseudo.set(condition, conditions[condition]);
		}
		if (Validator.isExpression(condition)) {
			split.expression.set(condition, conditions[condition]);
		}
	}
	return split;
}

function normalizeMediaQuery(query) {
	return query.replace('@media', '').replace('width', window.innerWidth).replace('height', window.innerHeight).replace('deviceHeight', window.outerHeight).replace('deviceWidth', window.outerWidth).trim();
}
