import {CSSSheet, Processors} from 'dynamic-style-sheets';
let Units = Processors.Units;
/*
 *  A global StyleSheet that directly applies to your DOM.
 */
export default class Global extends CSSSheet {

	/*
	 * @param {Object} styles - A key-value map with valid CSS Rules
	 */
	constructor(styles, unit='px') {
		super(styles);
		
		this.process(Units, unit);
	}

	/**
	 * Processes your styles with any processor provided
	 * @param {Array|Object} processors - processor(s) you want to run against your styles
	 */
	process(processors, ...args) {
		if (processors instanceof Array == false) {
			super.process(processor, ...args);
		} else {
			processors.forEach(item => {
				super.process(item, ...args);
			})
		}
	}
}