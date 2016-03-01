import Prefixer from 'inline-style-prefixer'

let prefixer

/**
 * Global prefixer instance
 * Updates the userAgent if a new one is provided
 * @param {string} userAgent - optional userAgent that gets used to gather information on prefixes
 */
export default userAgent => {
  if (!prefixer) {
    if (userAgent !== undefined) {
      prefixer = new Prefixer({ userAgent: userAgent })
    } else {
      prefixer = new Prefixer()
    }
  }
  // replace userAgent if config provides alternative one
  if (prefixer._userAgent !== userAgent && userAgent !== undefined) {
    prefixer = new Prefixer({ userAgent: userAgent })
  }

  return prefixer
}
