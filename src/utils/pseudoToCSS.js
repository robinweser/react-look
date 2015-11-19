import cssifyObject from './cssifyObject'
import insertRule from './globalStyleSheet'
import generateUniqueSelector from './generateUniqueSelector'

/**
 * Converts a set of pseudo class styles to a CSSRule and returns the className
 * @param {Object} styles - Style object including pseudo class specific styles
 * @param {string} pseudo - pseudo class that gets added
 * @param {Object} config - configuration object used to cssify the styles
 */
export default (styles, pseudo, config) => {
  const className = generateUniqueSelector(styles)
  if (className) {
    insertRule(`.${className}${pseudo}`, cssifyObject(styles, config))
  }
  return className
}
