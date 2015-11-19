import assign from 'object-assign'
import State from './api/State'
import {create} from './api/StyleSheet'

import Look from './core'
import preconfig from './preconfig/native'

export default (Component, config) => {
  return Look(Component, assign({}, preconfig, config)) // eslint-disable-line new-cap
}

const StyleSheet = {
  create: create
}

export {
  State,
  StyleSheet
}
