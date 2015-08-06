import resolveLook from './resolver';
import State from '../map/state';
import {assign} from 'object-enhancer';
import assignStyles from 'assign-styles';
import Sheet from '../class/Sheet';

/**
 * Applies your styles to a React Component
 * @param {Component} component - a valid React component that gets styles applied
 * @param {Array|Object} styles - additional styles that are used to resolve looks
 * @param {Array|Function} processors - additional processors that modify the styles
 */
export default function Look(Component, additionalStyles, processors = undefined) {
	class LookComponent extends Component {
		constructor() {
			super(...arguments);
			if (!this.state) {
				this.state = {};
			}

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
			let styles = {};

			//resolve multiple styles by merging those
			if (additionalStyles instanceof Array) {
				styles = assignStyles(...additionalStyles);
			}

			//Merge component assigned styles with outer styles to 
			if (this.look) {
				if (this.look instanceof Function) {
					styles = assignStyles(this.look(), styles);
				} else if (this.look instanceof Object) {
					styles = assignStyles(this.look, styles);
				}
				delete this.look;
			}


			let sheet = new Sheet(styles);

			//Process the styles with component-assigned processors
			if (this.processors) {
				if (this.processors instanceof Function) {
					sheet.process(this.processors());
				} else if (this.processors instanceof Object) {
					sheet.process(this.processors);
				}
				delete this.processors;
			}

			//Process the styles with additional processors if provided
			if (processors) {
				sheet.process(processors);
			}

			sheet.split();

			this._sheet = sheet;
			this._pseudoMap = sheet._pseudoMap;

			let me = this;

			/**
			 * Adds a resize listener to instantly recheck all media queries
			 * NOTE: It is assumend that a user won't resize an application too often
			 */
			if (this._pseudoMap.has('_mediaQueryListener') && !this._mediaQueryListener) {
				this._mediaQueryListener = true;
				window.addEventListener('resize', function () {
					me.forceUpdate();
				});
			}

			/**
			 * If matchState is set all stateful conditions will both math this.state and this.props
			 * Otherwise only this.props get checked
			 */
			this._matchValues = assign(this.state, this.props);

			let element = super.render();
			return resolveLook(this, element);
		}
	}

	//Taken from Radium, this adds the original component displayName again
	LookComponent.displayName = Component.displayName || Component.name || 'Component';

	return LookComponent;
}