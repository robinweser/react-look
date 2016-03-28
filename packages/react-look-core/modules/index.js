import enhancer from './core/enhancer'
import * as resolver from './core/resolver'

import condition from './mixins/condition'
import contains from './mixins/contains'
import extend from './mixins/extend'

import mixin from './plugins/mixin'
import statefulValue from './plugins/statefulValue'
import statefulSelector from './plugins/statefulSelector'
import styleLogger from './plugins/styleLogger'

import copyProperties from './utils/copyProperties'
import getChildType from './utils/getChildType'
import getPseudoExpression from './utils/getPseudoExpression'
import sortObject from './utils/sortObject'
import splitCondition from './utils/splitCondition'

const Mixins = {
  condition,
  contains,
  extend
}

const Plugins = {
  mixin,
  statefulValue,
  statefulSelector,
  styleLogger
}

const Utils = {
  copyProperties,
  getChildType,
  sortObject,
  splitCondition,
  getPseudoExpression
}

export default {
  enhancer,
  resolver,

  Mixins,
  Plugins,
  Utils
}
