// Plugins
import statefulValue from './plugins/statefulValue'
import mixin from './plugins/mixin'

// Dev tools
import styleLogger from './plugins/styleLogger'

// Conditions
import { equal, unEqual, greater, less, greaterThan, lessThan } from './mixins/condition'

// Mixins
import contains from './mixins/contains'
import substr from './mixins/substr'
import extend from './mixins/extend'

// Presets
import nativePreset from './presets/react-native'

import Enhancer from './core/enhancer'
import StyleSheet from './native/api/StyleSheet'
import LookRoot from './native/api/LookRoot'

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
  substr
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
