import resolveLook from './resolver';
import assign from 'object-assign';
import assignStyles from 'assign-styles';
import extend from '../utils/extend';

/**
 * Applies your styles to a React Component
 * @param {Component} Component - a valid React component that gets styles applied
 * @param {Array|Object} additionalStyles - additional styles that are used to resolve looks
 * @param {Array|Function} additionalProcessors - additional processors that modify the styles
 */
export default function Look(Component, additionalStyles = {}, additionalProcessors = undefined) {
	class LookComponent extends Component {
		constructor() {
			super(...arguments);
			this.state = this.state ||  {};


			this.processors = prepareProcessors(this, additionalProcessors);
			this.mixins = prepareMixins(this);

			this._lastActive = [];
			this.state._look = new Map();
		}


		//Remove mouseup listener if component unmounts to keep listeners clean
		componentWillUnmount() {
			if (super.componentWillUnmount) {
				super.componentWillUnmount();
			}
			if (this._onMouseUp) {
				window.removeEventListener('mouseup', this._onMouseUp);
			}
		}

		//Similar to Radium, Look wraps the render function and resolves styles on its own
		render() {
			this.styles = prepareStyles(this, additionalStyles);
			/**
			 * Only resolveLook if there are styles to resolve
			 * Otherwise just return super.render() which leads to no difference
			 */
			if (this.styles && Object.keys(this.styles).length > 0) {
				this._matchValues = assign({}, this.props, this.state);
				return resolveLook(this, super.render());
			} else {
				console.warn(Compoent + ' was enhanced with Look, but did not provide any styles.');
				console.warn('This might affect performance and rendering time.');
				return super.render();
			}
		}
	}

	//Taken from Radium, this adds the original component displayName again
	LookComponent.displayName = Component.displayName || Component.name || 'Component';

	return LookComponent;
}

/**
 * Prepares processors and adds them to one unified array
 * @param {Object} Component - Component providing processors
 * @param {Object|Array} additionalProcessors - any additional processors provided by outer wrapper
 */
export function prepareProcessors(Component, additionalProcessors) {
	let newProcessors;
	
	if (Component.processors) {
		if (Component.processors instanceof Function) {
			Component.processors = Component.processors();
			newProcessors = Component.processors;
		}
		//arrayify processors
		if (Component.processors instanceof Array !== true) {
			newProcessors = [Component.processors];
		}
	}

	//add additional processors
	if (additionalProcessors) {
		if (!Component.processors) {
			newProcessors = [];
		}
		if (additionalProcessors instanceof Array) {
			newProcessors.push(...additionalProcessors);
		} else if (additionalProcessors instanceof Object) {
			newProcessors.push(additionalProcessors);
		}
	}
	
	return newProcessors;
}

/**
* Prepares mixins and adds extend mixin support
* @param {Object} Component - Component providing mixins
*/
export function prepareMixins(Component){	
	let newMixins;
	
	if (Component.mixins) {
		if (Component.mixins instanceof Function) {
			newMixins = Component.mixins();
		} else if (Component.mixins instanceof Object){
			newMixins = Component.mixins;
		}
	} else {
		newMixins = {};
	}
	
	//Adds default extend-mixin support
	newMixins.extend = extend;
	return newMixins;
}

/**
 * Prepares Component styles and additionalStyles for later use as a single style object
 * @param {Object} Component - Component providing styles
 * @param {Object|Array} additionalStyles - any additional styles provided by outer wrapper
 */
export function prepareStyles(Component, additionalStyles){
	let newStyles;
	
	if (additionalStyles instanceof Array) {
	 	newStyles= assignStyles(...additionalStyles);
	} else if (additionalStyles instanceof Object) {
		newStyles = additionalStyles;
	} else {
		console.warn('Additional styles need to be either a valid object or an array of valid objects.');
		console.warn('Look ignores the following additional styles: ', additionalStyles);
		newStyles = {};
	}

	//Merge component assigned styles with outer styles to 
	if (Component.look && Component.look instanceof Function) {
		newStyles = assignStyles(Component.look(), newStyles);
		delete Component.look;
	}

	//Resolve default style object if no outer selector is given
	if (newStyles[Object.keys(newStyles)[0]] instanceof Object !== true) {
		newStyles = {
			'_default': newStyles
		}
	}
	
	return newStyles;
}