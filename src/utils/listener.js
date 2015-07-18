import State from '../map/state';
import assign from 'object-assign';

const events = {
	'active': {
		onMouseDown: true
	},
	'hover': {
		mouseEnter: true,
		mouseLeave: false
	},
	'focus': {
		onFocus: true,
		onBlur: false
	}
};

/**
 * Adds additional event listeners to target some special pseudo-classes
 * Only get applied if actually needed
 * NOTE: This has been heavily copied from Radium. Great thanks for providing this nice stuff.
 * @param {Component} container - React Component that gets enhanced by Look
 * @param {Object} element - current element that gets a listener applied
 * @param {string} key - Unique key to identify each element with special event listeners
 * @param {Object} newProps - Props object that gets the listeners added
 */
export default function addRequiredEventListeners(container, element, key, newProps) {
	/**
	 * This checks if there are any needed pseudo-classes that need an event listener by checking the pseudo map for this element
	 */
	if (container._pseudoMap.get(element.props.look).size > 0) {
		let pseudo = container._pseudoMap.get(element.props.look);

		let event;
		for (event in events) {
			if (pseudo.get(event)) {
				newProps = assign(newProps, addEventListener(container, element.props, key, event, events[event]));
			}
		}

		//deprecated
		let validTypes = ['url', 'email', 'tel', 'range', 'number'];
		if (pseudo.get('change') && element.type == 'input' && validTypes.indexOf(newProps.type) != -1) {
			newProps = assign(newProps, addChangeListener(container, element, key));
		}
	}
}


/**
 * Adds an event listener to target pseudo-classes
 * This only gets applied if an element acutally got action-pseudo-class-specific styles
 * @param {Component} container - React Component that gets enhanced by Look
 * @param {Object} props - current elements properties
 * @param {string} key - Unique key to identify each element with special event listeners
 * @param {string} state - event type you want listeners for: active, focus, change
 */
function addEventListener(container, props, key, state, listener) {
	let newProps = props;

	let event;
	for (event in listener) {
		let existing = newProps[event];
		newProps[event] = e => {
			existing && existing(e);
			State.setState(state, listener[event], container, key)
		}
	}
	if (state == 'active') {
		if (!container._onMouseUp) {
			addMouseUpListener(container);
		}
		container._lastActive.push(key);
	}
	return newProps;
}

/**
 * Removes all active styles applied to elements by mouse down before
 * @param {Component} container - React Component that gets enhanced by Look
 */
function onMouseUp(container) {
	if (container._lastActive.length > 0) {
		this._lastActive.forEach(key => {
			if (State.has(container, key)) {
				State.setState('active', false, container, key);
			}
		})
		this._lastActive.length = 0;
	}
}
}

/**
 * Adds a mosue up listener to delete :active styles
 * @param {Component} container - React Component that gets enhanced by Look
 */
function addMouseUpListener(container) {
	container._onMouseUp = onMouseUp(container).bind(this);
	let mouseUpListener = window.addEventListener('mouseup', container._onMouseUp);
}

/**
 * Adds a change listener to validate :valid and :invalid pseudo-classes
 * Only gets applied if the current element is an input elementement.
 * Also it needs to be of type: url, telement, email or range, number
 * @param {Component} container - React Component that gets enhanced by Look
 * @param {Object} element - current element that gets a listener applied
 * @param {string} key - Unique key to identify each element with special event listeners
 */
function addChangeListener(container, element, key) {
	let newProps = element.props;
	let existingOnChange = newProps.onChange;

	newProps.onChange = function (e) {
		existingOnChange && existingOnChange(e);
		State.setState('change', e.target.value, container, key);
	};
	return newProps;
}