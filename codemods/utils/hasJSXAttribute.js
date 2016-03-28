/**
 * Checks if a JSXElement has a certain attribute
 */
export default function hasJSXAttribute(el, attribute) {
  var validate = false

  el.node.attributes.forEach(attr => {
    if (attr.name.name === attribute) {
      validate = true
    }
  })

  return validate
}
