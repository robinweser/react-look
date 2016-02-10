import Linter from 'inline-style-linter'
import getChildType from '../utils/getChildType'

export default function linter({ styles, Component, element, config: { linter } }) {
  const warnings = new Linter(linter).lint(styles)

  warnings.forEach(warning => {
    if (!linter.mute) {
      if (linter && linter.onlyLogHint) {
        console.warn(`${Component._lookScope}<${getChildType(element)}>: ` + warning.hint)
      } else {
        console.warn(`${Component._lookScope}<${getChildType(element)}>: ` + warning.hint, warning)
      }
    }
  })

  return styles
}
