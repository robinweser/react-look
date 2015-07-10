import resolveLook from './resolver';
import StateMap from '../map/state';
import assign from 'object-assign';
import {
	splitStyles
}
from './splitter';

export default {
	apply(Component, look, mediaQueryListener, matchState) {
		class LookComponent extends Component {
			constructor() {
				super(...arguments);
				this.state = this.state ||  {};
				this.state._obscene = new Map();
				this.state._obscene.set('pseudoMap', look._pseudoMap);
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
					if (StateMap.has(this, this._lastActive)) {
						StateMap.setState(this, this._lastActive, 'active', false);
					}
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