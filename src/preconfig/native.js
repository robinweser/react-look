import alternativeValue from './plugins/alternativeValue'
import statefulValue from './plugins/statefulValue'
import customProperty from './plugins/customProperty'

import { equal, unEqual, bigger, smaller, biggerThan, smallerThan } from './keys/condition'
import { firstChild, lastChild, onlyChild, nthChild, nthLastChild } from './keys/pseudoClasses/childIndex'
import { firstOfType, lastOfType, onlyOfType, nthOfType, nthLastOfType } from './keys/pseudoClasses/childIndex'
import empty from './keys/pseudoClasses/empty'
import extend from './keys/extend'

export default {
  plugins: [
    customProperty,
    alternativeValue,
    statefulValue
  ],
  keys: {
    // NOTE: Ordner matters! 
    '>=': biggerThan,
    '<=': smallerThan,
    '!=': unEqual,
    '>': bigger,
    '<': smaller,
    '=': equal,
    extend: extend,
    ':empy': empty,
    ':first-child': firstChild,
    ':last-child': lastChild,
    ':only-child': onlyChild,
    ':nth-child': nthChild,
    ':nth-last-child': nthLastChild,
    ':first-of-type': firstOfType,
    ':last-of-type': lastOfType,
    ':only-of-type': onlyOfType,
    ':nth-of-type': nthOfType,
    ':nth-last-of-type': nthLastOfType
  }
}