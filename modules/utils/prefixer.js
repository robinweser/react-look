import Prefixer from 'inline-style-prefixer'

let prefixer

/**
 * Global prefixer instance
 * Updates the userAgent if a new one is provided
 * @param {string} userAgent - optional userAgent that gets used to gather information on prefixes
 */
export default userAgent => {
  if (!prefixer) {
    prefixer = new Prefixer({ userAgent: userAgent })
  }
  // replace userAgent if config provides alternative one
  if (userAgent !== undefined && prefixer._userAgent !== userAgent) {
    prefixer = new Prefixer({ userAgent: userAgent })
  }

  return prefixer
}
