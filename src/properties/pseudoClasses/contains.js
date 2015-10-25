import { createElement } from 'react'
import getPseudoExpression from '../../utils/getPseudoExpression'

// Evaluates if a element contains a given string
export default (property, styles, customKey, {newProps}) => {
  const children = newProps.children
  const expression = getPseudoExpression(property)

  if ((typeof children === 'string' || typeof children === 'number') && children.indexOf(expression) > -1) {
    return styles
  }
  return false
}
