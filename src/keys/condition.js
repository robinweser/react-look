import splitCondition from '../utils/splitCondition'

/**
 * Condition mixins are shortcuts to check if a prop/state fulfills a given expression
 * Therefore it uses Component which gets provided as part of arguments to validate props/state
 */
const biggerThan = (property, styles, customKey, {Component}) => {
  let condition = splitCondition(property, '>=', Component)
  return condition && condition.left >= condition.right ? styles : false
}
const smallerThan = (property, styles, customKey, {Component}) => {
  let condition = splitCondition(property, '<=', Component)
  return condition && condition.left <= condition.right ? styles : false
}
const UnEqual = (property, styles, customKey, {Component}) => {
  let condition = splitCondition(property, '!=', Component)
  return condition && condition.left != condition.right ? styles : false
}
const bigger = (property, styles, customKey, {Component}) => {
  let condition = splitCondition(property, '>', Component)
  return condition && condition.left > condition.right ? styles : false
}
const smaller = (property, styles, customKey, {Component}) => {
  let condition = splitCondition(property, '<', Component)
  return condition && condition.left < condition.right ? styles : false
}
const equal = (property, styles, customKey, {Component}) => {
  let condition = splitCondition(property, '=', Component)
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