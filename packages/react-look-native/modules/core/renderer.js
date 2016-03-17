import _ from 'lodash'

import StyleContainer from '../api/StyleContainer'

/**
 * Extracts all possible dynamic styles out of a style object
 * @param {Object} styles - pure style object which gets parsed
 */
export function extractDynamicStyles(styles) {
  // early return stateful selectors
  if (_.isFunction(styles)) {
    return { _statefulSelector: styles }
  }

  return Object.keys(styles).reduce((dynamic, property) => {
    const value = styles[property]; // eslint-disable-line
    // plain objects, functions and booleans are considered
    // dynamic styles which get extracted
    if (!_.isString(value) && !_.isNumber(value)) {
      dynamic[property] = value
      delete styles[property]
    }
    return dynamic; // eslint-disable-line
  }, { })
}

/**
 * Renders static styles to the CSS StyleContainer
 * and directly scopes them to the Component
 * @param {Object} styles - static styles to be rendered
 * @param {string} scope - scope selector
 * @param {string} selector - base selector used as className
 */
export default function renderStaticStyles(styles) {
  // Extracts dynamic parts remaining only static styles
  const dynamicStyles = extractDynamicStyles(styles)

  // Also add the dynamic styles if they exist
  if (!_.isEmpty(dynamicStyles)) {
    // Generate a unique selector
    const selector = StyleContainer.requestSelector()
    StyleContainer.add(selector, styles)
    StyleContainer._addDynamic(selector, dynamicStyles)
    return selector
  }
}
