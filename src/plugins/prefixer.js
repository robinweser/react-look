import Prefixer from 'inline-style-prefixer'

let prefixer = new Prefixer()

export default (styles, scopeArgs, config) => {
  // replace userAgent if config provides alternative one
  if (config.userAgent !== undefined) {
    if (prefixer._userAgent !== config.userAgent) {
      prefixer = new Prefixer(config.userAgent)
    }
  }

  // only prefix if userAgent is not undefined
  if (prefixer._userAgent !== undefined) {
    styles = prefixer.prefix(styles)
  }

  return styles
}
