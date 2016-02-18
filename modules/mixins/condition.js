import splitCondition from '../utils/splitCondition'

/**
 * Condition mixins are shortcuts to check if a prop/state fulfills a given expression
 * Therefore it uses Component which gets provided as part of arguments to validate props/state
 */
export default {
  greaterThan: ({ property, value, mixinKey, Component }) => {
    const condition = splitCondition(property, mixinKey, Component)
    return condition && condition.left >= condition.right ? value : false
  },
  lessThan: ({ property, value, mixinKey, Component }) => {
    const condition = splitCondition(property, mixinKey, Component)
    return condition && condition.left <= condition.right ? value : false
  },
  unEqual: ({ property, value, mixinKey, Component }) => {
    const condition = splitCondition(property, mixinKey, Component)
    return condition && condition.left != condition.right ? value : false // eslint-disable-line eqeqeq
  },
  greater: ({ property, value, mixinKey, Component }) => {
    const condition = splitCondition(property, mixinKey, Component)
    return condition && condition.left > condition.right ? value : false
  },
  less: ({ property, value, mixinKey, Component }) => {
    const condition = splitCondition(property, mixinKey, Component)
    return condition && condition.left < condition.right ? value : false
  },
  equal: ({ property, value, mixinKey, Component }) => {
    const condition = splitCondition(property, mixinKey, Component)
    return condition && condition.left == condition.right ? value : false // eslint-disable-line eqeqeq
  }
}
