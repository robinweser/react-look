import { Mixins, Plugins } from 'react-look-core'
const { mixin, statefulValue, statefulSelector } = Plugins
const { condition, contains, extend } = Mixins
const { equal, unEqual, greater, less, greaterThan, lessThan } = condition

import substr from '../mixins/substr'
import empty from '../mixins/empty'
import blank from '../mixins/blank'
import { before, after } from '../mixins/beforeAfter'
import firstLetter from '../mixins/firstLetter'

export default {
  plugins: [
    statefulValue,
    statefulSelector,
    mixin
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
    blank: blank,
    empty: empty,
    firstLetter: firstLetter,
    before: before,
    after: after
  }
}
