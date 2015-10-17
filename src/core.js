import Config         from './api/Config'
import createEnhancer from './core/enhancer'

// Resolving annotations
// If not passing arguments it just wraps the Component
// Otherwise it returns a decorator
export default ( ...args ) => {
  if ( args[0] instanceof Function ) {
    return createEnhancer(...args)
  }

  return function decorator( target ) {
    return createEnhancer(target, ...args)
  }
}

export { Config }
