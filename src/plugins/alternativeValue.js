import camelToDashCase from '../utils/camelToDashCase'

const alternativeValue = (styles, scopeArgs, config) => {
  Object.keys(styles).forEach(property => {
    const value = styles[property]
    if (value instanceof Array) {
      styles[property] = value.join(';' + camelToDashCase(property) + ':')
    } else if (value instanceof Object) {
      styles[property] = alternativeValue(value, config, scopeArgs)
    }
  })
  return styles
}

export { alternativeValue as default }
