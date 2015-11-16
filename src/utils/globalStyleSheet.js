const style = document.createElement('style')
style.type = 'text/css'

// Apply the CSS styles to the head
const node = document.createTextNode('')
style.appendChild(node)
document.head.appendChild(style)

const globalStyleSheet = style.sheet

const addCSSRule = (sheet, selector, rule) => {
  if (typeof sheet.insertRule === 'function') {
    sheet.insertRule(selector + '{' + rule + '}', sheet.cssRules.length)
  } else if (typeof sheet.addRule === 'function') {
    sheet.addRule(selector, rule, sheet.cssRules.length)
  }
}
// adds the rule to the global style sheet
export default (selector, rule) => {
  addCSSRule(globalStyleSheet, selector, rule)
}

let counter = 0

export function generateUniqueSelector(rule) {
  if (!rule) {
    ++counter
    return 'c' + counter.toString(36)
  }
}
