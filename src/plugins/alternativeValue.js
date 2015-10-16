const alternativeValue = (styles, config, scopeArgs) => {
  Object.keys(styles).forEach(property => {
    let value = styles[property]
    if (value instanceof Array) {
      styles[property] = value.join(';' + camelToDashCase(property) + ':')
    } else if (value instanceof Object) {
      styles[property] = alternativeValue(value, config, scopeArgs)
    }
  })
  return styles
}

export { alternativeValue as default }
const camelToDashCase = (str) => {
  return str.replace(/([a-z]|^)([A-Z])/g, (match, p1, p2) => p1 + '-' + p2.toLowerCase())
}
