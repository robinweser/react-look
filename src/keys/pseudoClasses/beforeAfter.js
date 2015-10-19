import { createElement } from 'react'
/**
 * Adds a element before/after current element
 * Uses MixinTypes.INCLUDE to cover both :before/:after as well as ::before/::after
 */

const before = (property, styles, customKey, {newProps}) => {
  initChildren(newProps)
  newProps.children.unshift(createPseudoElement(styles))
}

const after = (property, styles, customKey, {newProps}) => {
  initChildren(newProps)
  newProps.children.push(createPseudoElement(styles))
}

export default {
  before,
  after
}

const initChildren = (props) => {
  if (!props.hasOwnProperty('children')) {
    props.children = []
  }
}

/**
 * Creates a new pseudo element 
 * NOTE: By passing a `content` you may specify a text or image which gets inserted
 * @param {Object} styles - pseudo elements inner styles
 */
const createPseudoElement = (styles) => {
  let children = ''

  if (styles.content) {
    children = styles.content
    delete styles.content

    if (children.indexOf('url(') > -1) {
      children = createPseudoImage(children)
    }
  }
  return createElement('span', {style: styles}, children)
}

/**
 * Creates a new image element as child of a pseudo element
 * @param {string} content - value including a valid url path to the image
 */
const createPseudoImage = (content) => createElement('img', {
    src: content.split('url(')[1].substr(0, content.length - 5)
  })