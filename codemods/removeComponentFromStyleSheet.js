import isMemberExpression from './utils/isMemberExpression'
import getImportAlias from './utils/getImportAlias'

export default function removeComponentFromStyleSheet({ source }, { jscodeshift }) {
  // Node types & node builder
  const { CallExpression, ImportDeclaration } = jscodeshift
  const { callExpression } = jscodeshift

  let styleSheet

  jscodeshift(source)
    .find(ImportDeclaration)
    // filter only react-look package imports
    .filter(el => el.node.source.value === 'react-look' || el.node.source.value === 'react-look-native')
    .forEach(el => styleSheet = getImportAlias(el, 'StyleSheet'))

  // if no StyleSheet got imported, return
  if (!styleSheet) {
    return source
  }

  source = jscodeshift(source)
    .find(CallExpression)
    // get only StyleSheet.create calls
    .filter(el => isMemberExpression(el, styleSheet, 'create'))
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
