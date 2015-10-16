const statefulValue = (styles, scopeArgs, config) => {
	const {Component} = scopeArgs

  Object.keys(styles).forEach(property => {
    const value = styles[property]
    if (value instanceof Function) {
      styles[property] = value(Component.props, Component.state)
    } else if (value instanceof Object) {
      styles[property] = statefulValue(value, config, scopeArgs)
    }
  })
  return styles
}

export {
	statefulValue as default
}
