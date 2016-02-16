import { createElement, View } from 'react-native'

/**
 * Creates a new pseudo element
 * NOTE: By passing a `content` you may specify a text or image which gets inserted
 * @param {Object} styles - pseudo elements inner styles
 */
const createPseudoElement = styles => {
  let children = undefined

  if (styles.content) {
    children = styles.content
    delete styles.content
  }

  return createElement(View, { style: styles }, children)
}

const initChildren = props => {
  if (!props.children) {
    props.children = [ ]
  }

  if (props.children instanceof Array !== true) {
    props.children = [ props.children ]
  }
}

/**
 * Adds a element before/after current element
 */
export default {
  before: ({ value, newProps }) => {
    initChildren(newProps)
    newProps.children.unshift(createPseudoElement(value))
  },
  after: ({ value, newProps }) => {
    initChildren(newProps)
    newProps.children.push(createPseudoElement(value))
  }
}
