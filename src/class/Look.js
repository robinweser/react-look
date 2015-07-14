import {Sheet} from 'dynamic-style-sheets';
import splitStyles from '../utils/splitter';
import Enhancer from '../utils/enhancer';


export default class Look extends Sheet {

	/*
	 * Creates a new Look instance which extends Dynamic Style Sheets' Sheet
	 * For further information check the Sheet class
	 * @param {Object} styles - A key-value map with style rules
	 */
	constructor(styles) {
		let selectors = {};

		let pseudo = new Map();
		/*
		 * Splits your selectors into styles, conditions (pseudo, media, stateful) & css
		 * Also creates a pseudoMap with information on used pseudo-classes
		 */
		selectors = splitStyles(styles, selectors, pseudo);

		super(selectors);
		this._pseudoMap = pseudo;
	}

	/*
	 * Processes your styles with any processor provided
	 */
	process(processors, ...args) {
		if (processors instanceof Array == false) {
			processors = [processors]
		}
		processors.forEach(item => {
			super.process(item, ...args);
		})
	}

	/*
	 * Applies your styles to a React Component
	 * @param {Component} component - a valid React component that get'S styles applied
	 * @param {Boolean} matchState - if also this.state (in addition to this.props) values are used while validatiing stateful conditions
	 * @param {Boolean} resizeListener - if a resize listener get's added to notice size changes/rematch media queries
	 */
	applyTo(component, matchState = true, resizeListener = false) {
		if (this.selectors) {
			return Enhancer.extend(component, this, matchState, resizeListener)
		} else {
			return component;
		}
	}
}