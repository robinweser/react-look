export default function extractDynamicStyles(styles, parent) {
  return Object.keys(styles).reduce((dynamic, property) => {
    const value = styles[property]
    if (typeof value === 'object' && !Array.isArray(value)) {
      const innerDynamic = extractDynamicStyles(value, property)

      if (Object.keys(innerDynamic).length < 1) {
        delete styles[property]
      } else {
        dynamic[property] = innerDynamic
      }
    }

    if (typeof value === 'function') {
      dynamic[property] = value
      delete styles[property]
    }

    return dynamic
    }, { })
  }
