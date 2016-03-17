import _ from 'lodash'

export default arr => arr.reduce((isDynamic, item) => {
  if (!_.isString(item) && !_.isNumber(item)) {
    isDynamic = true
  }
  return isDynamic
}, false)
