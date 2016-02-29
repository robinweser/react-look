// Plugins
import statefulValue from '../plugins/statefulValue'
import statefulSelector from '../plugins/native/statefulSelector'
import mixin from '../plugins/mixin'

// Conditions
import { equal, unEqual, greater, less, greaterThan, lessThan } from '../mixins/condition'

// Other
import contains from '../mixins/contains'
import extend from '../mixins/extend'
import substr from '../mixins/native/substr'
import empty from '../mixins/native/empty'
import blank from '../mixins/native/blank'
import { before, after } from '../mixins/native/beforeAfter'
import firstLetter from '../mixins/native/firstLetter'

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
