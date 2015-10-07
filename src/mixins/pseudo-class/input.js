import MixinTypes from '../../utils/MixinTypes'

/**
* Input pseudo mixins just validate current elements props and validate those
*/
export default [{
  key: ':checked',
  type: MixinTypes.EQUAL,
  fn: (key, styles, args) => {
    return args.newProps.checked ? styles : false
  }
}, {
  key: ':disabled',
  type: MixinTypes.EQUAL,
  fn: (key, styles, args) => {
    return args.newProps.disabled ? styles : false
  }
}, {
  key: ':enabled',
  type: MixinTypes.EQUAL,
  fn: (key, styles, args) => {
    return !args.newProps.disabled ? styles : false
  }
}, {
  key: ':required',
  type: MixinTypes.EQUAL,
  fn: (key, styles, args) => {
    return args.newProps.required ? styles : false
  }
}, {
  key: ':optional',
  type: MixinTypes.EQUAL,
  fn: (key, styles, args) => {
    return !args.newProps.required ? styles : false
  }
}, {
  key: ':read-only',
  type: MixinTypes.EQUAL,
  fn: (key, styles, args) => {
    return args.newProps.readOnly ? styles : false
  }
}, {
  key: ':read-write',
  type: MixinTypes.EQUAL,
  fn: (key, styles, args) => {
    return !args.newProps.readOnly ? styles : false
  }
}, {
  key: ':indeterminate',
  type: MixinTypes.EQUAL,
  fn: (key, styles, args) => {
    return args.newProps.indeterminate ? styles : false
  }
}]