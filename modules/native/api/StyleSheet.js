import _ from 'lodash'

export default {
  create(styles) {
    // Open for optimizations afterwards
    // Could also extend react-native's validation check
    return styles
  },

  combineStyles(...styles) {
    // Deep assign all styles
    return _.merge(...styles)
  }
}
