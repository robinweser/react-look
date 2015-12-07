import nativePreset from './react-native'

// Plugins
import prefixer from '../plugins/prefixer'

// Pseudo classes
import { checked, disabled, enabled, required, optional, readOnly, readWrite, indeterminate } from '../mixins/pseudoClasses/input'
import { hover, active, focus } from '../mixins/pseudoClasses/userAction'
import { valid, invalid, inRange, outOfRange } from '../mixins/pseudoClasses/validation'
import { before, after } from '../mixins/pseudoClasses/beforeAfter'
import lang from '../mixins/pseudoClasses/lang'
import target from '../mixins/pseudoClasses/target'

// CSS extraction
import extractCSS from '../mixins/extractCSS'

// Queries
import mediaQuery from '../mixins/mediaQuery'
import platformQuery from '../mixins/platformQuery'

export default {
  plugins: [
    ...nativePreset.plugins,
    prefixer
  ],
  mixins: {
    ...nativePreset.mixins,
    // CSS extraction
    css: extractCSS,

    // Queries
    '@media': mediaQuery,
    '@platform': platformQuery,

    // Pseudo classes
    ':before': before,
    ':after': after,
    ':lang': lang,
    ':hover': hover,
    ':focus': focus,
    ':active': active,
    ':valid': valid,
    ':invalid': invalid,
    ':in-range': inRange,
    ':out-of-range': outOfRange,
    ':checked': checked,
    ':disabled': disabled,
    ':enabled': enabled,
    ':read-only': readOnly,
    ':read-write': readWrite,
    ':required': required,
    ':optional': optional,
    ':indeterminate': indeterminate,
    ':target': target
  }
}
