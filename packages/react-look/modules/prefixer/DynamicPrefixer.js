import Prefixer from '../api/Prefixer'
import InlineStylePrefixer from 'inline-style-prefixer'

/**
 * Dynamic Prefixer which validate the userAgent to prefix styles
 * @param {string} userAgent - optional userAgent that gets used to gather information on prefixes
 */
export default class DynamicPrefixer extends Prefixer {
  constructor(config) {
    super()
    this.config = config
    this._prefixer = new InlineStylePrefixer(config)
  }

  prefix(styles) {
    return this._prefixer.prefix(styles)
  }

  getKeyframesPrefix() {
    const keyframesPrefix = [ this._prefixer.cssPrefix ]
    return this.config.keepUnprefixed ? keyframesPrefix.concat('') : keyframesPrefix
  }
}
