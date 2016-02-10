/**
 * Throws warnings only in devmode
 * Allows multiple warnings at the same time
 * @param {string|array} message - warnings that get thrown
 */
export default (...warning) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error('Look Warning: ', ...warning)
  }
}
