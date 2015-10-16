import assign from 'object-assign'
import { get as getProp } from 'dot-prop'

/**
 * Splits an expression at a given operator and returns both values converted to compare them with ease
 * @param {string} key - key that gets evaluated, in this case the expression
 * @param {operator} operator - operator which splits property and value
 * @param {Object} Component - outer React Component holding props and state to match
 */
export default function splitCondition(key, operator, Component) {
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
  } else {
    return false
  }
}


/**
 * Condition mixins are shortcuts to check if a prop/state fulfills a given expression
 * Therefore it uses Component which gets provided as part of arguments to validate props/state
 */
const greaterThan = (property, styles, customKey, {Component}) => {
  const condition = splitCondition(property, customKey, Component)
  return condition && condition.left >= condition.right ? styles : false
}
const lessThan = (property, styles, customKey, {Component}) => {
  const condition = splitCondition(property, customKey, Component)
  return condition && condition.left <= condition.right ? styles : false
}
const unEqual = (property, styles, customKey, {Component}) => {
  const condition = splitCondition(property, customKey, Component)
  return condition && condition.left != condition.right ? styles : false
}
const greater = (property, styles, customKey, {Component}) => {
  const condition = splitCondition(property, customKey, Component)
  return condition && condition.left > condition.right ? styles : false
}
const less = (property, styles, customKey, {Component}) => {
  const condition = splitCondition(property, customKey, Component)
  return condition && condition.left < condition.right ? styles : false
}
const equal = (property, styles, customKey, {Component}) => {
  const condition = splitCondition(property, customKey, Component)
  return condition && condition.left == condition.right ? styles : false
}

export default {
  greaterThan,
  lessThan,
  unEqual,
  greater,
  less,
  equal
}
