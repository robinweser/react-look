import alternativeValue from './plugins/alternativeValue'
import statefulValue from './plugins/statefulValue'
import customProperty from './plugins/customProperty'
import prefixer from './plugins/prefixer'

import { equal, unEqual, greater, less, greaterThan, lessThan } from './properties/condition'
import { firstChild, lastChild, onlyChild, nthChild, nthLastChild } from './properties/pseudoClasses/childIndex'
import { firstOfType, lastOfType, onlyOfType, nthOfType, nthLastOfType } from './properties/pseudoClasses/childTypeIndex'
import { checked, disabled, enabled, required, optional, readOnly, readWrite, indeterminate } from './properties/pseudoClasses/input'
import { hover, active, focus } from './properties/pseudoClasses/userAction'
import { before, after } from './properties/pseudoClasses/beforeAfter'
import lang from './properties/pseudoClasses/lang'
import empty from './properties/pseudoClasses/empty'
import target from './properties/pseudoClasses/target'
import blank from './properties/pseudoClasses/blank'
import firstLetter from './properties/pseudoClasses/firstLetter'
import contains from './properties/pseudoClasses/contains'
import substr from './properties/pseudoClasses/substr'
import extractCSS from './properties/extractCSS'
import extend from './properties/extend'
import mediaQuery from './properties/mediaQuery'

export default {
  Plugins: {
    customProperty,
    alternativeValue,
    statefulValue,
    prefixer
  },
  CustomProperties: {
    greaterThan,
    lessThan,
    unEqual,
    greater,
    less,
    equal,
    extend,
    extractCSS,
    empty,
    mediaQuery,
    firstChild,
    lastChild,
    onlyChild,
    nthChild,
    nthLastChild,
    firstOfType,
    lastOfType,
    onlyOfType,
    nthOfType,
    nthLastOfType,
    before,
    after,
    lang,
    hover,
    focus,
    active,
    checked,
    disabled,
    enabled,
    readOnly,
    readWrite,
    required,
    optional,
    indeterminate,
    firstLetter,
    blank,
    target,
    contains,
    substr
  }
}
