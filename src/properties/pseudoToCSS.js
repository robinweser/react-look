import pseudoToCSS from '../utils/pseudoToCSS'
import extractCSS from './extractCSS'

export default (property, styles, customKey, scopeArgs, config) => {
  extractCSS(property, pseudoToCSS(styles, customKey, config), customKey, scopeArgs)
  return true
}
