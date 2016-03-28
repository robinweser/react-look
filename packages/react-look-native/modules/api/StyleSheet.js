import _ from 'lodash'

import renderStaticStyles from '../core/renderer'

export default {
  create(styles) {
    // flat style object without selectors
    const firstKey = styles[Object.keys(styles)[0]]
    if (!_.isPlainObject(firstKey) && !_.isFunction(firstKey)) {
      return generateScopedStyles(styles)
    }

    return Object.keys(styles).reduce((selectors, selector) => {
      selectors[selector] = generateScopedStyles(styles[selector])
      return selectors
    }, { })
  },

  combineStyles(...styles) {
    return styles.reduce((combined, single) => {
      const { _selector, ...otherStyles } = single

      if (_selector) {
        combined._selector = (combined._selector ? combined._selector : []).concat(_selector)
      }
      return _.merge(combined, otherStyles)
    }, { })
  }
}

export function generateScopedStyles(styles) {
  const selector = renderStaticStyles(styles)

  if (selector) {
    return {
      ...styles,
      _selector: [ selector ]
    }
  }
  return styles
}
