import assignStyles from 'assign-styles'

const customProperty = (styles, config, scopeArgs) => {
  let {keys} = config
  
  //if no custom keys are specified at all
  if (!keys) {
    return styles
  }
  
  let customKeys = Object.keys(keys)
  
    //only iterate if there is at least one key
  if (customKeys.length <= 0) {
    return styles
  }

  Object.keys(styles).forEach(property => {
    let value = styles[property]
    let newValue

    // testing every customKey on the current property
    customKeys.forEach(customKey => {
      if (property.indexOf(customKey) > -1) {
        newValue = keys[customKey](property, value, customKey, scopeArgs, config)
      }
    })
    
    //only assign if there are new styles
    if (newValue !== undefined) {
      if (newValue instanceof Object) {
      assignStyles(styles, customProperty(newValue, config, scopeArgs))
      }
      delete styles[property]
    }
  })

  return styles
}

export {
  customProperty as default
}