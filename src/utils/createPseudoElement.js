import createPseudoImage from './createPseudoImage'

/**
 * Creates a new pseudo element
 * Support for :before, :after / ::before, ::after
 * NOTE: By passing a `content` you may specify a text or image which gets inserted
 * @param {Object} styles - pseudo elements inner styles
 */
export default function createPseudoElement(styles) {
  let content = ''

  if (styles.content) {
    content = styles.content
    delete styles.content
  }

  let children = content.indexOf('url(') > -1 ? [createPseudoImage(content)] : content
  let newProps = {style: styles}

  return React.createElement('span', newProps, children)
}
