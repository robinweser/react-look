// Plugins
import mixin from '../../../common/plugins/mixin'
import statefulValue from '../../../common/plugins/statefulValue'
import statefulSelector from '../plugins/statefulSelector'
import staticPrefixer from '../plugins/staticPrefixer'
import fallbackValue from '../plugins/fallbackValue'

// CSS extraction
import extractCSS from '../mixins/extractCSS'
import platformQuery from '../mixins/platformQuery'

// Conditions
import { equal, unEqual, greater, less, greaterThan, lessThan } from '../../../common/mixins/condition'

// Other
import contains from '../../../common/mixins/contains'
import substr from '../mixins/substr'
import extend from '../../../common/mixins/extend'

export default {
  plugins: [
    statefulValue,
    statefulSelector,
    mixin,
    fallbackValue,
    staticPrefixer
  ],
  mixins: {
    // Conditions
    // NOTE: Condition order matters
    '>=': greaterThan,
    '<=': lessThan,
    '!=': unEqual,
    '>': greater,
    '<': less,
    '=': equal,

    // Other
    extend: extend,
    contains: contains,
    substr: substr,

    // CSS extraction
    css: extractCSS,

    // Queries
    '@platform': platformQuery
  }
}
