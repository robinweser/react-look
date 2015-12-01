import throttle from '../utils/throttle'
import warn from '../utils/warn'

// Evaluates if a media condition is fulfilled by using window.matchMedia
export default (property, styles, mixinKey, {Component}) => {
  const matchMedia = typeof window !== 'undefined' ? window.matchMedia : undefined

  // Check if browser supports window.matchMedia
  if (matchMedia !== undefined) {
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

    return matchMedia(property.replace(mixinKey, '').trim()).matches ? styles : false
  }

  warn(`Failed evaluating media query: ${property}. Your environment is not able to use window.matchMedia.`)
}
