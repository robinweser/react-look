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
				å
				this._lastActive = []
				let me = this;

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

			_onMouseUp() {
				if (this._lastActive) {
					this._lastActive.forEach(key => {
						if (StateMap.has(this, key)) {
							StateMap.setState(this, key, 'active', false);
						}
					})
				}
			}

			_onResizeListener() {
				this.forceUpdate();
			}

			render() {
				let el = super.render();
				el = resolveLook(this, el, look.selectors);
				return el;
			}
		}
		return LookComponent;
	}
}