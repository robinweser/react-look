import StyleContainer from '../modules/api/dom/StyleContainer'

export function clearStyleContainer() {
  StyleContainer.selectors.clear()
  StyleContainer.mediaQueries.clear()
  StyleContainer.keyframes.clear()
  StyleContainer.fonts.clear()
  StyleContainer.dynamics.clear()

  StyleContainer._className = 0
}

beforeEach(clearStyleContainer)
