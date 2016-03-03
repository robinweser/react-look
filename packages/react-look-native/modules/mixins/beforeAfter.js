import _ from 'lodash'
import { createElement, Text } from 'react-native'

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

  // If a primitive is passed, just return it
  // otherwise create a new element
  if (!_.isEmpty(styles)) {
    return createElement(Text, { style: styles }, children)
  } else {
    return children
  }
}

const initChildren = props => {
  props.children = props.children ? [ ].concat(props.children) : []
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
