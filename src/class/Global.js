import {CSSSheet, Processors} from 'dynamic-style-sheets';
let Units = Processors.Units;
/**
 *  A global StyleSheet that directly applies to your DOM.
 */
export default class Global extends CSSSheet {

	/**
	 * @param {Object} styles - A key-value map with valid CSS Rules
	 */
	constructor(styles, unit='px', media = '', id) {
		super(styles, media, id);
		
		this.process(Units, unit);
		this.unit = unit;
	}
	
	process(){
		super.process(...arguments);
		super.process(Units, this.unit);
	}
}