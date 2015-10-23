/**
 * Evaluates nth expressions by parsing them
 * This is quite dirty and needs to be refactored later though it works fine
 * @param {string} expression - mathematical expression in the form an+b
 * @param {number} index - current elements index
 */
export default (expression, index) => {
  if (expression === 'odd') {
    return index % 2 !== 0; // eslint-disable-line semi
  }

  if (expression === 'even') {
    return index % 2 === 0
  }

  const split = expression.split('n')

  if (split.length > 1) {
    split[0] = split[0] === '-' ? '-1' : split[0]
    const addend = split[1] ? parseInt(split[1], 10) : 0
    const multiplier = split[0] ? parseInt(split[0], 10) : 0

    if (multiplier) {
      if (multiplier < 0 && index > addend || multiplier > 0 && index < addend) {
        return false
      }

      return ((index - addend) / multiplier) % 1 === 0
    }

    return index >= addend
  }

  return index == expression // eslint-disable-line eqeqeq
}
