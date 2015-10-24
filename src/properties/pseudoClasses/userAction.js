import State from '../../api/State'
import createListener from '../../api/Listener'

const defaultKey = 'root'

// See: https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

// See: https://gist.github.com/jpillora/7885636
const urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i // eslint-disable-line

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


const valid = (property, styles, customKey, {element, Component, newProps}) => {
  const key = element.key || element.ref || defaultKey

  // add event listener if not added yet
  newProps.onKeyUp = createListener(Component, element, key, 'onKeyUp', () => {
    const { [element.ref]: input } = Component.refs

    if ( !input ) {
      // TEMP: What to actually do here? We need a ref to get the input value
      console.error('You need to specify a `ref` attribute to use `:valid` pseudo selector.')
      return
    }

    let isValid = true

    if ( input.required && !input.value ) {
      isValid = false
    }

    if ( input.pattern && !new RegExp(input.pattern).test(input.value) ) {
      isValid = false
    }

    if ( input.type === 'email' && !input.multiple && !emailRegex.test(input.value) ) {
      isValid = false
    }

    if ( input.type === 'email' && input.multiple ) {
      (input.value || '').split(',').forEach(email => {
        if ( !emailRegex.test(email) ) {
          isValid = false
        }
      })
    }

    if ( input.type === 'url' && !urlRegex.test(input.value) ) {
      isValid = false
    }

    State.setState('valid', isValid, Component, key)
  })
  // resolving browser State
  return State.getState('valid', Component, key) ? styles : false
}

export default {active, focus, hover, valid}
