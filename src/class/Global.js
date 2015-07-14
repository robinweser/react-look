import { CSSSheet } from 'dynamic-style-sheets';
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
		processors.forEach(item => {
			super.process(item, ...args);
		})
	}
}