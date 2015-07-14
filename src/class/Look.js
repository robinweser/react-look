import { Sheet } from 'dynamic-style-sheets';
import splitStyles from '../utils/splitter';
import PseudoMap from '../map/pseudo';
import Enhancer from '../utils/enhancer';


export default class Look extends Sheet {

	/*
	 * @param {Object} styles - A key-value map with style rules
	 */
	constructor(styles) {
		let selectors = {};

		let pseudo = PseudoMap.create();
		selectors = splitStyles(styles, selectors, pseudo);
		
		super(selectors);
		this._pseudoMap = pseudo;
	}

	process(processors, ...args) {
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

	applyTo(component, resizeListener = false, matchValues) {
		if (this.selectors) {
			return Enhancer.extend(component, this, matchValues, resizeListener)
		} else {
			return component;
		}
	}
}