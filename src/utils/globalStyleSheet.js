import addCSSRule from './addCSSRule'
import warn from './warn'

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

let globalStyleSheet = typeof document != 'undefined' ? initGlobalStyleSheet() : undefined

/**
 * Adds the rule to the global StyleSheet
 * @param {string} selector - selector that is used as a reference
 * @param {string} rule - a valid CSSRule
 */
export default (selector, rule, customStyleElement) => {
  if (customStyleElement) {
    globalStyleSheet = customStyleElement.sheet
  }

  if (globalStyleSheet !== undefined) {
    addCSSRule(globalStyleSheet, selector, rule)
  } else {
    warn('Adding styles to the global StyleSheet was not possible. No StyleSheet has been found.', 'Rendering on server? Pass a <style>-DOMElement within the configuration.')
  }
}
