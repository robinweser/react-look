export default function lowercaseLook({ source }, { jscodeshift }) {
  // Node types & node builder
  const { CallExpression } = jscodeshift
  const { callExpression } = jschodeshift

  source = jscodeshift(source)
    .find(CallExpression)
    .filter(el => el.node.callee.type === 'MemberExpression' && el.node.callee.object.name === 'StyleSheet')
    .replaceWith(el => callExpression(el.node.callee, el.node.arguments.filter(arg => arg.type !== 'Identifier')))
    .toSource()

  return source
}
