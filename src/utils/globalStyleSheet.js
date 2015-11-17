import addCSSRule from './addCSSRule'

// Initialize a global StyleSheet that gets used to add new CSSRules
const initGlobalStyleSheet = () => {
  const style = document.createElement('style')
  style.type = 'text/css'
  // Apply the CSS styles to the head
  const node = document.createTextNode('')
  style.appendChild(node)
  document.head.appendChild(style)
  return style.sheet
}

const globalStyleSheet = initGlobalStyleSheet()

/**
 * Adds the rule to the global StyleSheet
 * @param {string} selector - selector that is used as a reference
 * @param {string} rule - a valid CSSRule
 */
export default (selector, rule) => {
  addCSSRule(globalStyleSheet, selector, rule)
}
