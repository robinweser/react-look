/**
 * Extracts only the mathematical expression out an pseudo-class string
 * @param {string} pseudo - pseudo-class selector that includes a mathmactical expression
 */
export default (pseudo) => {
  const split = pseudo.replace(/ /g, '').split('(')
  return split[1].substr(0, split[1].length - 1)
}
