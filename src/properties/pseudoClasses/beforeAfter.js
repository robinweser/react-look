import { createElement } from 'react'


/**
 * Creates a new image element as child of a pseudo element
 * @param {string} content - value including a valid url path to the image
 */
const createPseudoImage = (content) => createElement('img', {
    src: content.split('url(')[1].substr(0, content.length - 5)
  })

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

const initChildren = (props) => {
  if (!props.hasOwnProperty('children')) {
    props.children = []
  }
}

/**
 * Adds a element before/after current element
 */
const before = (property, styles, customKey, {newProps}) => {
  initChildren(newProps)
  newProps.children.unshift(createPseudoElement(styles))
}

const after = (property, styles, customKey, {newProps}) => {
  initChildren(newProps)
  newProps.children.push(createPseudoElement(styles))
}

export default {before, after}
