import assignStyles from 'assign-styles'

/*
 * Resolves mixins
 */
export default function mixin(letStyles, scopeArgs, config) {
  let styles = assignStyles({ }, letStyles)
  const { mixins } = config

  // if no custom keys are specified at all
  if (!mixins) {
    return styles
  }

  const mixinKeys = Object.keys(mixins)

  // only iterate if ther e is at least one key
  if (mixinKeys.length <= 0) {
    return styles
  }

  Object.keys(styles).forEach(property => {
    const value = styles[property]; // eslint-disable-line

    let newValue

    // testing every mixin on the current property
    mixinKeys.forEach(mixinKey => {
      if (property.indexOf(mixinKey) > -1) {
        newValue = mixins[mixinKey](property, value, mixinKey, scopeArgs, config)
      }
    })

    // only assign if there are new styles
    if (newValue !== undefined) {
      if (newValue instanceof Object) {
        styles = assignStyles(styles, mixin(newValue, scopeArgs, config))
      }

      delete styles[property]
    }
  })

  return styles
}
