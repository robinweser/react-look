import { CSSSheet } from 'dynamic-style-sheets';
import * as Misc from '../utils/misc';
import Stylesheet from '../index';
/*
 *  A global StyleSheet that directly applies to your DOM.
 */
export default class Global extends CSSSheet {

	/*
	 * @param {Object} styles - A key-value map with valid CSS Rules
	 * @param {boolean} autoProcess - If sheet automatically get's processed
	 */
	constructor(styles, process) {
		super(styles);

		if (process) {
			this.process();
		}
		
		this.apply();
	}

	process(processors, register, ...args) {
		if (processors)  {
			processors = Misc.toArray(processors);
		} else {
			processors = Stylesheet.getProcessors();
		}

		processors.forEach(item => {
			super.process(item, ...args);
		})
	}
}