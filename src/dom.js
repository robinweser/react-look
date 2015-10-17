import Look, {State, Listener, MixinTypes, Config} from './look'
import CSS from './api/CSS'
import Prefixer from './processors/prefixer'

import ExtractCSS from './mixins/extract-css'
import MediaQueries from './mixins/media-query'
import UserActions from './mixins/pseudo-class/user-action'
import PseudoElements from './mixins/pseudo-class/before-after'
import Input from './mixins/pseudo-class/input'
import Lang from './mixins/pseudo-class/lang'

let Mixins = Config.getProcessors()[0]

Mixins.use(UserActions)
Mixins.use(MediaQueries)
Mixins.use(Input)
Mixins.use(Lang)
Mixins.use(PseudoElements)
Mixins.use(ExtractCSS)

Config.registerProcessor(Prefixer)

export {
  Look as default,
  CSS,
  State,
  Listener,
  MixinTypes,
  Config
}
