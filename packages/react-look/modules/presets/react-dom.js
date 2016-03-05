import { Mixins, Plugins } from 'react-look-core'
const { mixin, statefulValue, statefulSelector } = Plugins
const { condition, contains, extend } = Mixins
const { equal, unEqual, greater, less, greaterThan, lessThan } = condition

import fallbackValue from '../plugins/fallbackValue'

import extractCSS from '../mixins/extractCSS'
import platformQuery from '../mixins/platformQuery'
import substr from '../mixins/substr'

import StaticPrefixer from '../prefixer/StaticPrefixer'

export default {
  prefixer: new StaticPrefixer(),
  plugins: [
    statefulValue,
    statefulSelector,
    mixin,
    fallbackValue
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
