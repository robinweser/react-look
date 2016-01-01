import Linter from 'inline-style-linter'

let linter

/**
 * Global linter instance
 * Updates the config if a new one is provided
 * @param {string} config - linter configuration
 */
export default config => {
  if (!linter) {
    linter = new Linter(config)
  }

  // replace userAgent if config provides alternative one
  if (config !== undefined && linter.getConfig() !== config) {
    linter.setConfig(config)
  }

  return linter
}
