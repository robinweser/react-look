// Plugins
import statefulValue from '../plugins/statefulValue'
import mixin from '../plugins/mixin'

// Conditions
import { equal, unEqual, greater, less, greaterThan, lessThan } from '../mixins/condition'

// Other
import contains from '../mixins/contains'
import substr from '../mixins/substr'
import extend from '../mixins/extend'

export default {
  plugins: [
    statefulValue,
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
    substr: substr
  }
}
