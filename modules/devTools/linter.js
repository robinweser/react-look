import linter from '../utils/linter'
import getChildType from '../utils/getChildType'

export default (styles, {Component, element} , config) => { // eslint-disable-line
  const warnings = linter(config.linter).lint(styles)

  warnings.forEach(warning => {
    if (config.linter && config.linter.onlyLogHint) {
      console.warn(`${Component._lookScope}<${getChildType(element)}> - Linter Error: ` + warning.hint)
    } else {
      console.warn(`${Component._lookScope}<${getChildType(element)}> - Linter Error: ` + warning.hint, warning)
    }
  })

  return styles
}
