import { createElement } from 'react'
import { Text } from 'react-native'

// Styles the first letter of an element
export default ({ value, newProps }) => {
  let children = newProps.children

  if (typeof children === 'number') {
    children += ''
  }

  if (typeof children === 'string' && children.length > 0) {
    const firstLetterElement = createElement(Text, { style: value }, children.substr(0, 1))
    newProps.children = [ firstLetterElement, children.substr(1, children.length - 1) ]
  }
  return false
}
