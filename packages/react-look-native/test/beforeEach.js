import StyleContainer from '../modules/api/StyleContainer'

export function clearStyleContainer() {
  StyleContainer.selectors.clear()
  StyleContainer.dynamics.clear()

  StyleContainer._selector = 0
}

beforeEach(clearStyleContainer)
