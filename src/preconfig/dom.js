import alternativeValue from '../plugins/alternativeValue'
import statefulValue from '../plugins/statefulValue'
import mixin from '../plugins/mixin'
import prefixer from '../plugins/prefixer'
import serverSideRendering from '../plugins/serverSideRendering'
import stringSyntax from '../plugins/stringSyntax'

import { equal, unEqual, greater, less, greaterThan, lessThan } from '../mixins/condition'
import { firstChild, lastChild, onlyChild, nthChild, nthLastChild } from '../mixins/pseudoClasses/childIndex'
import { firstOfType, lastOfType, onlyOfType, nthOfType, nthLastOfType } from '../mixins/pseudoClasses/childTypeIndex'
import { checked, disabled, enabled, required, optional, readOnly, readWrite, indeterminate } from '../mixins/pseudoClasses/input'
import { hover, active, focus } from '../mixins/pseudoClasses/userAction'
import { before, after } from '../mixins/pseudoClasses/beforeAfter'
import lang from '../mixins/pseudoClasses/lang'
import target from '../mixins/pseudoClasses/target'
import blank from '../mixins/pseudoClasses/blank'
import firstLetter from '../mixins/pseudoClasses/firstLetter'
import contains from '../mixins/pseudoClasses/contains'
import substr from '../mixins/pseudoClasses/substr'
import empty from '../mixins/pseudoClasses/empty'
import extractCSS from '../mixins/extractCSS'
import extend from '../mixins/extend'
import mediaQuery from '../mixins/mediaQuery'
import platformQuery from '../mixins/platformQuery'

export default {
  plugins: [
    serverSideRendering,
    stringSyntax,
    mixin,
    alternativeValue,
    statefulValue,
    prefixer
  ],
  mixins: {
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
    '@platform': platformQuery,
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
    ':target': target,
    ':first-letter': firstLetter,
    ':blank': blank,
    ':contains': contains,
    ':substr': substr
  }
}
