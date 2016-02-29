// Plugins
import mixin from '../plugins/mixin'
import statefulValue from '../plugins/statefulValue'
import staticPrefixer from '../plugins/dom/staticPrefixer'
import fallbackValue from '../plugins/dom/fallbackValue'

// CSS extraction
import extractCSS from '../mixins/dom/extractCSS'
import platformQuery from '../mixins/dom/platformQuery'

// Conditions
import { equal, unEqual, greater, less, greaterThan, lessThan } from '../mixins/condition'

// Other
import contains from '../mixins/contains'
import substr from '../mixins/dom/substr'
import extend from '../mixins/extend'

export default {
  plugins: [
    statefulValue,
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
