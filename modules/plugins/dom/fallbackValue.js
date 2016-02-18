import camelToDashCase from '../../utils/camelToDashCase'
import assignStyles from 'assign-styles'
import _ from 'lodash'

/**
 * Resolves alternative values provided as an Array
 */
export default function fallbackValue({ styles, resolve, ...pluginInterface }) {
  Object.keys(styles).forEach(property => {
    const value = styles[property]
    if (_.isArray(value)) {
      styles[property] = value.join(';' + camelToDashCase(property) + ':')
    } else if (_.isPlainObject(value)) {
      styles[property] = resolve({
        ...pluginInterface,
        styles: assignStyles({ }, value),
        resolve
      })
    }
  })

  return styles
}
