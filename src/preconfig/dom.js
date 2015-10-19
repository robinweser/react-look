import alternativeValue from './plugins/alternativeValue'
import statefulValue from './plugins/statefulValue'
import customProperty from './plugins/customProperty'

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
  plugins: [
    customProperty,
    alternativeValue,
    statefulValue
  ],
  keys: {
    // NOTE: Ordner matters! 
    '>=': greaterThan,
    '<=': lessThan,
    '!=': unEqual,
    '>': greater,
    '<': less,
    '=': equal,
    extend: extend,
    css: extractCSS,
    ':empty': empty,
    '@media': mediaQuery,
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
    ':before': before,
    ':after': after,
    ':lang': lang,
    ':hover': hover,
    ':focus': focus,
    ':active': active,
    ':checked': checked,
    ':disabled': disabled,
    ':enabled': enabled,
    ':read-only': readOnly,
    ':read-write': readWrite,
    ':required': required,
    ':optional': optional,
    ':indeterminate': indeterminate
  }
}