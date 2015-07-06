import {
	Sheet
}
from 'dynamic-style-sheets';
import * as Util from '../Util';
import Stylesheet from '../index';
/*
 *  An universal StyleSheet that both handles true CSS Style Sheets as well as inlines Styles 
 */
export default class InlineSheet extends Sheet {

	/*
	 * @param {Object} styles - A key-value map with css rules
	 * @param {boolean} autoProcess - If sheet automatically get's processed
	 */
	constructor(styles, autoProcess) {
		super(styles);

		if (autoProcess) {
			this.process();
		}
	}

	process(processors, register, ...args) {
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
		})
	}
	getSelectors(){
		return this.selectors;
	}
}