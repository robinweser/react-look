import { setState, getState } from '../api/State'
import createListener from './createListener'
import warn from './warn'

export default (Component, element, newProps) => {
  const key = element.ref

  if (element.type !== 'input') {
    warn('Validation pseudo classes are only supported by <input> elements.')
    return false
  }

  if (key === null) {
    warn('You must set a `ref` in order to enable input validation.')
    return false
  }

  newProps.onChange = createListener(Component, element, key, 'onChange', () => {
    setState('valid', Component.refs[key].validity, Component, key)
  })

  if (getState('valid', Component, key) === undefined) {
    const existing = Component.componentDidMount
    Component.componentDidMount = () => {
      if (existing) {
        existing()
      }
      setState('valid', Component.refs[key].validity, Component, key)
    }
  }

  return getState('valid', Component, key)
}
