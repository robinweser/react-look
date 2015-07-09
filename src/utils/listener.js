import StateMap from './map/state';
import assign from 'object-assign';

export function addRequiredListeners(wrapper, el, key, props) {
	if (wrapper.state._obscene.get('pseudoMap').get(el.props.look).size > 0) {
		let pseudoMap = wrapper.state._obscene.get('pseudoMap').get(el.props.look);

		if (pseudoMap.get('active')) {
			props = assign(props, addActiveListener(wrapper, el, key));
		}
		if (pseudoMap.get('hover')) {
			props = assign(props, addHoverListener(wrapper, el, key));
		}
		if (pseudoMap.get('focus') && el.type == 'input') {
			props = assign(props, addFocusListener(wrapper, el, key));
		}
	}
}
export function addHoverListener(wrapper, el, key) {
	let newProps = {};
	let props = el.props;

	let existingOnMouseEnter = props.onMouseEnter;
	newProps.onMouseEnter = function (e) {
		existingOnMouseEnter && existingOnMouseEnter(e);
		console.log('entered:', el);
		StateMap.setState(wrapper, key, 'hovered', true);
	};

	let existingOnMouseLeave = props.onMouseLeave;
	newProps.onMouseLeave = function (e) {
		console.log('left:', el);
		existingOnMouseLeave && existingOnMouseLeave(e);
		StateMap.setState(wrapper, key, 'hovered', false);
	}
	return newProps;
}


export function addActiveListener(wrapper, el, key) {
	let newProps = {};
	let props = el.props;
	var existingOnMouseDown = props.onMouseDown;
	newProps.onMouseDown = function (e) {
		existingOnMouseDown && existingOnMouseDown(e);
		component._lastMouseDown = Date.now();
		StateMap.setState(wrapper, key, 'active', true);
	}
	return newProps;
}

export function addFocusListener(wrapper, el, key) {
	let newProps = {};
	let props = el.props;
	var existingOnFocus = props.onFocus;
	newProps.onFocus = function (e) {
		existingOnFocus && existingOnFocus(e);
		StateMap.setState(wrapper, key, 'focus', true);
	};

	var existingOnBlur = props.onBlur;
	newProps.onBlur = function (e) {
		existingOnBlur && existingOnBlur(e);
		StateMap.setState(wrapper, key, 'focus', false)
	}
	return newProps;
}