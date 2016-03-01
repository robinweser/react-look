import _ from 'lodash'
import getPseudoExpression from '../utils/getPseudoExpression'

// Evaluates if a element contains a given string
export default ({ property, value, newProps: { children } }) => {
  const expression = getPseudoExpression(property)

  if (_.isString(children) && children.indexOf(expression) > -1) {
    return value
  }
  return false
}
