import MixinTypes from '../utils/MixinTypes'
import splitCondition from '../utils/splitCondition'

/**
 * Condition mixins are shortcuts to check if a prop/state fulfills a given expression
 * Therefore it uses Component which gets provided as part of arguments to validate props/state
 */
export default [{
  key: '>=',
  type: MixinTypes.INCLUDE,
  fn: ( key, styles, { Component } ) => {
    const evaluation = splitCondition(key, '>=', Component)

    return evaluation && evaluation[0] >= evaluation[1] ? styles : false
  }
}, {
  key: '<=',
  type: MixinTypes.INCLUDE,
  fn: ( key, styles, { Component } ) => {
    const evaluation = splitCondition(key, '<=', Component)

    return evaluation && evaluation[0] <= evaluation[1] ? styles : false
  }
}, {
  key: '!=',
  type: MixinTypes.INCLUDE,
  fn: ( key, styles, { Component } ) => {
    const evaluation = splitCondition(key, '!=', Component)

    return evaluation && evaluation[0] != evaluation[1] ? styles : false // eslint-disable-line eqeqeq
  }
}, {
  key: '>',
  type: MixinTypes.INCLUDE,
  fn: ( key, styles, { Component } ) => {
    const evaluation = splitCondition(key, '>', Component)

    return evaluation && evaluation[0] > evaluation[1] ? styles : false
  }
}, {
  key: '<',
  type: MixinTypes.INCLUDE,
  fn: ( key, styles, { Component } ) => {
    const evaluation = splitCondition(key, '<', Component)

    return evaluation && evaluation[0] < evaluation[1] ? styles : false
  }
}, {
  key: '=',
  type: MixinTypes.INCLUDE,
  fn: ( key, styles, { Component } ) => {
    const evaluation = splitCondition(key, '=', Component)

    return evaluation && evaluation[0] == evaluation[1] ? styles : false // eslint-disable-line eqeqeq
  }
}]
