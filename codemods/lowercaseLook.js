export default function lowercaseLook({ source }, { jscodeshift }) {
  // Node types & node builder
  const { ImportDefaultSpecifier, CallExpression } = jscodeshift
  const { importDefaultSpecifier, callExpression, identifier } = jschodeshift

  source = jscodeshift(source)
    .find(ImportDefaultSpecifier)
    .filter(el => el.node.local.name == 'Look')
    .replaceWith(() => importDefaultSpecifier(identifier('look')))
    .toSource()

  source = jscodeshift(source)
    .find(CallExpression)
    .filter(el => el.node.callee.type == 'Identifier' && el.node.callee.name == 'Look')
    .replaceWith(() => callExpression(identifier('look'), el.node.arguments))
    .toSource()

  return source
}
