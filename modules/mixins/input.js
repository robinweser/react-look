// Input pseudo mixins just validate current elements props and validate those
export default {
  checked: (property, styles, mixinKey, {newProps}) => newProps && newProps.checked ? styles : false,
  disabled: (property, styles, mixinKey, {newProps}) => newProps && newProps.disabled ? styles : false,
  enabled: (property, styles, mixinKey, {newProps}) => newProps && !newProps.disabled ? styles : false,
  required: (property, styles, mixinKey, {newProps}) => newProps && newProps.required ? styles : false,
  optional: (property, styles, mixinKey, {newProps}) => newProps && !newProps.required ? styles : false,
  readOnly: (property, styles, mixinKey, {newProps}) => newProps && newProps.readOnly ? styles : false,
  readWrite: (property, styles, mixinKey, {newProps}) => newProps && !newProps.readOnly ? styles : false,
  indeterminate: (property, styles, mixinKey, {newProps}) => newProps && newProps.indeterminate ? styles : false
}
