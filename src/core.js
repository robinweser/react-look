import Enhancer from './core/enhancer'
import Config from './api/Config'
import createStyleSheet from './core/stylesheet'
// Resolving annotations
// If not passing arguments it just wraps the Component
// Otherwise it returns a decorator
export default (...args) => {
	if (args[0] instanceof Function) {
		return Enhancer(...args)
	} else {
		return function decorator(target) {
			return Enhancer(target, ...args)
		}
	}
}

export { Config, createStyleSheet }