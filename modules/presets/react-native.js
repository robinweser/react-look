// Plugins
import alternativeValue from '../plugins/alternativeValue'
import statefulValue from '../plugins/statefulValue'
import mixin from '../plugins/mixin'

// Conditions
import { equal, unEqual, greater, less, greaterThan, lessThan } from '../mixins/condition'

// Pseudo classes
import { firstChild, lastChild, onlyChild, nthChild, nthLastChild } from '../mixins/pseudoClasses/childIndex'
import { firstOfType, lastOfType, onlyOfType, nthOfType, nthLastOfType } from '../mixins/pseudoClasses/childTypeIndex'
import empty from '../mixins/pseudoClasses/empty'
import firstLetter from '../mixins/pseudoClasses/firstLetter'
import contains from '../mixins/pseudoClasses/contains'
import substr from '../mixins/pseudoClasses/substr'
import blank from '../mixins/pseudoClasses/blank'

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
