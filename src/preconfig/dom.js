import alternativeValue from '../plugins/alternativeValue'
import statefulValue from '../plugins/statefulValue'
import customProperty from '../plugins/customProperty'
import prefixer from '../plugins/prefixer'
import stringSyntax from '../plugins/stringSyntax'

import { equal, unEqual, greater, less, greaterThan, lessThan } from '../properties/condition'
import { firstChild, lastChild, onlyChild, nthChild, nthLastChild } from '../properties/pseudoClasses/childIndex'
import { firstOfType, lastOfType, onlyOfType, nthOfType, nthLastOfType } from '../properties/pseudoClasses/childTypeIndex'
import { checked, disabled, enabled, required, optional, readOnly, readWrite, indeterminate } from '../properties/pseudoClasses/input'
import { hover, active, focus, valid } from '../properties/pseudoClasses/userAction'
import { before, after } from '../properties/pseudoClasses/beforeAfter'
import lang from '../properties/pseudoClasses/lang'
import empty from '../properties/pseudoClasses/empty'
import extractCSS from '../properties/extractCSS'
import extend from '../properties/extend'
import mediaQuery from '../properties/mediaQuery'

export default {
  plugins: [
    stringSyntax,
    customProperty,
    alternativeValue,
    statefulValue,
    prefixer
  ],
  customProperties: {
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
    ':indeterminate': indeterminate,
    ':valid': valid
  }
}
