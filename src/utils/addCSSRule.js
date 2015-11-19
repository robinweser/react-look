const CSSRules = new Set()

/**
 * Adds a rule to the global StyleSheet
 * This is used to support older browsers using the non-standard 'addRule'-method
 * @param {CSSStyleSheet} sheet - StyleSheet that gets new CSSRules applied
 * @param {string} selector - selector that is used as a reference
 * @param {string} rule - a valid CSSRule
 */
export default (sheet, selector, rule) => {
  // prevent adding the same rule multiple times
  if (CSSRules.has(selector)) {
    return false
  }
  if (typeof sheet.insertRule === 'function') {
    sheet.insertRule(selector + '{' + rule + '}', sheet.cssRules.length)
  } else if (typeof sheet.addRule === 'function') {
    sheet.addRule(selector, rule, sheet.cssRules.length)
  }
  CSSRules.add(selector)
}
