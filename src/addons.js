// Plugins
import alternativeValue from './plugins/alternativeValue'
import statefulValue from './plugins/statefulValue'
import mixin from './plugins/mixin'
import prefixer from './plugins/prefixer'

// devTools
import styleLogger from './plugins/devTools/styleLogger'

// Conditions
import { equal, unEqual, greater, less, greaterThan, lessThan } from './mixins/condition'

// Pseudo classes
import { firstChild, lastChild, onlyChild, nthChild, nthLastChild } from './mixins/pseudoClasses/childIndex'
import { firstOfType, lastOfType, onlyOfType, nthOfType, nthLastOfType } from './mixins/pseudoClasses/childTypeIndex'
import { checked, disabled, enabled, required, optional, readOnly, readWrite, indeterminate } from './mixins/pseudoClasses/input'
import { hover, active, focus } from './mixins/pseudoClasses/userAction'
import { valid, invalid, inRange, outOfRange } from './mixins/pseudoClasses/validation'
import { before, after } from './mixins/pseudoClasses/beforeAfter'
import lang from './mixins/pseudoClasses/lang'
import empty from './mixins/pseudoClasses/empty'
import target from './mixins/pseudoClasses/target'
import blank from './mixins/pseudoClasses/blank'
import firstLetter from './mixins/pseudoClasses/firstLetter'
import contains from './mixins/pseudoClasses/contains'
import substr from './mixins/pseudoClasses/substr'

// CSS extraction
import extractCSS from './mixins/extractCSS'

// Extending
import extend from './mixins/extend'

// Queries
import mediaQuery from './mixins/mediaQuery'
import platformQuery from './mixins/platformQuery'

// Presets
import nativePreset from './presets/react-native'
import domPreset from './presets/react-dom'

export default {
  Plugins: {
    mixin,
    alternativeValue,
    statefulValue,
    prefixer
  },
  DevTools: {
    styleLogger
  },
  Mixins: {
    // Conditions
    greaterThan,
    lessThan,
    unEqual,
    greater,
    less,
    equal,

    // Extending
    extend,

    // CSS extraction
    extractCSS,

    // Queries
    mediaQuery,
    platformQuery,

    // Pseudo classes
    empty,
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
    valid,
    invalid,
    inRange,
    outOfRange,
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
  },
  Presets: {
    'react-native': nativePreset,
    'react-dom': domPreset
  }
}
