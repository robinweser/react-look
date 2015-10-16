import assignStyles from 'assign-styles'

const customProperty = (styles, config, scopeArgs) => {
  let keys = config.keys
  if (!keys) {
    return styles
  }

  let customKeys = Object.keys(keys)
  if (customKeys.length <= 0) {
    return styles
  }

  Object.keys(styles).forEach(property => {
    let value = styles[property]
    let newValue

    customKeys.forEach(key => {
      if (property.indexOf(key) > -1) {
        newValue = keys[key](property, value, key, config, scopeArgs)
      }
    })
    if (newValue && newValue instanceof Object) {
      assignStyles(styles, customProperty(newValue, config, scopeArgs))
      delete styles[property]
    }
  })

  return styles
}

export {
  customProperty as default
}