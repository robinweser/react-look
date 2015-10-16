import assign from 'object-assign'

/** 
 * Splits an expression at a given operator and returns both values converted to compare them with ease 
 * @param {string} key - key that gets evaluated, in this case the expression
 * @param {operator} operator - operator which splits property and value
 * @param {Object} Component - outer React Component holding props and state to match
 */
export default (key, operator, Component) => {
  let matchValues = assign({}, Component.props, Component.state)

  let [property, value] = key.split(operator)
  if (matchValues.hasOwnProperty(property)) {
    let match = matchValues[property] === undefined ? 'undefined' : matchValues[property]
    if (!isNaN(parseFloat(match)) && isFinite(match)) {
      match = (match + '').toString()
    }
    return {left: match, right: value}
  } else {
    return false
  }
}