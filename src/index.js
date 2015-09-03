import Look from './core/enhancer'
import State from './core/api/State'
import Config from './core/api/Config'

import Conditions from './core/plugins/condition'
import Mixins from './core/plugins/mixin'
Config.registerProcessor(Conditions)
Config.registerProcessor(Mixins)

export {
	Look as default,
	State,
	Config
}