// Input pseudo mixins just validate current elements props and validate those
export default {
  checked: (property, styles, customKey, {newProps}) => newProps && newProps.checked ? styles : false,
  disabled: (property, styles, customKey, {newProps}) => newProps && newProps.disabled ? styles : false,
  enabled: (property, styles, customKey, {newProps}) => newProps && !newProps.disabled ? styles : false,
  required: (property, styles, customKey, {newProps}) => newProps && newProps.required ? styles : false,
  optional: (property, styles, customKey, {newProps}) => newProps && !newProps.required ? styles : false,
  readOnly: (property, styles, customKey, {newProps}) => newProps && newProps.readOnly ? styles : false,
  readWrite: (property, styles, customKey, {newProps}) => newProps && !newProps.readOnly ? styles : false,
  indeterminate: (property, styles, customKey, {newProps}) => newProps && newProps.indeterminate ? styles : false
}
