import resolveLook from './resolver';
import State from '../map/state';
import assign from 'object-assign';
import assignStyles from 'assign-styles';
import Sheet from '../class/Sheet';

/**
 * Applies your styles to a React Component
 * @param {Component} component - a valid React component that gets styles applied
 * @param {Array|Object} styles - styles that used to resolve looks
 * @param {Array|Function} processors - processors that modify the styles
 * @param {Boolean} matchState - if also this.state (in addition to this.props) values are used while validatiing stateful conditions
 * @param {Boolean} resizeListener - if a resize listener get's added to notice size changes/rematch media queries
 */
export default function Look(Component, styles = {}, processors = undefined, matchState = true, mediaQueryListener = false) {
	class LookComponent extends Component {
		constructor() {
			super(...arguments);
			this.state = this.state ||  {};


			//resolve multiple styles by merging those
			if (styles instanceof Array) {
				styles = assignStyles(...styles);
			}

			//Merge component assigned styles with outer styles to 
			if (this.look) {
				if (this.look instanceof Function) {
					styles = assignStyles(this.look(), styles);
				} else if (this.look instanceof Object) {
					styles = assignStyles(this.look, styles);
				}
			}

			let sheet = new Sheet(styles);

			if (processors) {
				sheet.process(processors);
			}

			/**
			 * If matchState is set all stateful conditions will both math this.state and this.props
			 * Otherwise only this.props get checked
			 */
			this._matchValues = (matchState ? assign(this.state, this.props) : this.props);
			this._lastActive = [];
			this._sheet = sheet;
			this.state._look = new Map();
			this._pseudoMap = sheet._pseudoMap;

			let me = this;

			/**
			 * Adds a resize listener to instantly recheck all media queries
			 * NOTE: It is assumend that a user won't resize an application too often
			 */
			if (mediaQueryListener) {
				window.addEventListener('resize', function () {
					me.forceUpdate();
				});
			}
		}


		//Remove mouseup listener if component unmounts to keep listeners clean
		componentWillUnmount() {
			if (super.componentWillUnmount) {
				super.componentWillUnmount();
			}
			if (this._onMouseUp) {
				window.removeEventListener('mouseup', this._onMouseUp)
			}
		}

		//Similar to Radium, Look wraps the render function and resolves styles on its own
		render() {
			let element = super.render();
			return resolveLook(this, element, this._sheet.selectors);
		}
	}

	//Taken from Radium, this adds the original component displayName again
	LookComponent.displayName = Component.displayName || Component.name || 'Component';

	return LookComponent;
}