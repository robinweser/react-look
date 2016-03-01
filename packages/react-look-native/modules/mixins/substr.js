import { createElement, Text } from 'react-native'
import _ from 'lodash'

import getPseudoExpression from '../../../common/modules/utils/getPseudoExpression'

// Evaluates if a element contains a given string
export default ({ property, value, newProps }) => {
  let children = newProps.children

  if (_.isString(children) || _.isNumber(children)) {
    const newChildren = [ ]

    const matches = children.match(new RegExp(getPseudoExpression(property), 'g'))
    if (!matches) {
      return false
    }

    matches.forEach(match => {
      const [ left, ...right ] = children.split(match)
      if (left !== '') {
        newChildren.push(left)
      }

      newChildren.push(createElement(Text, { style: value }, match))

      children = right.join(match)
    })

    newChildren.push(children)
    newProps.children = newChildren
  }

  return false
}
