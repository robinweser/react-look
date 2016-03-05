import Prefixer from '../api/Prefixer'
import prefixAll from 'inline-style-prefix-all'

/**
 * Dynamic Prefixer which validate the userAgent to prefix styles
 * @param {string} userAgent - optional userAgent that gets used to gather information on prefixes
 */
export default class StaticPrefixer extends Prefixer {
  constructor() {
    super()
  }

  prefix(styles) {
    return prefixAll(styles)
  }

  getKeyframesPrefix() {
    return [ '-webkit-', '-moz-', '' ]
  }
}
