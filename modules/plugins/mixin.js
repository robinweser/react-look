import assignStyles from 'assign-styles'

/*
 * Resolves mixins
 */
export default function mixin({ styles, resolve, config, ...pluginInterface }) {
  const mixins = config.mixins

  // if no custom keys are specified at all
  if (!mixins) {
    return styles
  }

  const mixinKeys = Object.keys(mixins)

  // only iterate if ther e is at least one key
  if (mixinKeys.length <= 0) {
    return styles
  }

  let newStyles = assignStyles({ }, styles)

  Object.keys(newStyles).forEach(property => {
    const value = newStyles[property]; // eslint-disable-line

    let newValue

    // testing every mixin on the current property
    mixinKeys.forEach(mixinKey => {
      if (property.indexOf(mixinKey) > -1) {
        const mixinInterface = {
          ...pluginInterface,
          property,
          value,
          mixinKey,
          config
        }
        newValue = mixins[mixinKey](mixinInterface)
      }
    })

    // only assign if there are new styles
    if (newValue !== undefined) {
      if (newValue instanceof Object) {
        newStyles = assignStyles(newStyles, resolve({
          ...pluginInterface,
          styles: newValue,
          resolve,
          config
        }))
      }

      delete newStyles[property]
    }
  })

  return newStyles
}
