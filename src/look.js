import assign from 'object-assign'
import State from './api/State'
import StyleSheet from './api/StyleSheet'

import Look from './core'
import preconfig from './preconfig/native'

export default (Component, config) => {
  return Look(Component, assign({}, preconfig, config)) // eslint-disable-line new-cap
}

export {
  State,
  StyleSheet
}
