import mixinTypes from '../../utils/mixinTypes'
import State from '../../api/State'
import {getDefaultKey} from '../../api/Config'
import {createListener} from '../../api/Listener'

/**
 * Evaluates browser states and adds event listeners if needed
 * Also adds global mouseup event to remove active elements
 */
export default [{
	key: ':active',
	type: mixinTypes.EQUAL,
	fn: (pseudo, styles, args) => {
		let {element, Component, newProps} = args
		let key = element.key || element.ref || getDefaultKey()

		//add event listener if not added yet
		newProps.onMouseDown = createListener(Component, element, key, 'onMouseDown', () => {
			State.setState('active', true, Component, key)
			Component._lastActiveElements.push(key)
		})

		//add a mouseup listener to cancel active-state
		if (!Component._onMouseUp && typeof window !== 'undefined') {
			Component._onMouseUp = () => {
				debugger;
				while (Component._lastActiveElements.length > 0) {
					let key = Component._lastActiveElements[0]
					State.setState('active', false, Component, key)
					Component._lastActiveElements.pop(key)
				}
			}
			window.addEventListener('mouseup', Component._onMouseUp)
		}

		//resolving browser State
		return State.getState('active', Component, key) ? styles : false
	}
}, {
	key: ':hover',
	type: mixinTypes.EQUAL,
	fn: (pseudo, styles, args) => {
		let {element, Component, newProps} = args
		let key = element.key || element.ref || getDefaultKey()

		//add event listener if not added yet
		newProps.onMouseEnter = createListener(Component, element, key, 'onMouseEnter', () => {
			State.setState('hover', true, Component, key)
		})
		newProps.onMouseLeave = createListener(Component, element, key, 'onMouseLeave', () => {
			State.setState('hover', false, Component, key)
		})

		//resolving browser State
		return State.getState('hover', Component, key) ? styles : false
	}
}, {
	key: ':focus',
	type: mixinTypes.EQUAL,
	fn: (pseudo, styles, args) => {
		let {element, Component, newProps} = args
		let key = element.key || element.ref || getDefaultKey()

		//add event listener if not added yet
		newProps.onFocus = createListener(Component, element, key, 'onFocus', () => {
			State.setState('focus', true, Component, key)
		})
		newProps.onBlur = createListener(Component, element, key, 'onBlur', () => {
			State.setState('focus', false, Component, key)
		})

		//resolving browser State
		return State.getState('focus', Component, key) ? styles : false
	}
}]