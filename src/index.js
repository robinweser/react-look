import Look from './core/enhancer'
import State from './api/State'
import Config from './api/Config'
import Listener from './api/Listener'
import Mixins from './processors/mixin'

//mixins
import Conditions from './mixins/condition'
import Extend from './mixins/extend'
import PseudoElements from './mixins/pseudo-class/before-after'
import ChildIndex from './mixins/pseudo-class/child-index'
import ChildTypeIndex from './mixins/pseudo-class/child-type-index'
import Empty from './mixins/pseudo-class/empty'

Mixins.use(Conditions)
Mixins.use(Extend)
Mixins.use(PseudoElements)
Mixins.use(ChildIndex)
Mixins.use(ChildTypeIndex)
Mixins.use(Empty)

Config.registerProcessor(Mixins)

export {
	Look as default,
	Listener,
	State,
	Config
}