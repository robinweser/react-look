import injectValidationListener from '../../utils/injectValidationListener'

export default {
  valid: (property, styles, mixinKey, {element, Component, newProps}) => {
    // add a validation listener
    const validationState = injectValidationListener(Component, element, newProps)
    if (validationState === false || validationState === undefined) {
      return false
    }

    return validationState.valid ? styles : false
  },

  invalid: (property, styles, mixinKey, {element, Component, newProps}) => {
    // add a validation listener
    const validationState = injectValidationListener(Component, element, newProps)
    if (validationState === false || validationState === undefined) {
      return false
    }

    return validationState.valid ? false : styles
  },

  inRange: (property, styles, mixinKey, {element, Component, newProps}) => {
    // add a validation listener
    const validationState = injectValidationListener(Component, element, newProps)
    if (validationState === false || validationState === undefined) {
      return false
    }

    return !validationState.rangeOverflow && !validationState.rangeUnderflow ? styles : false
  },

  outOfRange: (property, styles, mixinKey, {element, Component, newProps}) => {
    // add a validation listener
    const validationState = injectValidationListener(Component, element, newProps)
    if (validationState === false || validationState === undefined) {
      return false
    }
    return validationState.rangeOverflow || validationState.rangeUnderflow ? styles : false
  }
}
