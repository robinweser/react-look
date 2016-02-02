// Plugins
import fallbackValue from './plugins/fallbackValue'
import statefulValue from './plugins/statefulValue'
import mixin from './plugins/mixin'
import prefixer from './plugins/prefixer'

// Dev tools
import linter from './devTools/linter'
import styleLogger from './devTools/styleLogger'

// Conditions
import { equal, unEqual, greater, less, greaterThan, lessThan } from './mixins/condition'

// Mixins
import contains from './mixins/contains'
import substr from './mixins/substr'
import extractCSS from './mixins/extractCSS'
import extend from './mixins/extend'
import platformQuery from './mixins/platformQuery'

// Presets
import nativePreset from './presets/react-native'
import domPreset from './presets/react-dom'

export default {
  Plugins: {
    mixin,
    fallbackValue,
    statefulValue,
    prefixer
  },
  DevTools: {
    styleLogger,
    linter
  },
  Mixins: {
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
  },
  Presets: {
    'react-native': nativePreset,
    'react-dom': domPreset
  }
}
