import Look from './core/enhancer'
import State from './api/State'
import Config from './api/Config'
import Mixins from './processors/mixin'
Config.registerProcessor(Mixins)

export {
	Look as default,
	State,
	Config
}