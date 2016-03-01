// Plugins
import mixin from '../../../common/modules/plugins/mixin'
import statefulValue from '../../../common/modules/plugins/statefulValue'
import statefulSelector from '../plugins/statefulSelector'

// Conditions
import { equal, unEqual, greater, less, greaterThan, lessThan } from '../../../common/modules/mixins/condition'

// Other
import contains from '../../../common/modules/mixins/contains'
import extend from '../../../common/modules/mixins/extend'
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
