/**
 * Replaces every default import of any react-look with a lowercased look
 */
export default function useLowercaseLook({ source }, { jscodeshift }) {
  // Node types & node builder
  const { ImportDeclaration, ImportDefaultSpecifier, CallExpression } = jscodeshift
  const { importDefaultSpecifier, callExpression, identifier } = jschodeshift

  let usedDefaultImport = 'Look'

  source = jscodeshift(source)
    .find(ImportDeclaration)
    // filter only react-look package imports
    .filter(el => el.node.source.value === 'react-look' || el.node.source.value === 'react-look-native')
    .find(ImportDefaultSpecifier)
    .forEach(el => usedDefaultImport = el.node.local.name)
    // replace every default import with lowercased look
    .replaceWith(() => importDefaultSpecifier(identifier('look')))
    .toSource()

  source = jscodeshift(source)
    .find(CallExpression)
    // filter only usedDefaultImport calls
    .filter(el => el.node.callee.type === 'Identifier' && el.node.callee.name === usedDefaultImport)
    .replaceWith(() => callExpression(identifier('look'), el.node.arguments))
    .toSource()

  return source
}
