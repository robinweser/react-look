import prefixer from '../utils/prefixer'

/*
 * Adds vendor-prefixes to properties in need of
 * Uses inline-style-prefixer to achieve that
 */
export default ({ styles, config: { userAgent } }) => {
  return prefixer(userAgent).prefix(styles)
}
