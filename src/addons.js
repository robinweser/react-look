import alternativeValue from './plugins/alternativeValue'
import statefulValue from './plugins/statefulValue'
import customProperty from './plugins/customProperty'
import prefixer from './plugins/prefixer'

import { equal, unEqual, greater, less, greaterThan, lessThan } from './keys/condition'
import { firstChild, lastChild, onlyChild, nthChild, nthLastChild } from './keys/pseudoClasses/childIndex'
import { firstOfType, lastOfType, onlyOfType, nthOfType, nthLastOfType } from './keys/pseudoClasses/childTypeIndex'
import { checked, disabled, enabled, required, optional, readOnly, readWrite, indeterminate } from './keys/pseudoClasses/input'
import { hover, active, focus } from './keys/pseudoClasses/userAction'
import { before, after } from './keys/pseudoClasses/beforeAfter'
import lang from './keys/pseudoClasses/lang'
import empty from './keys/pseudoClasses/empty'
import extractCSS from './keys/extractCSS'
import extend from './keys/extend'
import mediaQuery from './keys/mediaQuery'

export default {
  Plugin: {
    customProperty,
    alternativeValue,
    statefulValue,
    prefixer
  },
  CustomProperty: {
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
    indeterminate
  }
}