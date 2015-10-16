/**
* Input pseudo mixins just validate current elements props and validate those
*/
const checked = () => checkProp(...arguments, 'checked')
const disabled = () => checkProp(...arguments, 'disabled')
const enabled = () => checkProp(...arguments, 'disabled', true)
const required = () => checkProp(...arguments, 'required')
const optional = () => checkProp(...arguments, 'required', true)
const readOnly = () => checkProp(...arguments, 'readOnly')
const readWrite = () => checkProp(...arguments, 'readOnly', true)
const indeterminate = () => checkProp(...arguments, 'indeterminate')

export default {
  checked,
  disabled,
  enabled,
  required,
  optional,
  readOnly,
  readWrite,
  indeterminate
}

const checkProp = (property, styles, customKey, {newProps}, config, check, invert) => {
  return newProps[check] === !invert ? styles : false
}