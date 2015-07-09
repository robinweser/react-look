import StateMap from './map/state';

export function addHoverListener(wrapper, el) {
	let newProps = {};
	let props = el.props;

	let existingOnMouseEnter = props.onMouseEnter;
	newProps.onMouseEnter = function (e) {
		existingOnMouseEnter && existingOnMouseEnter(e);
		StateMap.setState(wrapper.state, el, 'hovered', true);
	};

	let existingOnMouseLeave = props.onMouseLeave;
	newProps.onMouseLeave = function (e) {
		existingOnMouseLeave && existingOnMouseLeave(e);
		StateMap.setState(wrapper.state, el, 'hovered', false);
	}
	return newProps;
}


export function addActiveListener(wrapper, el) {
	let newProps = {};
	let props = el.props;
	var existingOnMouseDown = props.onMouseDown;
	newProps.onMouseDown = function (e) {
		existingOnMouseDown && existingOnMouseDown(e);
		component._lastMouseDown = Date.now();
		StateMap.setState(wrapper.state, el, 'active', true);
	}
	return newProps;
}

export function addFocusListener(wrapper, el) {
	let newProps = {};
	let props = el.props;
	var existingOnFocus = props.onFocus;
	newProps.onFocus = function (e) {
		existingOnFocus && existingOnFocus(e);
		StateMap.setState(wrapper.state, el, 'focus', true);
	};

	var existingOnBlur = props.onBlur;
	newProps.onBlur = function (e) {
		existingOnBlur && existingOnBlur(e);
		StateMap.setState(wrapper.state, el, 'focus', false)
	}
	return newProps;
}