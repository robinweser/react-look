/**
 * Checks if a call expression is the a given member expression
 * @param {?string} object - Object which's member we want to check
 * @param {?string} property - property which we want to filter
 */
export default function isMemberExpression(el, object, property) {
  var validate = el.node.callee.type === 'MemberExpression'

  if (validate && object) {
    validate = el.node.callee.object.name === object
  }

  if (validate && property) {
    validate = el.node.callee.property.name === property
  }

  return validate
}
