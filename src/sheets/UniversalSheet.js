import {
	CSSSheet
}
from 'dynamic-style-sheets';
import * as Util from '../Util';
import Stylesheet from '../index';
import InlineSheet from './InlineSheet';
import objectAssign from 'object-assign';

/*
 *  An universal StyleSheet that both handles true CSS Style Sheets as well as inlines Styles 
 */
export default class UniversalSheet extends CSSSheet {

	/*
	 * @param {Object} styles - A key-value map with css rules
	 * @param {Object} options - A set of options
	 */
	constructor(styles, options) {
		let condition = {};
		let selectors = {};
		let media = {};

		/**
		 * Seperating inline styles
		 */
		let inline = {};

		if (styles.hasOwnProperty('_inline')) {
			inline = new InlineSheet(styles['_inline']);
			delete styles['_inline'];
		}

		/** 
		 * Generating CSS Classes, media queries, pseudo classes and conditioned styles
		 */
		let classes = Util.generateClasses(styles, selectors, media, condition, options);

		super(selectors);

		this.classes = classes;
		this._inline = inline;
		this.inline = this._inline.getSelectors();
		this._condition = new InlineSheet(condition);
		this.condition = this._condition.getSelectors();

		if (media) {
			this.mediaQueries = {};
			let query;
			let i = 0;
			for (query in media) {
				this.mediaQueries[query] = new CSSSheet(media[query], query, this.id + '-media-' + ++i);
			}
		}


		if (options.autoProcess) {
			this.process();
		}
		if (options.autoApply) {
			this.apply();
		}
	}

	process(processors, register, ...args) {
		let media = this.mediaQueries;
		let inline = this._inline;
		let condition = this._condition;
		/**
		 * Registering missing processors
		 */
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

		processors.forEach(function (item) {
			super.process(item, ...args);
			if (inline.process instanceof Function) {
				inline.process(item, ...args);
			}
			if (condition.process instanceof Function) {
				condition.process(item, ...args);
			}
			let query;
			for (query in media) {
				media[query].process(item, ...args);
			}
		})
	}

	apply() {
		let media = this.mediaQueries;

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

	getInlineSheet() {
		return this._inline;
	}

	getMediaSheet(query) {
		return this.mediaQueries[query];
	}
}