import cssifyObject from './cssifyObject'
import insertRule, { generateUniqueSelector } from './globalStyleSheet'


export default (styles, pseudo, config) => {
  const className = generateUniqueSelector(styles)
  if (className) {
    insertRule(`.${className}${pseudo}`, cssifyObject(styles, config))
  }
  return className
}