import statefulValue from '../../modules/plugins/statefulValue'
import { resolvePlugins } from '../../modules/core/resolver'

describe('Resolving stateful values', () => {
  it('should resolve stateful values', () => {
    const Component = { props: { color: 'red' } }
    const input = { color: props => props.color }
    const output = { color: 'red' }

    const pluginInterface = TestUtils.mockPluginInterfaceWithConfig(input, {})
    pluginInterface.Component = Component

    expect(statefulValue(pluginInterface)).to.eql(output)
  })

  it('should do nothing if no function was passed', () => {
    const Component = { props: { color: 'red' } }
    const styles = { color: 'blue' }

    const pluginInterface = TestUtils.mockPluginInterfaceWithConfig(styles, {})
    pluginInterface.Component = Component

    expect(statefulValue(pluginInterface)).to.eql(styles)
  })

  it('should resolve nested objects as well', () => {
    const Component = { props: { color: 'red' } }
    const input = {
      color: 'blue',
      inner: {
        color: props => props.color
      }
    }
    const output = { color: 'blue', inner: { color: 'red' } }

    const pluginInterface = TestUtils.mockPluginInterfaceWithConfig(input, {
      plugins: [ statefulValue ],
      _resolveStyles: resolvePlugins
    })
    pluginInterface.Component = Component

    expect(statefulValue(pluginInterface)).to.eql(output)
  })
})
