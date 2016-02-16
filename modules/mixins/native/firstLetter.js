import { createElement, View } from 'react'

// Styles the first letter of an element
export default ({ property, value, mixinKey, newProps }) => {
  let children = newProps.children

  if (typeof children === 'number') {
    children += ''
  }

  if (typeof children === 'string' && children.length > 0) {
    const firstLetterElement = createElement(View, { style: styles }, children.substr(0, 1))
    newProps.children = [ firstLetterElement, children.substr(1, children.length - 1) ]
  }
  return false
}
