import { Mixins, Plugins } from 'react-look-core'
const { mixin, statefulValue, statefulSelector } = Plugins
const { condition, contains, extend } = Mixins
const { equal, unEqual, greater, less, greaterThan, lessThan } = condition

import staticPrefixer from '../plugins/staticPrefixer'
import fallbackValue from '../plugins/fallbackValue'

import extractCSS from '../mixins/extractCSS'
import platformQuery from '../mixins/platformQuery'
import substr from '../mixins/substr'

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
