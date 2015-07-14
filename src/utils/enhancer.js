import resolveLook from './resolver';
import StateMap from '../map/state';
import assign from 'object-assign';

export default {
	extend(Component, look, matchState, mediaQueryListener) {
		class LookComponent extends Component {
			constructor() {
				super(...arguments);
				this.state = this.state ||  {};
				this.state._look = new Map([
					['pseudoMap', look._pseudoMap]
				]);
				
				/*
				* If matchState is set all stateful conditions will both math this.state and this.props
				* Otherwise only this.props get checked
				*/
				if (matchState){
					this._matchValues = assign(this.state, this.props);
				} else {
					this._matchValues = this.props;
				}
				this._lastActive = []
				let me = this;

				/*
				* Adds a resize listener to instantly recheck all media queries
				* NOTE: It is assumend that a user won't resize an application too often
				*/
				if (mediaQueryListener) {
					this._onResizeListener = this._onResizeListener.bind(this);
					window.addEventListener('resize', function () {
						me._onResizeListener();
					});
				}

				this._onMouseUp = this._onMouseUp.bind(this);
				window.addEventListener('mouseup', function () {
					me._onMouseUp();
				});
			}
			
			/*
			* Removes all active styles applied to elements by mouse down before
			*/
			_onMouseUp() {
				if (this._lastActive.length > 0) {
					this._lastActive.forEach(key => {
						if (StateMap.has(this, key)) {
							StateMap.setState(this, key, 'active', false);
							//console.log('Deactivated:', key);
						}
					})
					this._lastActive.length = 0;
				}
			}

			_onResizeListener() {
				this.forceUpdate();
			}

			/*
			* Similar to Radium, Look wraps the render function and resolves styles on its own
			*/
			render() {
				let el = super.render();
				el = resolveLook(this, el, look.selectors);
				return el;
			}
		}
		return LookComponent;
	}
}