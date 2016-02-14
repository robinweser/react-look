import Enhancer from './core/enhancer'
import StyleSheet from './dom/api/StyleSheet'
import LookRoot from './dom/api/LookRoot'

import NativeStyleSheet from './native/api/StyleSheet'
import { default as NativeLookRoot } from './native/api/LookRoot'

import { Plugins, Mixins, Presets } from './addons'

// Resolving annotations
// If not passing arguments it just wraps the Component
// Otherwise it returns a decorator
export default (...args) => {
  if (args[0] instanceof Function) {
    return Enhancer(...args) // eslint-disable-line
  }

  return function decorator(target) {
    return Enhancer(target, ...args) // eslint-disable-line
  }
}

const Native = {
  StyleSheet: NativeStyleSheet,
  LookRoot: NativeLookRoot
}

export {
  StyleSheet,
  LookRoot,
  Native,

  Plugins,
  Mixins,
  Presets
}
