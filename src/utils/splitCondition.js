import assign from 'object-assign'
import { get as getProp } from 'dot-prop'

/**
 * Splits an expression at a given operator and returns both values converted to compare them with ease
 * @param {string} key - key that gets evaluated, in this case the expression
 * @param {operator} operator - operator which splits property and value
 * @param {Object} Component - outer React Component holding props and state to match
 */
export default (key, operator, Component) => {
  const matchValues = assign({}, Component.props, Component.state)

  const [property, value] = key.split(operator)
  const [baseProp] = property.split('.')

  if (matchValues.hasOwnProperty(baseProp)) {
    let match = getProp(matchValues, property)

    match = match === undefined ? 'undefined' : match

    if (!(!isNaN(parseFloat(match)) && isFinite(match))) {
      match = (match + '').toString()
    }

    return {left: match, right: value}
  }

  return false
}
