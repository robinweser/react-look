import StyleContainer from '../modules/api/StyleContainer'

export function clearStyleContainer() {
  StyleContainer.selectors.clear()
  StyleContainer.mediaQueries.clear()
  StyleContainer.keyframes.clear()
  StyleContainer.fonts.clear()
  StyleContainer.dynamics.clear()
  StyleContainer.statics.clear()

  StyleContainer._className = 0
}

export function clearDOM() {
  var jsdom = require('jsdom').jsdom
  global.document = jsdom()
  global.window = document.defaultView
}

beforeEach(clearDOM)
beforeEach(clearStyleContainer)
