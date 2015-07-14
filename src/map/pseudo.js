import * as Validator from '../utils/validator';

export default {
	create() {
			let pseudoMap = new Map();
			return pseudoMap;
		},

		addEventPseudo(pseudoMap, parent, selector) {
			if (!pseudoMap.has(parent)) {
				pseudoMap.set(parent, new Map());
			}
			if (Validator.isIndexSensitive(selector)) {
				pseudoMap.get(parent).set('indexSensitive', true);
			} else if (Validator.isTypeSensitive(selector)) {
				pseudoMap.get(parent).set('typeSensitive', true);
			} else if (Validator.isPseudoActive(selector)) {
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