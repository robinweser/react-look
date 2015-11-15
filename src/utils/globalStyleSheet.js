const style = document.createElement('style')
style.type = 'text/css'

// Apply the CSS styles to the head
const node = document.createTextNode('')
style.appendChild(node)
document.head.appendChild(style)

const globalStyleSheet = style.sheet

export default (rule) => {
  globalStyleSheet.insertRule(rule, globalStyleSheet.cssRules.length)
}
