import paramCase from 'param-case';
import * as Util from './util/Utils';

const defaultOptions = {
	minfy: true,
	autoApply: false,
	prefix: ''
}

let sheet = new Map();
let counter = 0;

export default {
	/*
		Main function that adds styles to your global stylesheet which is stored in `sheet`
		It reduces your input style object and outputs an object with just reference keys to your selectors
	*/
	create(styles, options = defaultOptions) {
		generateSelectors(styles, options);

		return styles;
	}

	/*
		Core algorithm which seperates all your styles and resolves all special objects
		Recursively resolves pseudo-classes, extensions and media queries
	*/
	generateSelectors(styles, options, parent = '') {
		let selector;
		var stylesLength
		for (selector in styles) {
			let current = styles[selector];
			/*
				Resolves functions if they're not executed directly
			*/
			if (current instanceof Function) {
				current = current();
			}

			if (current instanceof Object) {
				/*
					Checks if the current object is perhaps empty
					Benefit: Prevents empty selectors since those affect your rendering performance
				*/
				if (!Util.isEmpty(current)) {

					/*
						Resolves extended styles which can be added by using '+' as your property key
					*/
					if (Util.isExtend(selector)) {
						styles = Util.extendStyle(styles, selector);
						generateSelectors(styles, options, parent);
						return;
					}

					/*
						Resolves media queries and automatically adds them to same queries if existing
						*/
					if (Util.isMediaQuery(selector)) {
						//TODO: handle media queries
						return;
					}

					/*
						Resolves pseudo classes, also works with nested ones
					*/
					if (Util.isPseudo(selector)) {
						let pseudo = parent + selector;
						sheet.set(pseudo, new Map());
						generateSelectors(current, options, pseudo);
						return;
					}

					/*
						Prevents nested style objects
						Benefit: You won't create too specific selectors since they're not performant at all
					*/
					if (!parent) {
						parent = Util.generateClassName(selector, counter, options);

						sheet.set(parent, new Map());
						generateSelectors(styles, options, parent);


						/*
							You might have set a selectorPrefix which is not a valid class selector (starting with a '.')
							Checks if there's a antecedent '.' and removes it since you are refer to a className without the class selector dot.
						*/
						Util.isClass(parent) && parent.slice(1);

						styles = parent.slice(1);
						parent = '';
					}
				}
			} else {
				/*
					Resolves and adds simple properties-value pairs to the global stylesheet
				*/
				value = Util.addUnit(selector, current, options.unit);
				sheet.get(parent).set(property, value);
			}
		}
	}
}