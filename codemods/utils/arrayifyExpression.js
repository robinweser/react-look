export default function arrayifyExpression(expr) {
  if (expr.type === 'ArrayExpression') {
    return [ ...expr.elements ]
  }
  return [ expr ]
}
