import getPseudoExpression from '../utils/getPseudoExpression'
import _ from 'lodash'

// Evaluates if a element contains a given string
export default ({ property, value, newProps: { children } }) => {
  const expression = getPseudoExpression(property)

  if (_.isString(children) && children.indexOf(expression) > -1) {
    return value
  }
  return false
}
