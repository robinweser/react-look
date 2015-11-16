import State from '../api/State'

/**
 * Creates an event listener to target pseudo classes
 * This only gets applied if an element acutally got action-pseudo-class-specific styles
 * @param {Component} Component - React Component that gets enhanced by Look
 * @param {Object} element - current element that gets a listener applied
 * @param {Object} key - elements unique key
 * @param {Object} event - triggered event that should be added
 * @param {Function} callback - callback function that gets called if listener event fires
 */
export default (Component, element, key, event, callback) => {
  if (!State.has(Component, key)) {
    State.add(Component, key)
  }

  const existing = element.props[event]; // eslint-disable-line

  return (target) => {
    if (existing) {
      existing(target)
    }

    callback(target)
  }
}
