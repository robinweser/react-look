/**
 * Extracts only the mathematical expression out an pseudo-class string
 * @param {string} pseudo - pseudo-class selector that includes a mathmactical expression
 */
export default pseudo => {
  if (typeof pseudo === 'string' && pseudo.indexOf('(') > -1) {
    const split = pseudo.replace(/ /g, '').split('(')
    return split[1].substr(0, split[1].length - 1)
  }
  return false
}
