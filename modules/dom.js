// Plugins
import prefixer from './plugins/dom/prefixer'
import staticPrefixer from './plugins/dom/staticPrefixer'
import fallbackValue from './plugins/dom/fallbackValue'
import statefulValue from './plugins/statefulValue'
import statefulSelector from './plugins/dom/statefulSelector'
import mixin from './plugins/mixin'

// Dev tools
import styleLogger from './plugins/styleLogger'
import linter from './plugins/dom/linter'
import friendlyClassName from './plugins/dom/friendlyClassName'

// Mixins
import { equal, unEqual, greater, less, greaterThan, lessThan } from './mixins/condition'
import contains from './mixins/contains'
import extend from './mixins/extend'
import substr from './mixins/dom/substr'
import extractCSS from './mixins/dom/extractCSS'
import platformQuery from './mixins/dom/platformQuery'

// Presets
import domPreset from './presets/react-dom'

import Enhancer from './core/enhancer'
import StyleSheet from './api/dom/StyleSheet'
import LookRoot from './api/dom/LookRoot'

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
  statefulSelector,
  prefixer,
  staticPrefixer,
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
