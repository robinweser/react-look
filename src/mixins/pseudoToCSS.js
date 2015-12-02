import GlobalStyleSheet from './GlobalStyleSheet'
import extractCSS from './extractCSS'

// Converts pseudo class styles to a global CSSRule and returns the className
export default (property, styles, mixinKey, scopeArgs, {userAgent}) => {
  const className = GlobalStyleSheet.insertStyles(styles, mixinKey, undefined, userAgent)

  extractCSS(property, className, mixinKey, scopeArgs)
  return true
}
