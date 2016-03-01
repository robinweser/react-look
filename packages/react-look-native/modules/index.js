// Plugins
import mixin from '../../common/modules/plugins/mixin'
import statefulValue from '../../common/modules/plugins/statefulValue'
import statefulSelector from './plugins/statefulSelector'

// Dev tools
import styleLogger from '../../common/modules/plugins/styleLogger'

// Mixins
import { equal, unEqual, greater, less, greaterThan, lessThan } from '../../common/modules/mixins/condition'
import contains from '../../common/modules/mixins/contains'
import extend from '../../common/modules/mixins/extend'
import substr from './mixins/substr'
import empty from './mixins/empty'
import blank from './mixins/blank'
import { before, after } from './mixins/beforeAfter'
import firstLetter from './mixins/firstLetter'

// Presets
import nativePreset from './presets/react-native'

import Enhancer from '../../common/modules/core/enhancer'
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
