import * as Validator from '../utils/validator';

export default {
	/*
	 * Adds pseudo-class information concerning a style selector
	 * This helps to purposeful handle only needed pseudo-classes
	 */
	addEventPseudo(pseudoMap, parent, selector) {
		if (!pseudoMap.has(parent)) {
			pseudoMap.set(parent, new Map());
		}

		if (Validator.isPseudoActive(selector)) {
			pseudoMap.get(parent).set('active', true);
		} else if (Validator.isPseudoFocus(selector)) {
			pseudoMap.get(parent).set('focus', true);
		} else if (Validator.isPseudoHover(selector)) {
			pseudoMap.get(parent).set('hover', true);
		} else if (Validator.isPseudoValid(selector) || Validator.isPseudoInvalid(selector)) {
			pseudoMap.get(parent).set('change', true);
		}
	}
}