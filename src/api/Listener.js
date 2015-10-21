import State from './State'

let keyElementMap = new Map()

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

  // This checks if there are any needed pseudo classes 
  // that need an event listener by checking the pseudo map for this element
  if (!State.has(Component, key)) {
    State.add(Component, key)
    keyElementMap.set(key, element)
  } else {
    if (keyElementMap.get(key) !== element) {
      console.warn('There is a state associated with element.key="' + key + '". Use unqiue `key` or `ref` while using :hover, :focus or :active on multiple elements.')
      console.warn('Look will not add state-listeners to', element)
      return element.props
    }
  }

  let existing = element.props[event];

  return (e) => {
    existing && existing(e)
    callback()
  }
}