import pseudoToCSS from '../../utils/pseudoToCSS'
import extractCSS from '../extractCSS'

// Evaluates if an element is empty / got no children at all
export default (property, styles, customKey, scopeArgs, config) => {
  const {newProps, element} = scopeArgs
  if (element.type === 'input' && newProps.placeholder !== undefined) {
    extractCSS(property, pseudoToCSS(styles, customKey, config.unit), customKey, scopeArgs)
  }
}
