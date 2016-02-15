// Plugins
import fallbackValue from './plugins/fallbackValue'
import statefulValue from './plugins/statefulValue'
import mixin from './plugins/mixin'
import prefixer from './plugins/prefixer'

// Dev tools
import linter from './plugins/linter'
import styleLogger from './plugins/styleLogger'
import friendlyClassName from './plugins/friendlyClassName'

// Conditions
import { equal, unEqual, greater, less, greaterThan, lessThan } from './mixins/condition'

// Mixins
import contains from './mixins/contains'
import substr from './mixins/substr'
import extractCSS from './mixins/extractCSS'
import extend from './mixins/extend'
import platformQuery from './mixins/platformQuery'

// Presets
import domPreset from './presets/react-dom'

import Enhancer from './core/enhancer'
import StyleSheet from './dom/api/StyleSheet'
import LookRoot from './dom/api/LookRoot'

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
  fallbackValue,
  statefulValue,
  prefixer,
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

  Plugins,
  Mixins,
  Presets
}
