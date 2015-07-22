import resolveLook from './resolver';
import State from '../map/state';
import assign from 'object-assign';

export default {
	extend(Component, look, matchState, mediaQueryListener) {
		class LookComponent extends Component {
			constructor() {
				super(...arguments);
				this.state = this.state ||  {};
				/**
				 * If matchState is set all stateful conditions will both math this.state and this.props
				 * Otherwise only this.props get checked
				 */
				this._matchValues = (matchState ? assign(this.state, this.props) : this.props);
				this._lastActive = [];
				this.state._look = new Map();
				this._pseudoMap = look._pseudoMap;

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

			/*
			 * Remove mouseup listener if component unmounts to keep listeners clean
			 */
			componentWillUnmount() {
				if (super.componentWillUnmount) {
					super.componentWillUnmount();
				}
				if (this._onMouseUp) {
					window.removeEventListener('mouseup', this._onMouseUp)
				}
			}

			/**
			 * Similar to Radium, Look wraps the render function and resolves styles on its own
			 */
			render() {
				let element = super.render();
				return resolveLook(this, element, look.selectors);
			}
		}
		return LookComponent;
	}
}