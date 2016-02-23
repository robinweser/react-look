import extractJSXAttribute from './utils/extractJSXAttribute'
import hasJSXAttribute from './utils/hasJSXAttribute'
import arrayifyExpression from './utils/arrayifyExpression'

export default function useClassNameInsteadOfLook({ source }, { jscodeshift }) {
  // Node types & node builder
  const { JSXOpeningElement, ImportDeclaration } = jscodeshift
  const { callExpression, identifier, jsxIdentifier, jsxAttribute, jsxExpressionContainer } = jscodeshift


  let styleSheet

  jscodeshift(source)
    .find(ImportDeclaration)
    // filter only react-look package imports
    .filter(el => el.node.source.value === 'react-look' || el.node.source.value === 'react-look-native')
    .forEach(el => styleSheet = getImportAlias(el, 'StyleSheet'))


  source = jscodeshift(source)
    .find(JSXOpeningElement)
    // Only transform if element has look prop
    .filter(el => hasJSXAttribute(el, 'look'))
    .forEach(el => {
      let look = arrayifyExpression(extractJSXAttribute(el, 'look', true))
      const className = extractJSXAttribute(el, 'className', true)

      let newClassName

      if (look.length === 1 && !className) {
        newClassName = jsxExpressionContainer(look[0])
      } else {
        const args = className ? [ className, ...look ] : [ ...look ]
        const combined = callExpression(identifier((styleSheet || 'StyleSheet') + '.combineStyles'), args)
        newClassName = jsxExpressionContainer(combined)
      }
      el.node.attributes.push(jsxAttribute(jsxIdentifier('className'), newClassName))
    })
    .toSource()

  return source
}
