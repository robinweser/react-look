import * as Validator from '../utils/validator';

export default {
	create() {
			let pseudoMap = new Map();
			return pseudoMap;
		},

		addIndexSensitivePseudo(pseudoMap, el, styles) {
			pseudoMap.set('empty', (el.props.children));

			//Determine if any child needs index sensitive pseudo class check
			let indexSensitive;
			el.props.children.forEach(item => {
				if (item.props.look) {
					if (styles.hasOwnProperty(item.props.look) && styles[item.props.look].indexSensitive) {
						indexSensitive = true;
					}
				}
			});
			pseudoMap.set('indexSensitive', indexSensitive);
		},

		addEventPseudo(pseudoMap, parent, selector) {
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
				pseudoMap.get(parent).set('focus', true);
			}

			if (Validator.isPseudoHover(selector)) {
				pseudoMap.get(parent).set('hover', true);
			}
		}
}