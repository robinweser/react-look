import isMemberExpression from './utils/isMemberExpression'

export default function removeComponentFromStyleSheet({ source }, { jscodeshift }) {
  // Node types & node builder
  const { CallExpression } = jscodeshift
  const { callExpression } = jscodeshift

  source = jscodeshift(source)
    .find(CallExpression)
    // get only StyleSheet.create calls
    .filter(el => isMemberExpression(el, 'StyleSheet', 'create'))
    // get only calls with more than one argument
    .filter(el => el.node.arguments.length > 1)
    // remove first argument
    .forEach(sliceFirstArgument)
    .toSource()

  return source
}

function sliceFirstArgument(el) {
  el.node.arguments = el.node.arguments.slice(1)
}
