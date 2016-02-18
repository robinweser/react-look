// Taken from Radium's core directly
// https://github.com/FormidableLabs/radium/blob/master/src/enhancer.js#L8
// This ensures hot reloading working fine, see issue
// https://github.com/FormidableLabs/radium/pull/255
const KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES = [
  'arguments',
  'callee',
  'caller',
  'length',
  'name',
  'prototype',
  'type'
]

export default function copyProperties(source, target) {
  Object.getOwnPropertyNames(source).forEach(key => {
    if (KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES.indexOf(key) < 0 && !target.hasOwnProperty(key)) {
      const descriptor = Object.getOwnPropertyDescriptor(source, key)
      Object.defineProperty(target, key, descriptor)
    }
  })
}
