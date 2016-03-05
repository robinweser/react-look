import { enhancer, Mixins as CoreMixins, Plugins as CorePlugins } from 'react-look-core'
const { mixin, statefulValue, styleLogger, statefulSelector } = CorePlugins
const { condition, contains, extend } = CoreMixins
const { equal, unEqual, greater, less, greaterThan, lessThan } = condition

// Plugins
import fallbackValue from './plugins/fallbackValue'

// Dev tools
import linter from './plugins/linter'
import friendlyClassName from './plugins/friendlyClassName'

// Mixins
import substr from './mixins/substr'
import extractCSS from './mixins/extractCSS'
import platformQuery from './mixins/platformQuery'

// Presets
import domPreset from './presets/react-dom'

// Prefixer
import DynamicPrefixer from './prefixer/DynamicPrefixer'
import StaticPrefixer from './prefixer/StaticPrefixer'

// API
import Prefixer from './api/Prefixer'
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
  fallbackValue,
  statefulValue,
  statefulSelector,
  styleLogger,
  linter,
  friendlyClassName
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
  extractCSS,
  platformQuery,
  contains,
  substr
}

const Presets = {
  'react-dom': domPreset
}

export {
  StyleSheet,
  LookRoot,
  Prefixer,

  DynamicPrefixer,
  StaticPrefixer,

  Plugins,
  Mixins,
  Presets
}
