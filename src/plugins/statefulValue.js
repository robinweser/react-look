const statefulValue = (styles, scopeArgs, config) => {
  const {Component} = scopeArgs

  Object.keys(styles).forEach(property => {
    const value = styles[property]
    if (value instanceof Function) {
      styles[property] = value(Component.props, Component.state, Component.context)
    } else if (value instanceof Object) {
      styles[property] = statefulValue(value, scopeArgs, config)
    }
  })
  return styles
}

export {
  statefulValue as default
}
