import State from './api/State'
import StyleSheet from './api/StyleSheet'

import Look from './core'
import config from './preconfig/dom'

export default (...args) => {
  return Look(...args, config) // eslint-disable-line new-cap
}

export {
  State,
  StyleSheet
}
