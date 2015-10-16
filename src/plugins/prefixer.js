import Prefixer from 'inline-style-prefixer'
let userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined

let prefixer = new Prefixer()

export default (styles) => {
  if (userAgent !== undefined) {
    styles = prefixer.prefix(styles)
    return styles
  } else {
    console.warn('Autoprefixing failed as there is no valid userAgent specified.')
    console.warn('Use Config.setUserAgent to specify a custom userAgent for server-side rendering.')
  }
}