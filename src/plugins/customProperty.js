import assignStyles from 'assign-styles'

const customProperty = (styles, scopeArgs, config) => {
  const {customProperties} = config

  // if no custom keys are specified at all
  if (!customProperties) {
    return styles
  }

  const customKeys = Object.keys(customProperties)

    // only iterate if there is at least one key
  if (customKeys.length <= 0) {
    return styles
  }

  Object.keys(styles).forEach(property => {
    const value = styles[property]
    let newValue

    // testing every customKey on the current property
    customKeys.forEach(customKey => {
      if (property.indexOf(customKey) > -1) {
        newValue = customProperties[customKey](property, value, customKey, scopeArgs, config)
      }
    })

    // only assign if there are new styles
    if (newValue !== undefined) {
      if (newValue instanceof Object) {
        assignStyles(styles, customProperty(newValue, scopeArgs, config))
      }
      delete styles[property]
    }
  })

  return styles
}

export {
  customProperty as default
}
