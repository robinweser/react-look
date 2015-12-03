import assign from 'object-assign'
import State from './api/State'
import StyleSheet from './api/StyleSheet'
import warn from './utils/warn'

import Look from './core'
import preconfig from './preconfig/dom'

export default (Component, config) => {
  warn('Using react-look/dom is deprecated. Configure Look with the react-dom-preset instead.')
  return Look(Component, assign({}, preconfig, config)) // eslint-disable-line new-cap
}

export {
  State,
  StyleSheet
}
