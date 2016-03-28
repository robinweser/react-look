import { enhancer, Mixins as CoreMixins, Plugins as CorePlugins } from 'react-look-core'
const { mixin, statefulValue, styleLogger, statefulSelector } = CorePlugins
const { condition, contains, extend } = CoreMixins
const { equal, unEqual, greater, less, greaterThan, lessThan } = condition

// Mixins
import substr from './mixins/substr'
import empty from './mixins/empty'
import blank from './mixins/blank'
import { before, after } from './mixins/beforeAfter'
import firstLetter from './mixins/firstLetter'

// Presets
import nativePreset from './presets/react-native'

import StyleSheet from './api/StyleSheet'
import LookRoot from './api/LookRoot'

// Resolving annotations
// If not passing arguments it just wraps the Component
// Otherwise it returns a decorator
export default (...args) => {
  if (args[0] instanceof Function) {
    return enhancer(...args) // eslint-disable-line
  }

  return function decorator(target) {
    return enhancer(target, ...args) // eslint-disable-line
  }
}


const Plugins = {
  mixin,
  statefulValue,
  statefulSelector,
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
