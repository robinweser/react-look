export default function extractJSXAttribute(el, attribute, pop) {
  let value
  let newAttributes

  el.node.attributes.forEach(attr => {
    if (attr.name.name === attribute) {
      if (pop) {
        newAttributes = el.node.attributes.filter(att => att.name.name !== attribute)
      }

      if (attr.value.type === 'Literal') {
        value = attr.value
      } else if (attr.value.type === 'JSXExpressionContainer') {
        value = attr.value.expression
      }
    }
  })

  el.node.attributes = newAttributes
  return value
}
