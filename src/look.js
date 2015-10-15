import Enhancer from './core/enhancer'
import State from './api/State'
import Config from './api/Config'
import Listener from './api/Listener'
import Mixins from './processors/mixin'
import MixinTypes from './utils/MixinTypes'
import createStyleSheet from './core/stylesheet'

//mixins
import Conditions from './mixins/condition'
import Extend from './mixins/extend'
import ChildIndex from './mixins/pseudo-class/child-index'
import ChildTypeIndex from './mixins/pseudo-class/child-type-index'
import Empty from './mixins/pseudo-class/empty'
import AlternativeValues from './mixins/alternative-value'

Mixins.use(Conditions)
Mixins.use(Extend)
Mixins.use(ChildIndex)
Mixins.use(ChildTypeIndex)
Mixins.use(Empty)
Mixins.use(AlternativeValues)

Config.registerProcessor(Mixins)


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

export {
	Listener,
	State,
	Config,
	MixinTypes,
	createStyleSheet
}
