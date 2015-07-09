import {
	Sheet
}
from 'dynamic-style-sheets';
import * as Misc from '../utils/misc';
import splitStyles from '../utils/splitter';
import Obscene from '../index';

/*
 *  An universal StyleSheet that both handles true CSS Style Sheets as well as inlines Styles 
 */
export default class UniversalSheet extends Sheet {

	/*
	 * @param {Object} styles - A key-value map with css rules
	 * @param {Object} options - A set of options
	 */
	constructor(styles, options) {
		let selectors = {};
		selectors = splitStyles(styles, selectors);

		super(selectors);
		if (options.autoProcess) {
			this.process();
		}
	}

	process(processors, ...args) {
		/**
		 * Registering missing processors
		 */
		if (processors)  {
			processors = Misc.toArray(processors);
		} else {
			processors = Obscene.getProcessors();
		}

		processors.forEach(item => {
			super.process(item, ...args);
		})
	}

	compile() {
		return this.selectors;
	}
}