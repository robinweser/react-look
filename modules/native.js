// Plugins
import statefulValue from './plugins/statefulValue'
import mixin from './plugins/mixin'

// Dev tools
import styleLogger from './plugins/styleLogger'

// Mixins
import { equal, unEqual, greater, less, greaterThan, lessThan } from './mixins/condition'
import contains from './mixins/contains'
import extend from './mixins/extend'
import substr from './mixins/native/substr'
import empty from './mixins/native/empty'
import blank from './mixins/native/blank'
import { before, after } from './mixins/native/beforeAfter'
import firstLetter from './mixins/native/firstLetter'

// Presets
import nativePreset from './presets/react-native'

import Enhancer from './core/enhancer'
import StyleSheet from './api/native/StyleSheet'
import LookRoot from './api/native/LookRoot'

// Resolving annotations
// If not passing arguments it just wraps the Component
// Otherwise it returns a decorator
export default (...args) => {
  if (args[0] instanceof Function) {
    return Enhancer(...args) // eslint-disable-line
  }

  return function decorator(target) {
    return Enhancer(target, ...args) // eslint-disable-line
  }
}


const Plugins = {
  mixin,
  statefulValue,
  styleLogger
}

const Mixins = {
  // Conditions
  greaterThan,
  lessThan,
  unEqual,
  greater,
  less,
  equal,

  // Other
  extend,
  contains,
  substr,
  blank,
  empty,
  before,
  after,
  firstLetter
}

const Presets = {
  'react-native': nativePreset
}

export {
  StyleSheet,
  LookRoot,

  Plugins,
  Mixins,
  Presets
}
