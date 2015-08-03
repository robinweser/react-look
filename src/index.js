import Sheet from './class/Sheet';
import State from './map/state';
import * as matchMedia from './utils/matchMedia';
import Global from './class/Global';
import Enhancer from './utils/enhancer';
import assign from 'assign-styles';

/**
 * Applies your styles to a React Component
 * @param {Component} component - a valid React component that gets styles applied
 * @param {Array|Object} styles - styles that used to resolve looks
 * @param {Array|Function} processors - processors that modify the styles
 * @param {Boolean} matchState - if also this.state (in addition to this.props) values are used while validatiing stateful conditions
 * @param {Boolean} resizeListener - if a resize listener get's added to notice size changes/rematch media queries
 */
function Look(component, styles, processors = undefined, matchState = true, resizeListener = false) {
	
	//resolve multiple styles by merging those
	if (styles instanceof Array){
		styles = assign(...styles);
	}
	
	let sheet = new Sheet(styles);
	
	if (processors) {
		sheet.process(processors);
	}

	if (sheet.selectors) {
		return Enhancer(component, sheet, matchState, resizeListener);
	} else {
		return component;
	}
}

function registerProcessor(processor) {
	//TODO: register/deregister Processors
}

function deregisterProcessor(processor) {
	//TODO: register/deregister Processors
}

function getProcessors(processor) {
	//TODO: register/deregister Processors
}

export {
	Look as default,
	Global as Global,
	State as State,
	matchMedia as matchMedia
}