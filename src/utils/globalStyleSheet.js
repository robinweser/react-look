// Generates a hashcode from a string
// Taken from http://stackoverflow.com/a/7616484
const generateHashCode = str => {
  let hash = 0
  let i
  let char
  const length = str.length
  if (length === 0) {
    return hash
  }
  for (i = 0; i < length; ++i) {
    char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0 // Convert to 32bit integer
  }
  return hash.toString(36)
}

// Sorts objects in order to always get the same hash code
const sortObject = obj => {
  let out = {}
  Object.keys(obj).sort().forEach(key => {
    if (obj[key] instanceof Object) {
      out[key] = sortObject(obj[key])
    } else {
      out[key] = obj[key]
    }
  })
  return out
}

let CSSRules = new Set()

// Adds a rule to the global StyleSheet
// This is used to support older browsers using the non-standard 'addRule'-method
const addCSSRule = (sheet, selector, rule) => {
  if (CSSRules.has(selector)) {
    return false
  }
  if (typeof sheet.insertRule === 'function') {
    sheet.insertRule(selector + '{' + rule + '}', sheet.cssRules.length)
  } else if (typeof sheet.addRule === 'function') {
    sheet.addRule(selector, rule, sheet.cssRules.length)
  }
  CSSRules.add(selector)
}

const initGlobalStyleSheet = () => {
  const style = document.createElement('style')
  style.type = 'text/css'
  // Apply the CSS styles to the head
  const node = document.createTextNode('')
  style.appendChild(node)
  document.head.appendChild(style)
  return style.sheet
}

const globalStyleSheet = initGlobalStyleSheet()

// adds the rule to the global style sheet
export default (selector, rule) => {
  addCSSRule(globalStyleSheet, selector, rule)
}

export function generateUniqueSelector(styles) {
  if (styles !== undefined && styles instanceof Object) {
    return 'c' + generateHashCode(JSON.stringify(sortObject(styles)))
  }
}
