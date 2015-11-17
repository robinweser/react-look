import pseudoToCSS from '../utils/pseudoToCSS'
import extractCSS from './extractCSS'

// Converts pseudo class styles to a global CSSRule and returns the className
export default (property, styles, customKey, scopeArgs, config) => {
  extractCSS(property, pseudoToCSS(styles, customKey, config), customKey, scopeArgs)
  return true
}
