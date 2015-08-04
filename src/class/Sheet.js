import {Sheet} from 'dynamic-style-sheets';
import splitStyles from '../utils/splitter';

export default class LookSheet extends Sheet {

	/**
	 * Creates a new Look instance which extends Dynamic Style Sheets' Sheet
	 * For further information check the Sheet class
	 * @param {Object} styles - A key-value map with style rules
	 */
	constructor(styles) {
		let selectors = {};
		let pseudo = new Map();

		/**
		 * Splits your selectors into styles, conditions (pseudo, media, stateful) & css
		 * Also creates a pseudoMap with information on used pseudo classes
		 */
		selectors = splitStyles(styles, selectors, pseudo);
		
		super(selectors);
		this._pseudoMap = pseudo;
	}
}