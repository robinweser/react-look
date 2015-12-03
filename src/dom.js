import assign from 'object-assign'
import State from './api/State'
import StyleSheet from './api/StyleSheet'
import warn from './utils/warn'

import Look from './core'
import domPreset from './presets/react-dom'

let warned = false

export default (Component, config) => {
  if (warned === false) {
    warn('Using react-look/dom is deprecated. Configure Look with the react-dom-preset instead.')
    warned = true
  }
  return Look(Component, assign({}, domPreset, config)) // eslint-disable-line new-cap
}

export {
  State,
  StyleSheet
}
