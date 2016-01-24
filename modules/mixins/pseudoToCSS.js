import StyleContainer from '../utils/StyleContainer'
import generateClassName from '../utils/generateClassName'
import extractCSS from './extractCSS'

// Converts pseudo class styles to a global CSSRule and returns the className
export default (property, styles, mixinKey, scopeArgs) => {
  const className = generateClassName(styles)
  StyleContainer.add('.' + className + mixinKey, styles)

  extractCSS(property, className, mixinKey, scopeArgs)
  return true
}
