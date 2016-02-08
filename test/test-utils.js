import container from '../modules/core/container'

export function clearStyleContainer() {
  container.selectors.clear()
  container.mediaQueries.clear()
  container.keyframes.clear()
  container.fonts.clear()
  container.dynamics.clear()
  container._className = 0
}
