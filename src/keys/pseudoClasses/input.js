/**
* Input pseudo mixins just validate current elements props and validate those
*/
const checked = (property, styles, customKey, {newProps}) => checkProp(newProps, styles, 'checked')
const disabled = (property, styles, customKey, {newProps}) => checkProp(newProps, styles, 'disabled')
const enabled = (property, styles, customKey, {newProps}) => checkProp(newProps, styles, 'disabled', true)
const required = (property, styles, customKey, {newProps}) => checkProp(newProps, styles, 'required', false)
const optional = (property, styles, customKey, {newProps}) => checkProp(newProps, styles, 'required', true)
const readOnly = (property, styles, customKey, {newProps}) => checkProp(newProps, styles, 'readOnly', false)
const readWrite = (property, styles, customKey, {newProps}) => checkProp(newProps, styles, 'readOnly', true)
const indeterminate = (property, styles, customKey, {newProps}) => checkProp(newProps, styles, 'indeterminate', false)

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

const checkProp = (newProps, styles, checkProperty, invertValue) => {
  return newProps && newProps[checkProperty] === !invertValue ? styles : false
}