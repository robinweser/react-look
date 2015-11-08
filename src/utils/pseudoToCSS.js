import { toCSS } from '../api/StyleSheet'
import cssifyObject from './cssifyObject'

let globalStyleSheet = toCSS({}).sheet
let counter = 0

export default (styles, pseudo, unit) => {
  const className = 'c' + counter.toString(36)
  const rule = '.' + className + pseudo + '{' + cssifyObject(styles, unit) + '}'

  // adds the rule to the global style sheet
  // TODO: add global browser support (check for addRule)
  globalStyleSheet.insertRule(rule, globalStyleSheet.cssRules.length)

  return className
}
