import Config            from './api/Config'
import Enhancer          from './core/enhancer'
import Listener          from './api/Listener'
import Mixins            from './processors/mixin'
import MixinTypes        from './utils/MixinTypes'
import State             from './api/State'

// mixins
import AlternativeValues from './mixins/alternative-value'
import ChildIndex        from './mixins/pseudo-class/child-index'
import ChildTypeIndex    from './mixins/pseudo-class/child-type-index'
import Conditions        from './mixins/condition'
import Empty             from './mixins/pseudo-class/empty'
import Extend            from './mixins/extend'

Mixins.use(AlternativeValues)
Mixins.use(ChildIndex)
Mixins.use(ChildTypeIndex)
Mixins.use(Conditions)
Mixins.use(Empty)
Mixins.use(Extend)

Config.registerProcessor(Mixins)

// Resolving annotations
// If not passing arguments it just wraps the Component
// Otherwise it returns a decorator
export default ( ...args ) => {
  if ( args[0] instanceof Function ) {
    return Enhancer(...args) // eslint-disable-line new-cap
  }

  return function decorator( target ) {
    return Enhancer(target, ...args) // eslint-disable-line new-cap
  }
}

export {
  Config,
  Listener,
  State,
  MixinTypes
}
