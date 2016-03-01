import prefixAll from 'inline-style-prefix-all'

/**
 * Adds every needed vendor-prefix for any property
 * Also includes special plugins to prefix values
 */
export default ({ styles }) => {
  return prefixAll(styles)
}
