import State from '../map/state';
import assign from 'object-assign';

/*
 * Adds additional event listeners to target some special pseudo-classes
 * Only get applied if actually needed
 * NOTE: This has been heavily copied from Radium. Great thanks for providing this nice stuff.
 */
export function addRequiredListeners(wrapper, el, key, props) {
	if (State.get(wrapper, 'pseudoMap').get(el.props.look).size > 0) {
		let pseudoMap = State.get(wrapper, 'pseudoMap').get(el.props.look);

		if (pseudoMap.get('active')) {
			props = assign(props, addActiveListener(wrapper, el, key));
		}

		if (pseudoMap.get('hover')) {
			props = assign(props, addHoverListener(wrapper, el, key));
		}

		if (pseudoMap.get('focus') && el.type == 'input') {
			props = assign(props, addFocusListener(wrapper, el, key));
		}

		//TODO: iterate array to check type for more readability
		if (pseudoMap.get('change') && el.type == 'input' && props.type == 'url' || props.type == 'range' ||  props.type == 'number' ||  props.type == 'tel' || props.type == 'email') {
			props = assign(props, addChangeListener(wrapper, el, key));
		}
	}
}

/*
 * Adds a mouse-hover listener to target :hover pseudo-classes
 * This only gets applied if an el acutally got :hover-specific styles
 */
export function addHoverListener(wrapper, el, key) {
	let newProps = {};
	let props = el.props;

	let existingOnMouseEnter = props.onMouseEnter;
	newProps.onMouseEnter = function (e) {
		existingOnMouseEnter && existingOnMouseEnter(e);
		//console.log('entered:', el);
		State.setState('hovered', true, wrapper, key);
	};

	let existingOnMouseLeave = props.onMouseLeave;
	newProps.onMouseLeave = function (e) {
		//console.log('left:', el);
		existingOnMouseLeave && existingOnMouseLeave(e);
		State.setState('hovered', false, wrapper, key);
	}
	return newProps;
}



/*
 * Adds a mouse-down listener to target :active pseudo-classes
 * This only gets applied if an el acutally got :active-specific styles
 */
export function addActiveListener(wrapper, el, key) {
	let newProps = {};
	let props = el.props;
	var existingOnMouseDown = props.onMouseDown;
	newProps.onMouseDown = function (e) {
		existingOnMouseDown && existingOnMouseDown(e);
		wrapper._lastActive.push(key);
		//console.log('activated:', el);
		State.setState('active', true, wrapper, key);
	}
	return newProps;
}


/*
 * Adds a input-focus listener to target :focus pseudo-classes
 * This only gets applied if an el acutally got :focus-specific styles
 * Also el's type needs to be input
 */
export function addFocusListener(wrapper, el, key) {
	let newProps = {};
	let props = el.props;
	var existingOnFocus = props.onFocus;
	newProps.onFocus = function (e) {
		existingOnFocus && existingOnFocus(e);
		//console.log('focused: ', el);
		State.setState('focused', true, wrapper, key);
	};

	var existingOnBlur = props.onBlur;
	newProps.onBlur = function (e) {
		existingOnBlur && existingOnBlur(e);
		//console.log('lost focus: ', el);
		State.setState('focused', false, wrapper, key)
	}
	return newProps;
}

/*
 * Adds a change listener to validate :valid and :invalid pseudo-classes
 * Only gets applied if the current el is an input element.
 * Also it needs to be of type: url, tel, email or range, number
 * TODO: Add a new pseudoMap entry called validation to target needed listeners more accurate
 */
export function addChangeListener(wrapper, el, key) {
	let newProps = {};
	let props = el.props;
	var existingOnChange = props.onChange;
	newProps.onChange = function (e) {
		existingOnChange && existingOnChange(e);
		//console.log('changed: ', el);
		State.setState('changed', e.target.value, wrapper, key);
	};
	return newProps;
}