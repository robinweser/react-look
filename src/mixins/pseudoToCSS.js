import pseudoToCSS from '../utils/pseudoToCSS'
import extractCSS from './extractCSS'

// Converts pseudo class styles to a global CSSRule and returns the className
export default (property, styles, mixinKey, scopeArgs, config) => {
  extractCSS(property, pseudoToCSS(styles, mixinKey, config), mixinKey, scopeArgs)
  return true
}
