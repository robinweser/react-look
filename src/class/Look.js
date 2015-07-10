import {
	Sheet
}
from 'dynamic-style-sheets';
import * as Misc from '../utils/misc';
import splitStyles from '../utils/splitter';
import Obscene from '../index';
import PseudoMap from '../map/pseudo';
/*
 *  An universal StyleSheet that both handles true CSS Style Sheets as well as inlines Styles 
 */
export default class Look extends Sheet {

	/*
	 * @param {Object} styles - A key-value map with css rules
	 * @param {Object} options - A set of options
	 */
	constructor(styles, options) {
		let selectors = {};

		let pseudo = PseudoMap.create();
		selectors = splitStyles(styles, selectors, pseudo);

		super(selectors);

		this._pseudoMap = pseudo;

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

	_getPseudoMap() {
		return this._pseudoMap;
	}
}