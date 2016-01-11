// Plugins
import alternativeValue from '../plugins/alternativeValue'
import statefulValue from '../plugins/statefulValue'
import mixin from '../plugins/mixin'

// Conditions
import { equal, unEqual, greater, less, greaterThan, lessThan } from '../mixins/condition'

// Pseudo classes
import { firstChild, lastChild, onlyChild, nthChild, nthLastChild } from '../mixins/childIndex'
import { firstOfType, lastOfType, onlyOfType, nthOfType, nthLastOfType } from '../mixins/childTypeIndex'
import empty from '../mixins/empty'
import firstLetter from '../mixins/firstLetter'
import contains from '../mixins/contains'
import substr from '../mixins/substr'
import blank from '../mixins/blank'

// Extending
import extend from '../mixins/extend'

export default {
  plugins: [
    mixin,
    alternativeValue,
    statefulValue
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

    // Extend
    extend: extend,

    // Pseudo classes
    ':empty': empty,
    ':first-child': firstChild,
    ':last-child': lastChild,
    ':only-child': onlyChild,
    ':nth-child': nthChild,
    ':nth-last-child': nthLastChild,
    ':first-of-type': firstOfType,
    ':last-of-type': lastOfType,
    ':only-of-type': onlyOfType,
    ':nth-of-type': nthOfType,
    ':nth-last-of-type': nthLastOfType,
    ':first-letter': firstLetter,
    ':blank': blank,
    ':contains': contains,
    ':substr': substr
  }
}
