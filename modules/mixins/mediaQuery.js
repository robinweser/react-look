import throttle from '../utils/throttle'
import { resolvePlugins } from '../core/resolver'

// Evaluates if a media condition is fulfilled by using window.matchMedia
export default (property, styles, mixinKey, scopeArgs, config) => {
  const matchMedia = typeof window !== 'undefined' ? window.matchMedia : undefined
  const query = property.replace(mixinKey, '').trim()
  const { Component, newProps } = scopeArgs

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
    return matchMedia(query).matches ? styles : false
  }
}
