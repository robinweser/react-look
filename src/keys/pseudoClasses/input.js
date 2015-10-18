/**
* Input pseudo mixins just validate current elements props and validate those
*/
const checked = (property, styles, customKey, {newProps}) => newProps && newProps.checked ? styles : false
const disabled = (property, styles, customKey, {newProps}) => newProps && newProps.disabled ? styles : false
const enabled = (property, styles, customKey, {newProps}) => newProps && !newProps.disabled ? styles : false
const required = (property, styles, customKey, {newProps}) => newProps && newProps.required ? styles : false
const optional = (property, styles, customKey, {newProps}) => newProps && !newProps.required ? styles : false
const readOnly = (property, styles, customKey, {newProps}) => newProps && newProps.readOnly ? styles : false
const readWrite = (property, styles, customKey, {newProps}) => newProps && !newProps.readOnly ? styles : false
const indeterminate = (property, styles, customKey, {newProps}) => newProps && newProps.indeterminate ? styles : false

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