import assign from 'object-assign'

/**
 * Condition mixins are shortcuts to check if a prop/state fulfills a given expression
 * Therefore it uses Component which gets provided as part of arguments to validate props/state
 */
const biggerThan = (property, styles, customKey, {Component}) => {
  let condition = splitCondition(property, customKey, Component)
  return condition && condition.left >= condition.right ? styles : false
}
const smallerThan = (property, styles, customKey, {Component}) => {
  let condition = splitCondition(property, customKey, Component)
  return condition && condition.left <= condition.right ? styles : false
}
const unEqual = (property, styles, customKey, {Component}) => {
  let condition = splitCondition(property, customKey, Component)
  return condition && condition.left != condition.right ? styles : false
}
const bigger = (property, styles, customKey, {Component}) => {
  let condition = splitCondition(property, customKey, Component)
  return condition && condition.left > condition.right ? styles : false
}
const smaller = (property, styles, customKey, {Component}) => {
  let condition = splitCondition(property, customKey, Component)
  return condition && condition.left < condition.right ? styles : false
}
const equal = (property, styles, customKey, {Component}) => {
  let condition = splitCondition(property, customKey, Component)
  return condition && condition.left == condition.right ? styles : false
}

export default {
  biggerThan,
  smallerThan,
  unEqual,
  bigger,
  smaller,
  equal
}

/** 
 * Splits an expression at a given operator and returns both values converted to compare them with ease 
 * @param {string} key - key that gets evaluated, in this case the expression
 * @param {operator} operator - operator which splits property and value
 * @param {Object} Component - outer React Component holding props and state to match
 */
const splitCondition = (key, operator, Component) => {
  let matchValues = assign({}, Component.props, Component.state)

  let [property, value] = key.split(operator)
  if (matchValues.hasOwnProperty(property)) {
    let match = matchValues[property] === undefined ? 'undefined' : matchValues[property]
    if (!(!isNaN(parseFloat(match)) && isFinite(match))) {
      match = (match + '').toString()
    }
    return {left: match, right: value}
  } else {
    return false
  }
}