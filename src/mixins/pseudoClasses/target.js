// Evaluates if an <a>-tag's id matches fragment identifier of the URI of the document
export default (property, styles, mixinKey, {Component, element}) => {
  if (element.id !== undefined) {
    if (!Component._locationHrefListener) {
      Component._locationHrefListener = () => {
        Component.forceUpdate()
      }

      // Add a global hashchange listener
      const existingDidMount = Component.componentDidMount
      Component.componentDidMount = () => {
        if (existingDidMount) {
          existingDidMount()
        }
        window.addEventListener('hashchange', Component._locationHrefListener)
      }

      // Remove the listener if the component unmounts to keep things clean
      const existingWillUnmount = Component.componentWillUnmount
      Component.componentWillUnmount = () => {
        if (existingWillUnmount) {
          existingWillUnmount()
        }

        window.removeEventListener('hashchange', Component._locationHrefListener)
      }
    }


    const fragment = location.href.split('#')[1]
    if (element.id === fragment) {
      return styles
    }
  }

  return false
}
