// Plugins
import prefixer from './plugins/prefixer'
import staticPrefixer from './plugins/staticPrefixer'
import fallbackValue from './plugins/fallbackValue'
import statefulValue from '../../common/plugins/statefulValue'
import statefulSelector from './plugins/statefulSelector'
import mixin from '../../common/plugins/mixin'

// Dev tools
import styleLogger from '../../common/plugins/styleLogger'
import linter from './plugins/linter'
import friendlyClassName from './plugins/friendlyClassName'

// Mixins
import { equal, unEqual, greater, less, greaterThan, lessThan } from '../../common/mixins/condition'
import contains from '../../common/mixins/contains'
import extend from '../../common/mixins/extend'
import substr from './mixins/substr'
import extractCSS from './mixins/extractCSS'
import platformQuery from './mixins/platformQuery'

// Presets
import domPreset from './presets/react-dom'

import Enhancer from '../../common/core/enhancer'
import StyleSheet from './api/StyleSheet'
import LookRoot from './api/LookRoot'

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
