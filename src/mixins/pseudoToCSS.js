import GlobalStyleSheet from './GlobalStyleSheet'
import extractCSS from './extractCSS'

// Converts pseudo class styles to a global CSSRule and returns the className
export default (property, styles, mixinKey, scopeArgs, {userAgent}) => {
  extractCSS(property, GlobalStyleSheet.insertStyles(styles, mixinKey, undefined, userAgent), mixinKey, scopeArgs)
  return true
}
