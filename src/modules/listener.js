import State from '../api/State';

const events = {
	'active': {
		onMouseDown: true
	},
	'hover': {
		onMouseEnter: true,
		onMouseLeave: false
	},
	'focus': {
		onFocus: true,
		onBlur: false
	}
};

let keyElementMap = new Map();

/**
 * Creates an event listener to target pseudo classes
 * This only gets applied if an element acutally got action-pseudo-class-specific styles
 * @param {Component} Component - React Component that gets enhanced by Look
 * @param {Object} element - current element that gets a listener applied
 * @param {string} event - event type you want listeners for: active, focus, change
 */
export default function createEventListener(Component, element, key, event) {
	// This checks if there are any needed pseudo classes that need an event listener by checking the pseudo map for this element
	if (!State.has(Component, key)) {
		State.add(Component, key);
		keyElementMap.set(key, element);
	} else {
		if (!keyElementMap.get(key) === element) {
			console.warn('There is a state associated with element.key="' + key + '". Use unqiue `key` or `ref` while using :hover, :focus or :active on multiple elements.');
			console.warn('Look will not add state-listeners to', element);
			return element.props;
		}
	}

	var newProps = {};
	//iterate current event's required listeners
	let listener;
	for (listener in events[event]){
		let state = events[event][listener];
		let existing = element.props[listener];
		
		newProps[listener] = e => {
			//Call former listeners if existing
			existing && existing(e);
			//Set action state
			State.setState(event, state, Component, key);

			if (event == 'active' && state) {
				Component._lastActive.push(key);
			}
		};
	}

	//Add an mouse-up listener once if there's an :active pseudo class
	if (event == 'active' && !Component._onMouseUp) {
		addMouseUpListener(Component);
	}
	return newProps;
}


/**
 * Removes all active styles applied to elements by mouse down before
 * @param {Component} Component - React Component that gets enhanced by Look
 */
function onMouseUp(Component) {
	while (Component._lastActive.length > 0) {
		let key = Component._lastActive[0];
		State.setState('active', false, Component, key);
		Component._lastActive.pop(key);
	}
}

/**
 * Adds a mosue up listener to delete :active styles
 * @param {Component} Component - React Component that gets enhanced by Look
 */
function addMouseUpListener(Component) {
	Component._onMouseUp = () => {
		onMouseUp(Component);
	};
	window.addEventListener('mouseup', Component._onMouseUp);
}