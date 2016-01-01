import linter from '../../utils/linter'
import getChildType from '../../utils/getChildType'

export default (styles, {Component, element} , config) => { // eslint-disable-line
  const linterInstance = linter(config.linter)

  linterInstance.lint(styles)

  // only print warnings if lookRoot is active
  // adds a didMount listener to log all linter errors
  if (config.lookRoot) {
    const existingDidMount = Component.componentDidMount
    Component.componentDidMount = () => {
      if (existingDidMount) {
        existingDidMount()
      }

      const linterConfig = linterInstance.getConfig()

      if (linterConfig.logWarnings !== false) {
        const warnings = linterInstance.getWarnings()

        warnings.forEach(warning => {
          console.warn(`${Component._lookScope}<${getChildType(element)}>: Linter Error`, warning.hint, warning)
        })
      }

      if (linterConfig.logStatistics !== false) {
        console.log('Linting Statistics:', linterInstance.generateStatistics())
      }

      linterInstance.clear()
    }
  }

  return styles
}
