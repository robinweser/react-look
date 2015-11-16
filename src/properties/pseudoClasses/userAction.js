import State from '../../api/State'
import createListener from '../../utils/createListener'

const defaultKey = 'root'

/**
 * Evaluates browser states and adds event listeners if needed
 * Also adds global mouseup event to remove active elements
 */
const active = (property, styles, customKey, {element, Component, newProps}) => {
  const key = element.key || element.ref || defaultKey

  if (!Component._lastActiveElements) {
    Component._lastActiveElements = []
  }

  // add event listener if not added yet
  newProps.onMouseDown = createListener(Component, element, key, 'onMouseDown', () => {
    State.setState('active', true, Component, key)
    Component._lastActiveElements.push(key)
  })

  // add a mouseup listener to cancel active-state
  if (!Component._onMouseUp && typeof window !== 'undefined') {
    Component._onMouseUp = () => {
      while (Component._lastActiveElements.length > 0) {
        const elementKey = Component._lastActiveElements[0]; // eslint-disable-line semi

        State.setState('active', false, Component, elementKey)
        Component._lastActiveElements.pop(elementKey)
      }
    }
    window.addEventListener('mouseup', Component._onMouseUp)
  }
  // resolving browser State
  return State.getState('active', Component, key) ? styles : false
}


const hover = (property, styles, customKey, {element, Component, newProps}) => {
  const key = element.key || element.ref || defaultKey

  // add event listener if not added yet
  newProps.onMouseEnter = createListener(Component, element, key, 'onMouseEnter', () => {
    State.setState('hover', true, Component, key)
  })
  newProps.onMouseLeave = createListener(Component, element, key, 'onMouseLeave', () => {
    State.setState('hover', false, Component, key)
  })
  // resolving browser State
  return State.getState('hover', Component, key) ? styles : false
}


const focus = (property, styles, customKey, {element, Component, newProps}) => {
  const key = element.key || element.ref || defaultKey

  // only apply focus on input elements
  if (element.type !== 'input') {
    return false
  }

  // add event listener if not added yet
  newProps.onFocus = createListener(Component, element, key, 'onFocus', () => {
    State.setState('focus', true, Component, key)
  })
  newProps.onBlur = createListener(Component, element, key, 'onBlur', () => {
    State.setState('focus', false, Component, key)
  })
  // resolving browser State
  return State.getState('focus', Component, key) ? styles : false
}

export default {active, focus, hover}
