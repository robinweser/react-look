import throttle from '../utils/throttle'
import { processStyles } from '../core/resolver'
import extractCSS from './extractCSS'
import GlobalStyleSheet from '../utils/GlobalStyleSheet'
import cssifyObject from '../utils/cssifyObject'
import generateClassName from '../utils/generateClassName'

const CSSMediaQueries = new Map()

// Evaluates if a media condition is fulfilled by using window.matchMedia
export default (property, styles, mixinKey, scopeArgs, config) => {
  const matchMedia = typeof window !== 'undefined' ? window.matchMedia : undefined
  const query = property.replace(mixinKey, '').trim()
  const {Component, newProps} = scopeArgs

  if (!Component._mediaQueryListener) {
    Component._mediaQueryListener = throttle(() => {
      Component.forceUpdate()
    }, 250)

    // Add a global resize listener to rerender media queries
    const existingDidMount = Component.componentDidMount
    Component.componentDidMount = () => {
      if (existingDidMount) {
        existingDidMount()
      }
      window.addEventListener('resize', Component._mediaQueryListener)
    }

    // Remove the listener if the component unmounts to keep things clean
    const existingWillUnmount = Component.componentWillUnmount
    Component.componentWillUnmount = () => {
      if (existingWillUnmount) {
        existingWillUnmount()
      }
      window.removeEventListener('resize', Component._mediaQueryListener)
    }
  }

  // Check if browser supports window.matchMedia
  if (matchMedia !== undefined) {
    // Remove polyfilled CSS rules if matchMedia gets available
    if (CSSMediaQueries.size > 0) {
      CSSMediaQueries.forEach((selectors, media) => selectors.forEach((styles, selector) => GlobalStyleSheet.removeMediaQuery(media, selector)))
    }
    return matchMedia(query).matches ? styles : false
  }

  // If no window.matchMedia was found Look transforms
  // media queries to CSS and injects it while rendering
  const resolvedStyles = processStyles(styles, newProps, scopeArgs, config)

  const className = generateClassName(resolvedStyles)
  GlobalStyleSheet.addMediaQuery(query, '.' + className, resolvedStyles)

  if (!CSSMediaQueries.has(query)) {
    CSSMediaQueries.set(query, new Set())
  }
  CSSMediaQueries.get(query).add('.' + className)

  extractCSS(property, className, mixinKey, scopeArgs)
  return true
}
