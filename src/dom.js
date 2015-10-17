import CSS                                           from './api/CSS'
import Look, { State, Listener, MixinTypes, Config } from './look'
import Prefixer                                      from './processors/prefixer'

import ExtractCSS                                    from './mixins/extract-css'
import Input                                         from './mixins/pseudo-class/input'
import Lang                                          from './mixins/pseudo-class/lang'
import MediaQueries                                  from './mixins/media-query'
import PseudoElements                                from './mixins/pseudo-class/before-after'
import UserActions                                   from './mixins/pseudo-class/user-action'

const Mixins = Config.getProcessors()[0]

Mixins.use(ExtractCSS)
Mixins.use(Input)
Mixins.use(Lang)
Mixins.use(MediaQueries)
Mixins.use(PseudoElements)
Mixins.use(UserActions)

Config.registerProcessor(Prefixer)

export {
  Config,
  CSS,
  Listener,
  Look as default,
  MixinTypes,
  State
}
