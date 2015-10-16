import { createElement, Children } from 'react'
/**
 * Adds a element before/after current element
 * Uses MixinTypes.INCLUDE to cover both :before/:after as well as ::before/::after
 */

const before = (property, styles, customKey, {newProps}) => {
  if (!newProps.hasOwnProperty('children')) {
    newProps.children = []
  }
  newProps.children.unshift(createPseudoElement(styles))
}

const after = (property, styles, customKey, {newProps}) => {
  if (!newProps.hasOwnProperty('children')) {
    newProps.children = []
  }
  newProps.children.push(createPseudoElement(styles))
}

export default {
  before,
  after
}
/**
 * Creates a new pseudo element 
 * Support for :before, :after / ::before, ::after
 * NOTE: By passing a `content` you may specify a text or image which gets inserted
 * @param {Object} styles - pseudo elements inner styles
 */
const createPseudoElement = (styles) => {
  let children = ''
  if (styles.content) {
    children = styles.content
    delete styles.content
  }
  if (children.indexOf('url(') > -1) {
    children = createPseudoImage(children)
  }
  return createElement('span', {style: styles}, Children.toArray(children))
}

/**
 * Creates a new image element as child of a pseudo element
 * @param {string} content - value including a valid url path to the image
 */
const createPseudoImage = (content) => createElement('img', {
    src: content.split('url(')[1].substr(0, content.length - 5)
  })