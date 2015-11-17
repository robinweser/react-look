import splitCondition from '../utils/splitCondition'

/**
 * Condition mixins are shortcuts to check if a prop/state fulfills a given expression
 * Therefore it uses Component which gets provided as part of arguments to validate props/state
 */
export default {
  greaterThan: (property, styles, customKey, {Component}) => {
    const condition = splitCondition(property, customKey, Component)
    return condition && condition.left >= condition.right ? styles : false
  },
  lessThan: (property, styles, customKey, {Component}) => {
    const condition = splitCondition(property, customKey, Component)
    return condition && condition.left <= condition.right ? styles : false
  },
  unEqual: (property, styles, customKey, {Component}) => {
    const condition = splitCondition(property, customKey, Component)
    return condition && condition.left != condition.right ? styles : false // eslint-disable-line eqeqeq
  },
  greater: (property, styles, customKey, {Component}) => {
    const condition = splitCondition(property, customKey, Component)
    return condition && condition.left > condition.right ? styles : false
  },
  less: (property, styles, customKey, {Component}) => {
    const condition = splitCondition(property, customKey, Component)
    return condition && condition.left < condition.right ? styles : false
  },
  equal: (property, styles, customKey, {Component}) => {
    const condition = splitCondition(property, customKey, Component)
    return condition && condition.left == condition.right ? styles : false // eslint-disable-line eqeqeq
  }
}
