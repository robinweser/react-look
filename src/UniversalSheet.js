import {
	Sheet
}
from 'dynamic-style-sheets';
import objectAssign from 'object-assign';

import * as Util from './Util';
import Stylesheet from './Stylesheet';

/*
 *  An universal StyleSheet that both handles true CSS Style Sheets as well as inlines Styles 
 */
export default class UniversalSheet extends Sheet {

	/*
	 * @param {Object} styles - A key-value map with css rules
	 * @param {Object} options - A set of options
	 */
	constructor(styles, options) {
		let condition = {};
		let selectors = {};
		let media = {};
		let inline = {};

		if (styles.hasOwnProperty('_inline')) {
			inline = styles['_inline'];
			delete styles['_inline'];
		}

		let classes = Util.generateClasses(styles, selectors, media, condition, options);

		super(selectors);

		if (media) {
			this.media = {};
			let query;
			let i = 0;
			for (query in media) {
				this.media[query] = new Sheet(media[query], query, this.id + '-media-' + ++i);
			}
		}
		this.classes = classes;
		this.inline = inline;
		this.condition = condition;

		if (options.autoProcess) {
			this.process();
		}
		if (options.autoApply) {
			this.apply();
		}
	}

	process(processors, register, ...args) {
		let media = this.media;

		if (processors)  {
			processors = Util.toArray(processors);
			if (register) {
				processors.forEach(function (item) {
					Stylesheet.registerProcessor(item);
				});
			}
		} else {
			processors = Stylesheet.getProcessors();
		}

		let i;
		let length = processors.length;
		for (i = 0; i < length; ++i) {
			super.process(processors[i], ...args);
			processors[i].process(this.condition, ...args);
			processors[i].process(this.inline, ...args);
			let query;
			for (query in media) {
				media[query].process(processors[i], ...args);
			}
		}
	}

	apply() {
		let media = this.media;

		super.apply();

		let query;
		for (query in media) {
			media[query].apply();
		}
	}


	matchCondition(values) {
		let conditionStyles = {};

		let selector;
		for (selector in this.condition) {
			conditionStyles[selector] = {};

			let condition;
			let conditions = this.condition[selector];
			for (condition in conditions) {
				if (condition.indexOf('=') > -1);
				let [property, value] = condition.split('=');
				if (values.hasOwnProperty(property) && values[property] == value) {
					conditionStyles[selector] = objectAssign(conditionStyles[selector], conditions[condition]);
				}
			}
		}
		return conditionStyles;
	}
}