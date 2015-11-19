const threshhold = 250

/**
 * A throttle method to throttle browser event triggering
 * Delay is set to 250 on default
 * @param {function} callback - Function that gets throttled
 */
export default fn => {
  let wait = false
  return () => {
    if (!wait) {
      fn.call()
      wait = true
      setTimeout(() => wait = false, threshhold)
    }
  }
}
