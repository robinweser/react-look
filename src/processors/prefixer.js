import Prefixer from 'inline-style-prefixer'

const prefixer = new Prefixer()
const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined

export default {
  name: 'Prefixer',

  version: '1.0.1',

  description: 'Adds vendor prefix to properties if environment needs those.',

  /**
   * Adds prefixes to styles if needed
   * @param {Object} styles - styles object that gets prefixes added
   */
  process( styles ) {
    if ( userAgent !== undefined ) {
      return prefixer.prefix(styles)
    }

    console.warn('Autoprefixing failed as there is no valid userAgent specified.')
    console.warn('Use Config.setUserAgent to specify a custom userAgent for server-side rendering.')
  }
}
