import Enhancer from './core/enhancer'
import StyleSheet from './api/StyleSheet'
import LookRoot from './api/LookRoot'

import { Plugins, Mixins, DevTools, Presets } from './addons'

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

export {
  StyleSheet,
  LookRoot,

  Plugins,
  Mixins,
  DevTools,
  Presets
}
