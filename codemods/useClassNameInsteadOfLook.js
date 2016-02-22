export default function lowercaseLook({ source }, { jscodeshift }) {
  // Node types & node builder
  const { JSXElement } = jscodeshift
  const { callExpression } = jschodeshift

  source = jscodeshift(source)
    .find(JSXElement)
    .forEach(extractClassName)
    .toSource()

  return source
}


/**
 * Iterates every JSX attribute and extracts the className
 * If no className is passed it returns undefined
 */
function extractClassName(el) {
  var className

  el.node.openingElement.attributes.forEach(attr => {
    if (attr.name.name == 'className') {
      className = attr.value.raw || attr.value.expression.value
      el.node.openingElement.attributes.pop(attr)
    }
  })

  return className
}
