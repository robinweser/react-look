import statefulSelector from '../../modules/plugins/statefulSelector'
import { resolvePlugins } from '../../modules/core/resolver'

describe('Resolving stateful selectors', () => {
  it('should resolve stateful values', () => {
    const Component = { props: { color: 'red' } }
    const input = {
      _statefulSelector: props => ({ color: props.color })
    }
    const output = { color: 'red' }

    const pluginInterface = TestUtils.mockPluginInterfaceWithConfig(input, {
      plugins: [ statefulSelector ],
      _resolveStyles: resolvePlugins
    })
    pluginInterface.Component = Component

    expect(statefulSelector(pluginInterface)).to.eql(output)
  })


  it('should resolve nested objects as well', () => {
    const Component = { props: { color: 'red' } }
    const input = {
      color: 'blue',
      inner: {
        _statefulSelector: props => ({
          color: props.color
        })
      }
    }
    const output = { color: 'blue', inner: { color: 'red' } }

    const pluginInterface = TestUtils.mockPluginInterfaceWithConfig(input, {
      plugins: [ statefulSelector ],
      _resolveStyles: resolvePlugins
    })
    pluginInterface.Component = Component

    expect(statefulSelector(pluginInterface)).to.eql(output)
  })
})
