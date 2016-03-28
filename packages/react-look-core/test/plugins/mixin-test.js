import mixin from '../../modules/plugins/mixin'
import { resolvePlugins } from '../../modules/core/resolver'

describe('Resolving mixins', () => {
  it('should return styles if no mixins are passed', () => {
    const pluginInterface = TestUtils.mockPluginInterfaceWithPlugin({ }, () => true)
    expect(mixin(pluginInterface)).to.eql({ })
  })

  it('should return styles if mixins is empty', () => {
    const pluginInterface = TestUtils.mockPluginInterfaceWithPlugin({ }, () => true)
    pluginInterface.config.mixins = { }
    expect(mixin(pluginInterface)).to.eql({ })
  })

  it('should correctly resolve', () => {
    const input = { color: 'red', testMixin: 'blue' }
    const output = { color: 'red', fontSize: 14 }

    const pluginInterface = TestUtils.mockPluginInterfaceWithConfig(input, {
      mixins: {
        testMixin: () => ({ fontSize: 14 })
      },
      plugins: [ mixin ],
      _resolveStyles: resolvePlugins
    })

    expect(mixin(pluginInterface)).to.eql(output)
  })
})
